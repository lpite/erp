/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1108966215")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_Qff7umVigc` ON `product` (\n  `name`,\n  `article`,\n  `oem`,\n  `description`,\n  `name_for_web`\n)"
    ]
  }, collection)

  // update field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text37359206",
    "max": 0,
    "min": 0,
    "name": "article",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1108966215")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_p7huF4h9nt` ON `product` (`article`)",
      "CREATE INDEX `idx_Qff7umVigc` ON `product` (\n  `name`,\n  `article`,\n  `oem`,\n  `description`,\n  `name_for_web`\n)"
    ]
  }, collection)

  // update field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "NULL",
    "hidden": false,
    "id": "text37359206",
    "max": 0,
    "min": 0,
    "name": "article",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
