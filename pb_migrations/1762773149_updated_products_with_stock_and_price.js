/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_558171972")

  // update collection data
  unmarshal({
    "viewQuery": "select product.id,\nproduct.name,\nproduct.article,\nproduct.oem,\nproduct.photos,\nproduct.brand,\nproduct.name_for_print,\nproduct.name_for_web,\nproduct.description,\nproduct.supplier,\nproduct.updated,\nCOALESCE(SUM(quantity),0) as stock,\nCOALESCE((select price from product_price where product_price.product_id = product.id order by product_price.date DESC limit 1),0) as price,\n(product.name || ' ' || product.article || ' ' || product.oem) as for_search\nfrom product \nleft join product_stock\non product_stock.product_id = product.id\nGROUP by product.id, product.name"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_SiU1")

  // remove field
  collection.fields.removeById("_clone_GKtM")

  // remove field
  collection.fields.removeById("_clone_vxeZ")

  // remove field
  collection.fields.removeById("_clone_Vw9e")

  // remove field
  collection.fields.removeById("_clone_GXce")

  // remove field
  collection.fields.removeById("_clone_6ja1")

  // remove field
  collection.fields.removeById("_clone_W48i")

  // remove field
  collection.fields.removeById("_clone_wHsS")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_LVAM",
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
    "id": "_clone_ojvZ",
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
    "id": "_clone_13dA",
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
    "id": "_clone_mhKw",
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
    "id": "_clone_kbkG",
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
    "id": "_clone_hLt2",
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
    "id": "_clone_deoQ",
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
    "id": "_clone_UhD8",
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
    "id": "_clone_MDt6",
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
    "id": "_clone_AYUr",
    "name": "updated",
    "onCreate": true,
    "onUpdate": true,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_558171972")

  // update collection data
  unmarshal({
    "viewQuery": "select product.id,\nproduct.name,\nproduct.article,\nproduct.oem,\nCOALESCE(SUM(quantity),0) as stock,\nCOALESCE((select price from product_price where product_price.product_id = product.id order by product_price.date DESC limit 1),0) as price,\n(product.name || ' ' || product.article || ' ' || product.oem) as for_search,\nproduct.photos,\nproduct.brand,\nproduct.name_for_print,\nproduct.name_for_web,\nproduct.description\nfrom product \nleft join product_stock\non product_stock.product_id = product.id\nGROUP by product.id, product.name"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_SiU1",
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
    "id": "_clone_GKtM",
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
    "id": "_clone_vxeZ",
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
    "id": "_clone_Vw9e",
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
    "id": "_clone_GXce",
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
    "id": "_clone_6ja1",
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
    "id": "_clone_W48i",
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
  collection.fields.addAt(11, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_wHsS",
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

  // remove field
  collection.fields.removeById("_clone_LVAM")

  // remove field
  collection.fields.removeById("_clone_ojvZ")

  // remove field
  collection.fields.removeById("_clone_13dA")

  // remove field
  collection.fields.removeById("_clone_mhKw")

  // remove field
  collection.fields.removeById("_clone_kbkG")

  // remove field
  collection.fields.removeById("_clone_hLt2")

  // remove field
  collection.fields.removeById("_clone_deoQ")

  // remove field
  collection.fields.removeById("_clone_UhD8")

  // remove field
  collection.fields.removeById("_clone_MDt6")

  // remove field
  collection.fields.removeById("_clone_AYUr")

  return app.save(collection)
})
