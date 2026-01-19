/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_558171972");

  return app.delete(collection);
}, (app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_RMek",
        "max": 0,
        "min": 0,
        "name": "name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_YuS7",
        "max": 0,
        "min": 0,
        "name": "article",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_jbEl",
        "max": 0,
        "min": 0,
        "name": "oem",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "_clone_LPVw",
        "maxSelect": 99,
        "maxSize": 0,
        "mimeTypes": [],
        "name": "photos",
        "presentable": false,
        "protected": false,
        "required": false,
        "system": false,
        "thumbs": [],
        "type": "file"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3608430515",
        "hidden": false,
        "id": "_clone_ucii",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "brand",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_8d6c",
        "max": 0,
        "min": 0,
        "name": "description",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "json1261852256",
        "maxSize": 1,
        "name": "stock",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json3402113753",
        "maxSize": 1,
        "name": "price",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      }
    ],
    "id": "pbc_558171972",
    "indexes": [],
    "listRule": "",
    "name": "products_with_stock_and_price",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "select product.id,\nproduct.name,\nproduct.article,\nproduct.oem,\nproduct.photos,\nproduct.brand,\nproduct.description,\nCOALESCE(SUM(quantity),0) as stock,\nCOALESCE((select price from product_price where product_price.product = product.id order by product_price.date DESC limit 1),0) as price\nfrom product \nleft join product_stock\non product_stock.product = product.id\nGROUP by product.id, product.name",
    "viewRule": ""
  });

  return app.save(collection);
})
