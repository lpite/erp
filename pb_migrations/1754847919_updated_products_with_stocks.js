/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2559003806")

  // update collection data
  unmarshal({
    "viewQuery": "select product.id,SUM(quantity) as m from product \nleft join product_stock\non product_stock.field = product.id"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "json3775001192",
    "maxSize": 1,
    "name": "m",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2559003806")

  // update collection data
  unmarshal({
    "viewQuery": "select id from product"
  }, collection)

  // remove field
  collection.fields.removeById("json3775001192")

  return app.save(collection)
})
