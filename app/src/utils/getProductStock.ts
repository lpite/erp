import { Collections } from "../../pocketbase-types";
import { pb } from "./pb";

export async function getProductStock(id: string, date: Date) {
  const stocks = await pb
    .collection(Collections.ProductStockHistory)
    .getFullList({
      filter: `product = '${id}' && date <= '${date.toISOString()}'`,
    });
  return stocks.reduce((p, c) => p + c.quantity, 0);
}
