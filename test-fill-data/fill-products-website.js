const fs = require("fs")
import { parse } from "csv-parse"
const records = [];
const content = fs.readFileSync(`./product_rows.csv`);

async function main() {

	const parser = parse(content, {});
	const items = await parser.toArray();
	for (let i = 0; i < items.length; i++) {
		const el = items[i];
		const [id, searchCode, crat, upat, name, price, workName, article, quantity, category, brand, desc, units, alt, pop, photos, places] = el
		const placesIDs = [];
	
		if (price == 0 || id == "id") {
			continue;
		}
		for (const place of JSON.parse(places)) {
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
				description: desc,
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
						description: desc,
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