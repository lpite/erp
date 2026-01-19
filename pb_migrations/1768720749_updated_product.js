/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1108966215")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_p7huF4h9nt` ON `product` (`article`)",
      "CREATE INDEX `idx_Qff7umVigc` ON `product` (\n  `name`,\n  `article`,\n  `oem`,\n  `description`,\n  `name_for_web`\n)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1108966215")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_p7huF4h9nt` ON `product` (`article`)"
    ]
  }, collection)

  return app.save(collection)
})
