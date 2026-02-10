const fs = require("fs")

const items = JSON.parse(fs.readFileSync(`./product.json`).toString().trim());

async function main() {

	for (let i = 0; i < items.length; i++) {
		const el = items[i];
		const { searchCode, code: article, name, place1, place2, place3, quantity, description, price} = el;
		const placesIDs = [];
		
		const brand = undefined;
		if (price == 0) {
			continue;
		}
		for (const place of [place1, place2, place3]) {
			if (!place.length) {
				continue;
			}
			await fetch("http://localhost:8090/api/collections/storage_place/records", {
				method: "POST",
				body: JSON.stringify({
					name: place,
				})
				, headers: {
					"Content-Type": "application/json"
				}
			})
			const placeId = (await fetch(`http://localhost:8090/api/collections/storage_place/records?filter=name='${place}'`).then(r => r.json()) || { items: [] }).items[0]?.id;
			placesIDs.push(placeId)
		}
		await fetch("http://localhost:8090/api/collections/brand/records", {
			method: "POST",
			body: JSON.stringify({
				name: brand,
			})
			, headers: {
				"Content-Type": "application/json"
			}
		}).then((r) => r.json())
			.then((r) => {
				// console.log("BRAND =", r)
			})
			.catch((err) => {
				console.error(err);
			})
		const brands = (await fetch(`http://localhost:8090/api/collections/brand/records?filter=name='${brand}'`).then(r => r.json()) || { items: [] });
		let brandId = "";
		if (brands && brands?.items) {
			brandId = brands?.items[0]?.id || ""
		}
		await fetch("http://localhost:8090/api/collections/product/records", {
			method: "POST",
			body: JSON.stringify({
				id: searchCode,
				name: name,
				name_for_web: name,
				article: article,
				description: description,
				places: placesIDs,
				brand: brandId
			})
			, headers: {
				"Content-Type": "application/json"
			}
		}).then(async (r) => {
			if (r.status === 400) {
				// console.log(brandId, brand)
				await fetch(`http://localhost:8090/api/collections/product/records/${searchCode}`, {
					method: "PATCH",
					body: JSON.stringify({
						// id: searchCode,
						name: name,
						name_for_web: name,
						article: article,
						description: description,
						places: placesIDs,
						brand: brandId
					})
					, headers: {
						"Content-Type": "application/json"
					}
				})
				// console.log(await r.json())
			}
		})

		await fetch("http://localhost:8090/api/collections/product_stock/records", {
			method: "POST",
			body: JSON.stringify({
				product: searchCode,
				document: "y6sdg",
				document_type: "income",
				quantity: quantity,
				date: "2022-01-01 10:00:00.123Z"
			})
			, headers: {
				"Content-Type": "application/json"
			}
		})
	

		await fetch("http://localhost:8090/api/collections/product_price/records", {
			method: "POST",
			body: JSON.stringify({
				date: "2022-01-01 10:00:00.123Z",
				document: "8029d8xn8l5nftq",
				price,
				product: searchCode
			})
			, headers: {
				"Content-Type": "application/json"
			}
		})

	}

}
main()