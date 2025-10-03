/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1888862789")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "file3775001192",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "file",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1888862789")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "file3775001192",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "m",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
