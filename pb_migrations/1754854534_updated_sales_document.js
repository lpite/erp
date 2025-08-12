/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2990434245")

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

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "date2862495610",
    "max": "",
    "min": "",
    "name": "date",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2990434245")

  // remove field
  collection.fields.removeById("bool3651516835")

  // remove field
  collection.fields.removeById("date2862495610")

  return app.save(collection)
})
