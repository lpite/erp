/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4032264475")

  // update collection data
  unmarshal({
    "name": "client"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4032264475")

  // update collection data
  unmarshal({
    "name": "partner"
  }, collection)

  return app.save(collection)
})
