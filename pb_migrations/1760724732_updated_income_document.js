/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2672094218")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4032264475",
    "hidden": false,
    "id": "relation2603248766",
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
  const collection = app.findCollectionByNameOrId("pbc_2672094218")

  // remove field
  collection.fields.removeById("relation2603248766")

  return app.save(collection)
})
