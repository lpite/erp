/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_558171972")

  // update collection data
  unmarshal({
    "viewQuery": "select product.id,\nproduct.name,\nproduct.article,\nproduct.oem,\nproduct.photos,\nproduct.brand,\nproduct.name_for_print,\nproduct.name_for_web,\nproduct.description,\nproduct.supplier,\nproduct.updated,\nproduct.created,\nCOALESCE(SUM(quantity),0) as stock,\nCOALESCE((select price from product_price where product_price.product = product.id order by product_price.date DESC limit 1),0) as price,\ntrim(product.name || ' ' || product.article || ' ' || product.oem) as for_search\nfrom product \nleft join product_stock\non product_stock.product = product.id\nGROUP by product.id, product.name"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_2IHp")

  // remove field
  collection.fields.removeById("_clone_dxpK")

  // remove field
  collection.fields.removeById("_clone_6NrN")

  // remove field
  collection.fields.removeById("_clone_v7rC")

  // remove field
  collection.fields.removeById("_clone_ySH1")

  // remove field
  collection.fields.removeById("_clone_MBt7")

  // remove field
  collection.fields.removeById("_clone_Ywzx")

  // remove field
  collection.fields.removeById("_clone_SHke")

  // remove field
  collection.fields.removeById("_clone_XLf0")

  // remove field
  collection.fields.removeById("_clone_qcjO")

  // remove field
  collection.fields.removeById("_clone_AQEY")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_2Sbp",
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
    "id": "_clone_sc04",
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
    "id": "_clone_eans",
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
    "hidden": false,
    "id": "_clone_EX09",
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
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3608430515",
    "hidden": false,
    "id": "_clone_8fhN",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "brand",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_L3cV",
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
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_Ejrl",
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

  // add field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_wDRT",
    "max": 0,
    "min": 0,
    "name": "description",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3680777319",
    "hidden": false,
    "id": "_clone_1EAl",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "supplier",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "_clone_k5Rt",
    "name": "updated",
    "onCreate": true,
    "onUpdate": true,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "_clone_pP3J",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_558171972")

  // update collection data
  unmarshal({
    "viewQuery": "select product.id,\nproduct.name,\nproduct.article,\nproduct.oem,\nproduct.photos,\nproduct.brand,\nproduct.name_for_print,\nproduct.name_for_web,\nproduct.description,\nproduct.supplier,\nproduct.updated,\nproduct.created,\nCOALESCE(SUM(quantity),0) as stock,\nCOALESCE((select price from product_price where product_price.product_id = product.id order by product_price.date DESC limit 1),0) as price,\ntrim(product.name || ' ' || product.article || ' ' || product.oem) as for_search\nfrom product \nleft join product_stock\non product_stock.product = product.id\nGROUP by product.id, product.name"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_2IHp",
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
    "id": "_clone_dxpK",
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
    "id": "_clone_6NrN",
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
    "hidden": false,
    "id": "_clone_v7rC",
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
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3608430515",
    "hidden": false,
    "id": "_clone_ySH1",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "brand",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_MBt7",
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
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_Ywzx",
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

  // add field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_SHke",
    "max": 0,
    "min": 0,
    "name": "description",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3680777319",
    "hidden": false,
    "id": "_clone_XLf0",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "supplier",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "_clone_qcjO",
    "name": "updated",
    "onCreate": true,
    "onUpdate": true,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "_clone_AQEY",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // remove field
  collection.fields.removeById("_clone_2Sbp")

  // remove field
  collection.fields.removeById("_clone_sc04")

  // remove field
  collection.fields.removeById("_clone_eans")

  // remove field
  collection.fields.removeById("_clone_EX09")

  // remove field
  collection.fields.removeById("_clone_8fhN")

  // remove field
  collection.fields.removeById("_clone_L3cV")

  // remove field
  collection.fields.removeById("_clone_Ejrl")

  // remove field
  collection.fields.removeById("_clone_wDRT")

  // remove field
  collection.fields.removeById("_clone_1EAl")

  // remove field
  collection.fields.removeById("_clone_k5Rt")

  // remove field
  collection.fields.removeById("_clone_pP3J")

  return app.save(collection)
})
