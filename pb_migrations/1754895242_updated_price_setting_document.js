/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_300741986")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "bool3651516835",
    "name": "posted",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_300741986")

  // remove field
  collection.fields.removeById("bool3651516835")

  return app.save(collection)
})
