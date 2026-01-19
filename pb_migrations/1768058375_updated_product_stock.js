/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_56496205")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select728423354",
    "maxSelect": 1,
    "name": "document_type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "income",
      "sales"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_56496205")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select728423354",
    "maxSelect": 1,
    "name": "document_type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "income",
      "sell"
    ]
  }))

  return app.save(collection)
})
