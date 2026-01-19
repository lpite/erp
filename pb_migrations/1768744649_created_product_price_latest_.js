/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
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
    "id": "pbc_1014981976",
    "indexes": [],
    "listRule": null,
    "name": "product_price_latest",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "select product.id,\nCOALESCE((select price from product_price where product_price.product = product.id order by product_price.date DESC limit 1),0) as price\nfrom product \nGROUP by product.id",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1014981976");

  return app.delete(collection);
})
