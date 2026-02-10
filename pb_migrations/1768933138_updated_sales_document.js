/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2990434245")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number3367870285",
    "max": null,
    "min": null,
    "name": "sum",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2990434245")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number3367870285",
    "max": null,
    "min": null,
    "name": "sum",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
