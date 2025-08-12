/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2672094218")

  // remove field
  collection.fields.removeById("text2316331774")

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
  const collection = app.findCollectionByNameOrId("pbc_2672094218")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2316331774",
    "max": 0,
    "min": 0,
    "name": "meow",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("bool3651516835")

  return app.save(collection)
})
