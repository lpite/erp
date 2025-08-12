/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2559003806")

  // update collection data
  unmarshal({
    "name": "products_with_stock_and_price",
    "viewQuery": "select product.id,product.name ,SUM(quantity) as stock from product \nleft join product_stock\non product_stock.product_id = product.id\nleft join product_price\non product_price.product_id = product.id"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_M2Qk")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_4Cs7",
    "max": 0,
    "min": 0,
    "name": "name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2559003806")

  // update collection data
  unmarshal({
    "name": "products_with_stocks",
    "viewQuery": "select product.id,product.name ,SUM(quantity) as stock from product \nleft join product_stock\non product_stock.product_id = product.id"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_M2Qk",
    "max": 0,
    "min": 0,
    "name": "name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("_clone_4Cs7")

  return app.save(collection)
})
