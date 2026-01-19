/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2672094218")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2291690852",
    "hidden": false,
    "id": "relation3971189756",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "warehouse",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2672094218")

  // remove field
  collection.fields.removeById("relation3971189756")

  return app.save(collection)
})
