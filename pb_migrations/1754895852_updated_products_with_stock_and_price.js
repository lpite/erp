/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2559003806")

  // update collection data
  unmarshal({
    "viewQuery": "select product.id,\nproduct.name,\nSUM(quantity) as stock,\n(select price from product_price where product_price.product_id = product.id order by product_price.date DESC limit 1) as price\nfrom product \nleft join product_stock\non product_stock.product_id = product.id"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_5UNO")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_kbAe",
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
    "viewQuery": "select product.id,\nproduct.name,\nSUM(quantity) as stock,\n(select price from product_price where product_price.product_id = product.id order by product_price.date limit 1) as price\nfrom product \nleft join product_stock\non product_stock.product_id = product.id"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_5UNO",
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
  collection.fields.removeById("_clone_kbAe")

  return app.save(collection)
})
