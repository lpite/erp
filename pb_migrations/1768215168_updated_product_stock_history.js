/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3978882895")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT id,quantity,date from product_stock"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "_clone_p2SN",
    "max": null,
    "min": null,
    "name": "quantity",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "_clone_rC7w",
    "max": "",
    "min": "",
    "name": "date",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3978882895")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT id from product_stock"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_p2SN")

  // remove field
  collection.fields.removeById("_clone_rC7w")

  return app.save(collection)
})
