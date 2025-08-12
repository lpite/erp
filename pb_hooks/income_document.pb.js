/// <reference path="../pb_data/types.d.ts" />

onRecordAfterUpdateSuccess((e) => {
	try{
		const record = e.record.fieldsData();
		const stock_items = $app.findRecordsByFilter("product_stock", `document_id = '${record.id}' && document_type = 'income'`);
		for (let i = 0; i < stock_items.length; i++) {
			const item = stock_items[i];
			$app.delete(item);
	    }
	    if(record.posted){
			const document_items = $app.findRecordsByFilter("income_document_product", `document_id = '${record.id}'`);
			let collection = $app.findCollectionByNameOrId("product_stock")
			for (let i = 0; i < document_items.length; i++) {
				const item = document_items[i];
				let stockRecord = new Record(collection)
				stockRecord.set("document_id",record.id);
				stockRecord.set("document_type","income");
				stockRecord.set("quantity",item.fieldsData().quantity);
				stockRecord.set("product_id",item.fieldsData().product_id);
				stockRecord.set("date",record.date);
				$app.save(stockRecord);
			}

	    }

	}catch(err){
		console.error(err)
	}
    e.next();
}, "income_document");


routerAdd("POST", "/api/", (e)=>{

})
