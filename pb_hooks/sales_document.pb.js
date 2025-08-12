/// <reference path="../pb_data/types.d.ts" />

onRecordAfterUpdateSuccess((e) => {
	try {
		const record = e.record.fieldsData();
		const stock_items = $app.findRecordsByFilter("product_stock", `document_id = '${record.id}' && document_type = 'sales'`);
		for (let i = 0; i < stock_items.length; i++) {
			const item = stock_items[i];
			$app.delete(item);
		}
		const document_items = $app.findRecordsByFilter("sales_document_product", `document_id = '${record.id}'`);
		if (record.posted) {
			let collection = $app.findCollectionByNameOrId("product_stock")
			for (let i = 0; i < document_items.length; i++) {
				const item = document_items[i];
				let stockRecord = new Record(collection)
				stockRecord.set("document_id", record.id);
				stockRecord.set("document_type", "sales");
				stockRecord.set("quantity", -item.fieldsData().quantity);
				stockRecord.set("product_id", item.fieldsData().product_id);
				stockRecord.set("date", record.date);
				$app.save(stockRecord);
			}

		}

	} catch (err) {
		console.error(err)
	}

	e.next()

}, "sales_document")

routerAdd("POST", "/sales_document", (e) => {
	const data = new DynamicModel({ "partnerId": "z5md57r6fce9fyb", "agentName": "gav", "products": [{ "collectionId": "pbc_2559003806", "collectionName": "products_with_stock_and_price", "id": "y1molqg28gk7gpx", "name": "meow", "price": 40, "quantity": 1, "searchCode": "0123", "code": "", "vendorCode": "", "place1": "", "place2": "", "place3": "" }] })
	e.bindBody(data)
	const itemCollection = $app.findCollectionByNameOrId("sales_document_product"); 
	const documents = $app.findRecordsByFilter("sales_document", `client_id = '${data.partnerId}'`)
	let document = documents[0]
	for (var i = 0; i < data.products.length; i++) {
		const item = data.products[i]
		let newItem = new Record(itemCollection);
		newItem.set("product_id", item.id);
		newItem.set("quantity", item.quantity);
		newItem.set("price", item.price);
		newItem.set("document_id", document.fieldsData().id)	
		$app.save(newItem);
		console.log(item.id)
	}
	document.set("posted", false);
	$app.save(document);
	const document_items = $app.findRecordsByFilter("sales_document_product", `document_id = '${document.id}'`);

	let newSum = 0;
	for (let i = 0; i < document_items.length; i++) {
		const item = document_items[i];
		newSum += item.fieldsData().price;
	}

	document.set("sum", newSum);
	document.set("posted", true);

	$app.save(document);

	
	return e.json(200, "Успешно")
})