/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2559003806")

  // update collection data
  unmarshal({
    "viewQuery": "select product.id,\nproduct.name,\nSUM(quantity) as stock,\n(select price from product_price where product_price.product_id = product.id ) as price\nfrom product \nleft join product_stock\non product_stock.product_id = product.id"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_FbAg")

  // remove field
  collection.fields.removeById("_clone_Pj5c")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_MBMy",
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
    "id": "json3402113753",
    "maxSize": 1,
    "name": "price",
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
    "viewQuery": "select product.id,\nproduct.name,\nSUM(quantity) as stock,\nproduct_price.price \nfrom product \nleft join product_stock\non product_stock.product_id = product.id\nleft join product_price\non product_price.product_id = product.id"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_FbAg",
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
    "id": "_clone_Pj5c",
    "max": null,
    "min": null,
    "name": "price",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("_clone_MBMy")

  // remove field
  collection.fields.removeById("json3402113753")

  return app.save(collection)
})
