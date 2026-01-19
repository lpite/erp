import { FormEvent, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
	createColumnHelper,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Collections,
	ProductsWithStockAndPriceResponse,
} from "../../pocketbase-types";

import useSWR from "swr";
import { pb } from "../utils/pb";
import { create } from "zustand";

import { IncomeDocumentItem } from "../models/income-document";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MyTable } from "./table";
import { createPortal } from "react-dom";
import TableContainer from "@mui/material/TableContainer";
import Checkbox from "@mui/material/Checkbox";

const columnHelper = createColumnHelper<ProductsWithStockAndPriceResponse>();
const columns = [
	columnHelper.accessor("id", {
		cell: (r) => <span dangerouslySetInnerHTML={{ __html: r.getValue() }}></span>,
	}),
	columnHelper.accessor("oem", {
		cell: (r) => <span dangerouslySetInnerHTML={{ __html: r.getValue() }}></span>,
	}),
	columnHelper.accessor("article", {
		cell: (r) => <span dangerouslySetInnerHTML={{ __html: r.getValue() }}></span>,
	}),
	columnHelper.accessor("name", {
		cell: (r) => <span dangerouslySetInnerHTML={{ __html: r.getValue() }}></span>,
	}),
	columnHelper.accessor("description", {
		cell: (r) => <span dangerouslySetInnerHTML={{ __html: r.getValue() }}></span>,
	}),
	columnHelper.accessor("price", {
		cell: (r) => r.getValue(),
	}),
	columnHelper.accessor("stock", {
		cell: (r) => r.getValue(),
	}),
];

interface ProductSelectionDialogProps {
	addNewItem: (item: IncomeDocumentItem) => void;
	disabled: boolean;
	type: "income" | "sales";
}

const cartStore = create<{ items: IncomeDocumentItem[] }>((_) => ({
	items: [],
}));

const emty: never[] = [];

export function ProductSelectionToDocumentDialog({
	addNewItem,
	disabled,
	type,
}: ProductSelectionDialogProps) {
	//TODO переписати цей компонент нормально.
	const [isOpen, setIsOpen] = useState(false);
	const [showNewItemDialog, setShowNewItemDialog] = useState(false);
	const [newItemIndex, setNewItemIndex] = useState<number | null>(null);
	const [newItemQuantity, setNewItemQuantity] = useState(1);
	const [newItemPrice, setNewItemPrice] = useState(0);
	const [searchValue, setSearchValue] = useState("");
	const [exactSearch, setExactSearch] = useState(false);

	const cartItems = cartStore((s) => s.items);
	const addToCart = (newItem: IncomeDocumentItem) =>
		cartStore.setState((state) => {
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
		});
	const clearCart = () => cartStore.setState({ items: [] });

	const { data, isLoading, mutate } = useSWR(
		["fts", searchValue, exactSearch],
		() =>
			fetch(`http://localhost:3000/api/search?q=${searchValue}`).then(r => r.json())
		// pb
		// 	.collection(Collections.ProductsWithStockAndPrice)
		// 	.getList(undefined, 100, {
		// 		filter: exactSearch
		// 			? `id = '${searchValue}'`
		// 			: `for_search~'%${searchValue}%'`,
		// 	}),
		// {},
	);

	const table = useReactTable({
		data: emty,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	function search(e: FormEvent) {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		const searchValue = data.get("searchValue")?.toString().trim();
		if (searchValue?.length) {
			setSearchValue(searchValue);
			mutate();
		}
	}

	function saveCart() {
		//TODO забрати цикл.
		cartItems.forEach((item) => {
			addNewItem(item);
		});
		clearCart();
		setIsOpen(false);
	}

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="border px-1 py-0.5 rounded-sm disabled:opacity-35"
				disabled={disabled}
			>
				Підібрати товари
			</button>
			{createPortal(
				<>
					<Dialog.Root
						open={showNewItemDialog}
						onOpenChange={setShowNewItemDialog}
					>
						<Dialog.Overlay className="fixed z-50 top-0 left-0 bg-black/10 w-full h-full" />
						<Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-1/2 z-20 w-96 bg-white rounded-xl p-4">
							<Dialog.Title className="text-start text-xl">
								Додати?
							</Dialog.Title>
							{newItemIndex !== null ? (
								<form className="flex flex-col gap-3">
									<div className="flex flex-col grow gap-2">
										<span className="flex">
											{newItemIndex !== null
												? data?.items[newItemIndex].name
												: null}
										</span>
										<TextField
											label="Ціна"
											size="small"
											defaultValue={
												data?.items[newItemIndex].price
											}
											value={newItemPrice}
											onChange={(e) =>
												setNewItemPrice(
													Number(e.target.value),
												)
											}
										/>
										<TextField
											label="Кількість"
											size="small"
											value={newItemQuantity}
											onChange={(e) =>
												setNewItemQuantity(
													Number(e.target.value),
												)
											}
										/>
									</div>
									<div className="flex gap-3">
										<Button
											variant="contained"
											onClick={() => {
												if (
													newItemIndex === null ||
													!data?.items.length
												) {
													return;
												}

												const newItem =
													data.items[newItemIndex];
												addToCart({
													id: Math.random().toString(),
													quantity: newItemQuantity,
													price: newItemPrice,
													product: newItem,
												});
												setShowNewItemDialog(false);
											}}
										>
											Додати
										</Button>
										<Button
											onClick={() =>
												setShowNewItemDialog(false)
											}
										>
											Скасувати
										</Button>
									</div>
								</form>
							) : null}
						</Dialog.Content>
					</Dialog.Root>
					{isOpen && (
						<div className="top-0 left-0 end-0 right-0 w-full h-full fixed bg-white px-3 z-30 flex flex-col pb-3">
							<div>
								<span className="flex text-2xl">Підбір</span>
								<Button onClick={saveCart}>Перенести</Button>
								<div className="flex">
									<form
										onSubmit={search}
										className="flex gap-2"
									>
										<TextField
											size="small"
											className="border rounded-sm px-1 py-0.5"
											name="searchValue"
										/>
										<label>
											<Checkbox
												checked={exactSearch}
												onChange={() =>
													setExactSearch(!exactSearch)
												}
											/>
										</label>
										<Button
											variant="outlined"
											disabled={isLoading}
										>
											Пошук
										</Button>
									</form>
								</div>
							</div>
							{isLoading ? "loading" : null}
							<TableContainer className="mb-24">
								<MyTable
									columns={columns}
									data={data?.items}
									onRowDoubleClick={(row) => {
										if (type === "sales") {
											if (!data) {
												return;
											}
											const newItem =
												data.items[row.index];

											addToCart({
												id: Math.random().toString(),
												quantity: 1,
												price: newItem.price,
												product: newItem,
											});
											return;
										}
										setShowNewItemDialog(true);
										setNewItemIndex(row.index);
									}}
								/>
							</TableContainer>
							<div className="w-full h-24 fixed bottom-0 bg-white">
								{cartItems.map((item) => (
									<div>
										{item.product?.name} {item.quantity}{" "}
										{item.price}
									</div>
								))}
							</div>
						</div>
					)}
				</>,
				//@ts-expect-error meow
				document.getElementById("portal-root"),
			)}
		</>
	);
}
