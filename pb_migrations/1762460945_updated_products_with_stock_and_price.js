/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_558171972")

  // update collection data
  unmarshal({
    "viewQuery": "select product.id,\nproduct.name,\nproduct.article,\nproduct.oem,\nCOALESCE(SUM(quantity),0) as stock,\nCOALESCE((select price from product_price where product_price.product_id = product.id order by product_price.date DESC limit 1),0) as price,\n(product.name || ' ' || product.article || ' ' || product.oem) as for_search,\nproduct.photos,\nproduct.brand,\nproduct.name_for_print,\nproduct.name_for_web \nfrom product \nleft join product_stock\non product_stock.product_id = product.id\nGROUP by product.id, product.name"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_K37w")

  // remove field
  collection.fields.removeById("_clone_skrm")

  // remove field
  collection.fields.removeById("_clone_Fsse")

  // remove field
  collection.fields.removeById("_clone_k2t7")

  // remove field
  collection.fields.removeById("_clone_J7R7")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_le8P",
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
    "id": "_clone_2ukk",
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
    "id": "_clone_emHN",
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
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "_clone_JYBh",
    "maxSelect": 99,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "photos",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3608430515",
    "hidden": false,
    "id": "_clone_7hxY",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "brand",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_Jn1p",
    "max": 0,
    "min": 0,
    "name": "name_for_print",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_bqgo",
    "max": 0,
    "min": 0,
    "name": "name_for_web",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_558171972")

  // update collection data
  unmarshal({
    "viewQuery": "select product.id,\nproduct.name,\nproduct.article,\nproduct.oem,\nCOALESCE(SUM(quantity),0) as stock,\nCOALESCE((select price from product_price where product_price.product_id = product.id order by product_price.date DESC limit 1),0) as price,\n(product.name || ' ' || product.article || ' ' || product.oem) as for_search,\nproduct.photos,\nproduct_stock.product_id\nfrom product \nleft join product_stock\non product_stock.product_id = product.id\nGROUP by product.id, product.name"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_K37w",
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
    "id": "_clone_skrm",
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
    "id": "_clone_Fsse",
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
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "_clone_k2t7",
    "maxSelect": 99,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "photos",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1108966215",
    "hidden": false,
    "id": "_clone_J7R7",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "product_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("_clone_le8P")

  // remove field
  collection.fields.removeById("_clone_2ukk")

  // remove field
  collection.fields.removeById("_clone_emHN")

  // remove field
  collection.fields.removeById("_clone_JYBh")

  // remove field
  collection.fields.removeById("_clone_7hxY")

  // remove field
  collection.fields.removeById("_clone_Jn1p")

  // remove field
  collection.fields.removeById("_clone_bqgo")

  return app.save(collection)
})
