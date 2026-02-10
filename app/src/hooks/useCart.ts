import { create } from "zustand";
import { ProductRecord } from "../../pocketbase-types";

interface Item {
	product: ProductRecord;
	quantity: number;
	price: number;
}

interface CartStore {
	items: Item[];
	addItem: (item: Item) => void;
	removeItem: (id: string) => void;
	changeItemQuantity: (id: string, quantity: number) => void;
	clearCart: () => void;
}

export const useCart = create<CartStore>()((set) => ({
	items: [],
	addItem: (newItem) =>
		set((state) => {
			if (
				state.items.findIndex(
					(el) => el.product?.id === newItem.product?.id,
				) === -1
			) {
				return {
					items: [...state.items, newItem],
				};
			}
			return {
				items: state.items.map((item) => {
					if (item.product?.id === newItem.product?.id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				}),
			};
		}),
	removeItem: (id) =>
		set((state) => ({
			items: state.items.filter((item) => item.product.id !== id),
		})),
	changeItemQuantity: (id, newQuantity) =>
		set((state) => ({
			items: state.items.map((item) => {
				if (item.product.id === id) {
					return {
						...item,
						quantity: newQuantity,
					};
				}
				return item;
			}),
		})),
	clearCart: () => set(() => ({ items: [] })),
}));
