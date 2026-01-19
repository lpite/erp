import { create, insert, remove, search, searchVector, } from '@orama/orama'
import { Highlight } from '@orama/highlight'
import { searchWithHighlight, afterInsert as highlightAfterInsert } from '@orama/plugin-match-highlight'
const highlight = new Highlight({
  // strategy:""
  CSSClass: ""
})
const db = create({
  language: "ukrainian",
  schema: {
    id: 'string',
    name: 'string',
    description: 'string',
    oem: 'string',
    article: 'string',
  }
})
Promise.all(Array(10).fill(0).map(async (_, i) => {
  await new Promise((r) => setTimeout(() => r(), 40 * i))
  const r = await fetch(`http://localhost:8090/api/collections/product/records?perPage=1000&page=${i + 1}`)
    .then((r) => r.json());
  if (!r || !r?.items || !r?.items.length) {
    console.log(r)
    console.error("cant fill db page ", i + 1)
    return;
  }
  r.items.forEach((item) => {
    insert(db, {
      id: item.id,
      name: item.name,
      // description: item.description,
      // article: item.article
    })
  })
  console.log("done", i)
})).then(() => {
  console.log("all done");
console.log(db.data.docs.count)
})
const server = Bun.serve({
  routes: {
    "/api/search": async (req) => {
      const url = req.url.slice(req.url.indexOf("?"))
      const queryParams = new URLSearchParams(url);
      const q = queryParams.get("q");
      if (!q) {
        return Response.json({ items: [] })
      }
      console.log(q)
      const results = await search(db, {
        term: q,
        // sortBy: {
        //   property: "name"
        // },
        // boost: {
        //   name: 2
        // },
        properties:["name"],
        limit: 200,
        threshold: 0,
        tolerance: 0,

      })
      console.log(results)
      if (!results.hits.length) {
        return Response.json({ items: [] })
      }
      const stocks = await fetch(`http://localhost:8090/api/collections/product_stock_latest/records?perPage=1000&filter=(${results.hits.map(h => `id='${h.document.id}'`).join("||")})`).then(r => r.json()) as { items?: { id: string, stock: number }[] }
      const prices = await fetch(`http://localhost:8090/api/collections/product_price_latest/records?perPage=1000&filter=(${results.hits.map(h => `id='${h.document.id}'`).join("||")})`).then(r => r.json()) as { items?: { id: string, price: number }[] }

      // const stockPrice = await fetch(`http://localhost:8090/api/collections/products_with_stock_and_price/records?perPage=1000&filter=(${results.hits.map(h => `id='${h.document.id}'`).join("||")})&fields=id,price,stock`).then(r => r.json())
      if (!stocks || !stocks?.items) {
        console.log(stocks);
        return Response.json({ error: "cant get stocks" }, { status: 500 })
      }

      if (!prices || !prices?.items) {
        console.log(prices); 
        return Response.json({ error: "cant get prices" }, { status: 500 })
      }

      return Response.json({
        items: results.hits.map(h => {
          const stock = stocks.items.find(el => el.id === h.id);
          const price = prices.items.find(el => el.id === h.id);
          Object.keys(h.document).forEach((k) => {
            h.document[k] = highlight.highlight(h.document[k], q).HTML;
          })
          return { ...h.document, stock: stock?.stock, price: price?.price }
        })
      })
    }
  }
})

console.log(`Server running at ${server.url}`);

