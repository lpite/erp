// for remote syncing

const baseFromUrl = "http://192.168.0.107/shop/odata/standard.odata/";
const baseToUrl = "http://192.168.0.107/shop/odata/standard.odata/";

type ODataResponseError = {
	"o.data.error": string,
	message: {
		lang: string,
		value: string
	}
}

type ODataResponse<T> = ODataResponseError | T | undefined;

type InitialStockDocument = {
	Ref_Key: string,
	Date: string,
	Posted: boolean,
	Товары: { Ref_Key: string, Номенклатура_Key: string, Количество: number, Цена: number }[]
}

async function getInitialStock() {

	const document = await fetch(`${baseFromUrl}/Document_ВводОстатков?$format=json`).then(r => r.json())
		.catch((err) => {
			console.error("cant fetch initial stock");
			console.error(err);
		}) as ODataResponse<InitialStockDocument>

	if (document && "o.data.error" in document) {
		return;
	}

	if (!document) {
		console.error("document is undefined");
		return;
	}

	for (const item of document.Товары) {
		await fetch(`${baseToUrl}/`)
	}
}


async function getProducts() {

}


