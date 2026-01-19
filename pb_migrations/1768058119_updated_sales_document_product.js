/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2401428289")

  // update collection data
  unmarshal({
    "name": "sales_document_item"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2401428289")

  // update collection data
  unmarshal({
    "name": "sales_document_product"
  }, collection)

  return app.save(collection)
})
