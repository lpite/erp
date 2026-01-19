/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2559003806")

  // update collection data
  unmarshal({
    "viewQuery": "select product.id,\nproduct.name,\nproduct.article,\nproduct.oem,\nCOALESCE(SUM(quantity),0) as stock,\nCOALESCE((select price from product_price where product_price.product_id = product.id order by product_price.date DESC limit 1),0) as price,\n(product.name || ' ' || product.search_code || ' ' || product.article || ' ' || product.oem) as for_search\nfrom product \nleft join product_stock\non product_stock.product_id = product.id\nGROUP by product.id, product.name,product.search_code"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_CON6")

  // remove field
  collection.fields.removeById("_clone_WUuD")

  // remove field
  collection.fields.removeById("_clone_W7zd")

  // remove field
  collection.fields.removeById("_clone_spFD")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_bGpU",
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
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_T3De",
    "max": 0,
    "min": 0,
    "name": "article",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_h94u",
    "max": 0,
    "min": 0,
    "name": "oem",
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
    "viewQuery": "select product.id,\nproduct.name,\nproduct.article,\nproduct.oem,\nproduct.search_code as searchCode,\nCOALESCE(SUM(quantity),0) as stock,\nCOALESCE((select price from product_price where product_price.product_id = product.id order by product_price.date DESC limit 1),0) as price,\n(product.name || ' ' || product.search_code || ' ' || product.article || ' ' || product.oem) as for_search\nfrom product \nleft join product_stock\non product_stock.product_id = product.id\nGROUP by product.id, product.name,product.search_code"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_CON6",
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
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_WUuD",
    "max": 0,
    "min": 0,
    "name": "article",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_W7zd",
    "max": 0,
    "min": 0,
    "name": "oem",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_spFD",
    "max": 0,
    "min": 0,
    "name": "searchCode",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("_clone_bGpU")

  // remove field
  collection.fields.removeById("_clone_T3De")

  // remove field
  collection.fields.removeById("_clone_h94u")

  return app.save(collection)
})
