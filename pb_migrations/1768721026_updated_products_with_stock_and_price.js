/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_558171972")

  // update collection data
  unmarshal({
    "viewQuery": "select product.id,\nproduct.name,\nproduct.article,\nproduct.oem,\nproduct.photos,\nproduct.brand,\nproduct.name_for_print,\nproduct.name_for_web,\nproduct.description,\nproduct.supplier,\nCOALESCE(SUM(quantity),0) as stock,\nCOALESCE((select price from product_price where product_price.product = product.id order by product_price.date DESC limit 1),0) as price,\nLOWER(trim(product.name || ' ' || product.article || ' ' || product.oem)) as for_search\nfrom product \nleft join product_stock\non product_stock.product = product.id\nGROUP by product.id, product.name"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_GQPD")

  // remove field
  collection.fields.removeById("_clone_cxoO")

  // remove field
  collection.fields.removeById("_clone_Uy3K")

  // remove field
  collection.fields.removeById("_clone_5mNi")

  // remove field
  collection.fields.removeById("_clone_mJaw")

  // remove field
  collection.fields.removeById("_clone_Heu9")

  // remove field
  collection.fields.removeById("_clone_oygK")

  // remove field
  collection.fields.removeById("_clone_7y6N")

  // remove field
  collection.fields.removeById("_clone_viEJ")

  // remove field
  collection.fields.removeById("_clone_Q8jw")

  // remove field
  collection.fields.removeById("_clone_zv3H")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_Izqz",
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
    "id": "_clone_xKt6",
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
    "id": "_clone_45Y9",
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
    "id": "_clone_o0kB",
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
    "id": "_clone_z0wZ",
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
    "id": "_clone_qydo",
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
    "id": "_clone_txgj",
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
    "id": "_clone_2ai5",
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
    "id": "_clone_O39B",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "supplier",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_558171972")

  // update collection data
  unmarshal({
    "viewQuery": "select product.id,\nproduct.name,\nproduct.article,\nproduct.oem,\nproduct.photos,\nproduct.brand,\nproduct.name_for_print,\nproduct.name_for_web,\nproduct.description,\nproduct.supplier,\nproduct.updated,\nproduct.created,\nCOALESCE(SUM(quantity),0) as stock,\nCOALESCE((select price from product_price where product_price.product = product.id order by product_price.date DESC limit 1),0) as price,\nLOWER(trim(product.name || ' ' || product.article || ' ' || product.oem)) as for_search\nfrom product \nleft join product_stock\non product_stock.product = product.id\nGROUP by product.id, product.name"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_GQPD",
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
    "id": "_clone_cxoO",
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
    "id": "_clone_Uy3K",
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
    "id": "_clone_5mNi",
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
    "id": "_clone_mJaw",
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
    "id": "_clone_Heu9",
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
    "id": "_clone_oygK",
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
    "id": "_clone_7y6N",
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
    "id": "_clone_viEJ",
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
    "id": "_clone_Q8jw",
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
    "id": "_clone_zv3H",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // remove field
  collection.fields.removeById("_clone_Izqz")

  // remove field
  collection.fields.removeById("_clone_xKt6")

  // remove field
  collection.fields.removeById("_clone_45Y9")

  // remove field
  collection.fields.removeById("_clone_o0kB")

  // remove field
  collection.fields.removeById("_clone_z0wZ")

  // remove field
  collection.fields.removeById("_clone_qydo")

  // remove field
  collection.fields.removeById("_clone_txgj")

  // remove field
  collection.fields.removeById("_clone_2ai5")

  // remove field
  collection.fields.removeById("_clone_O39B")

  return app.save(collection)
})
