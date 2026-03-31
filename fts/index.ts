import { create, insert, search, type TypedDocument } from '@orama/orama'

let placesDB: any[] = []

const db = create({
  language: "ukrainian",
  schema: {
    id: 'string',
    name: 'string',
    name_for_print:"string",
    name_for_web:"string",
    description: 'string',
    oem: 'string',
    article: 'string',
    brand: "string"
  }
})
export type FTSDocument = TypedDocument<typeof db>

Promise.all(Array(10).fill(0).map(async (_, i) => {
  await new Promise((r) => setTimeout(() => r(""), 40 * i))
  const r = await fetch(`http://localhost:8090/api/collections/product/records?perPage=1000&page=${i + 1}&expand=brand`)
    .then((r) => r.json()) as {items:any[]};
  if (!r || !r?.items || !r?.items.length) {
    console.log(r)
    console.error("cant fill db page ", i + 1)
    return;
  }
  r.items.forEach((item) => {
    insert(db, {
      id: item.id,
      name: item.name,
      description: item.description,
      article: item.article,
      brand: item?.expand?.brand?.name || ""
    })
  })
  console.log("done", i)
})).then(async () => {
  placesDB = (await fetch("http://localhost:8090/api/collections/storage_place/records?perPage=1000").then(r => r.json()) as {items:any[]})?.items || [] as any[];
  console.log("all done");
  console.log(db.data.docs.count)
})
const server = Bun.serve({
  hostname:"0.0.0.0",
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
        limit: 100,
        threshold: 0,
        tolerance: 0,

      })

      if (!results.hits.length) {
        return Response.json({ items: [] })
      }
      const stocks = await fetch(`http://localhost:8090/api/collections/product_stock_latest/records?perPage=100&filter=(${results.hits.map(h => `id='${h.document.id}'`).join("||")})`).then(r => r.json()) as { items?: { id: string, stock: number }[] }
      const prices = await fetch(`http://localhost:8090/api/collections/product_price_latest/records?perPage=100&filter=(${results.hits.map(h => `id='${h.document.id}'`).join("||")})`).then(r => r.json()) as { items?: { id: string, price: number }[] }
      const additional = await fetch(`http://localhost:8090/api/collections/product/records?perPage=100&fields=id,places,photos,suppliers&filter=(${results.hits.map(h => `id='${h.document.id}'`).join("||")})`).then(r => r.json()) as { items?: { id: string, places: string[] }[] }

      
      if (!stocks || !stocks?.items) {
        console.log(stocks);
        return Response.json({ error: "cant get stocks" }, { status: 500 })
      }

      if (!prices || !prices?.items) {
        console.log(prices); 
        return Response.json({ error: "cant get prices" }, { status: 500 })
      }

      if (!prices || !additional?.items) {
        console.log(additional); 
        return Response.json({ error: "cant get additional" }, { status: 500 })
      }

      if (!placesDB) {
        return Response.json({ error: "no placesDB" }, { status: 500 })
      }


      return Response.json({
        items: results.hits.map(h => {
          const stock = stocks.items?.find(el => el.id === h.id);
          const price = prices.items?.find(el => el.id === h.id);
          const places = additional.items?.find(el => el.id === h.id);
      
          return { ...h.document, stock: stock?.stock, price: price?.price, places: places?.places.map((el) => placesDB.find((pl) => pl.id === el)?.name) }
        })
      })
    }
  }
})

console.log(`Server running at ${server.url}`);

