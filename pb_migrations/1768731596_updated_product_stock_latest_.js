/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3149930398")

  // update collection data
  unmarshal({
    "viewQuery": "select product.id,\nCOALESCE(SUM(quantity),0) as stock\nfrom product \nleft join product_stock\non product_stock.product = product.id\nGROUP by product.id"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "json1261852256",
    "maxSize": 1,
    "name": "stock",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3149930398")

  // update collection data
  unmarshal({
    "viewQuery": "select id from product"
  }, collection)

  // remove field
  collection.fields.removeById("json1261852256")

  return app.save(collection)
})
