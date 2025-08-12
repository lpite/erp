/// <reference path="../pb_data/types.d.ts" />

onRecordAfterUpdateSuccess((e) => {
	try{
		const record = e.record.fieldsData();
		const price_items = $app.findRecordsByFilter("product_price", `document_id = '${record.id}'`);
		for (let i = 0; i < price_items.length; i++) {
			const item = price_items[i];
			$app.delete(item);
	    }
	    if(record.posted){
			const document_items = $app.findRecordsByFilter("price_setting_document_product", `document_id = '${record.id}'`);
			let collection = $app.findCollectionByNameOrId("product_price")
			for (let i = 0; i < document_items.length; i++) {
				const item = document_items[i];
				let priceRecord = new Record(collection)
				priceRecord.set("document_id",record.id);
				priceRecord.set("price",item.fieldsData().price);
				priceRecord.set("product_id",item.fieldsData().product_id);
				priceRecord.set("date",record.date);
				$app.save(priceRecord);
			}

	    }

	}catch(err){
		console.error(err)
	}

    e.next()

}, "price_setting_document")
