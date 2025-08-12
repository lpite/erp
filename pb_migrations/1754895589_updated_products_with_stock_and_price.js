/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2559003806")

  // update collection data
  unmarshal({
    "viewQuery": "select product.id,product.name ,SUM(quantity) as stock,product_price.price from product \nleft join product_stock\non product_stock.product_id = product.id\nleft join product_price\non product_price.product_id = product.id"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_4Cs7")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_H5GN",
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

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "_clone_rGD1",
    "max": null,
    "min": null,
    "name": "price",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2559003806")

  // update collection data
  unmarshal({
    "viewQuery": "select product.id,product.name ,SUM(quantity) as stock from product \nleft join product_stock\non product_stock.product_id = product.id\nleft join product_price\non product_price.product_id = product.id"
  }, collection)

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

  // remove field
  collection.fields.removeById("_clone_H5GN")

  // remove field
  collection.fields.removeById("_clone_rGD1")

  return app.save(collection)
})
