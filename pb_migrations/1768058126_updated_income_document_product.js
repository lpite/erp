/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_895339968")

  // update collection data
  unmarshal({
    "name": "income_document_item"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_895339968")

  // update collection data
  unmarshal({
    "name": "income_document_product"
  }, collection)

  return app.save(collection)
})
