const fs = require("fs")
import {parse} from "csv-parse"
const records = [];
const content = fs.readFileSync(`./product_rows.csv`);
// Initialize the parser
const parser = parse(content,{});
parser.forEach((el)=>{
	const [id,searchCode,crat,upat,name,price,workName,article,quantity,category,brand,desc,units,alt,pop,photos,places] = el
	
	if(price == 0 || id == "id"){
		// console.log(name);
		return;
	}

	fetch("http://localhost:8090/api/collections/product/records",{
		method:"POST",
		body:JSON.stringify({
			id:searchCode,
			name:name,
			name_for_web:name,
			article:article,
			description:desc,
		})
		,headers:{
			"Content-Type":"application/json"
		}
	}).then(async(r)=>{
		if(!r.ok){
			console.log(await r.json())
		}
	})

	// fetch("http://localhost:8090/api/collections/product_stock/records",{
	// 	method:"POST",
	// 	body:JSON.stringify({
	// 		product:searchCode,
	// 		document:"y6sdg",
	// 		document_type:"income",
	// 		quantity:quantity,
	// 		date:"2022-01-01 10:00:00.123Z"
	// 	})
	// 	,headers:{
	// 		"Content-Type":"application/json"
	// 	}
	// })
	

	// fetch("http://localhost:8090/api/collections/product_price/records",{
	// 	method:"POST",
	// 	body:JSON.stringify({
	// 		date: "2022-01-01 10:00:00.123Z",
	// 		document:"8029d8xn8l5nftq",
	// 		price,
	// 		product:searchCode
	// 	})
	// 	,headers:{
	// 		"Content-Type":"application/json"
	// 	}
	// })

})
// parser.on("readable", function () {
//   let record;
//   while ((record = parser.read()) !== null) {
//     records.push(record);
//   }
// });