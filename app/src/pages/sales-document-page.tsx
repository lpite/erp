import { useState, useMemo, ChangeEvent } from "react";

import Button from "@mui/material/Button";
import { Link, useLocation, useParams } from "wouter";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { SalesDocument, SalesDocumentItem } from "../models/sales-document";
import useSWR from "swr";
import { pb } from "../utils/pb";
import { MyTable } from "../components/table";
import { createColumnHelper } from "@tanstack/react-table";
import { ProductSelectionToDocumentDialog } from "../components/product-selection-to-document-dialog";
import TableContainer from "@mui/material/TableContainer";

const columnHelper = createColumnHelper<SalesDocumentItem>();

export default function SalesDocumentPage() {
	const { id } = useParams();
	const [_, navigate] = useLocation();

	const [enableEditing, setEnableEditing] = useState(
		id === "new" ? true : false,
	);

	const { data: document, mutate: mutateDocument } = useSWR(
		["income-document", id],
		() => SalesDocument.load(id as string),
		{
			revalidateIfStale: !enableEditing,
			revalidateOnFocus: !enableEditing,
		},
	);

	const columns = useMemo(
		() => [
			columnHelper.accessor("id", { cell: (c) => c.getValue() }),
			columnHelper.accessor("product.id", { cell: (c) => c.getValue() }),
			columnHelper.accessor("product.name", {
				cell: (c) => c.getValue(),
			}),
			columnHelper.accessor("product.brand.name", {
				cell: (c) => c.getValue(),
			}),
			columnHelper.accessor("price", {
				cell: (c) => c.getValue(),
				meta: {
					editable: true,
					onChange: (row: number, value: string | number) => {
						console.log(row, value);

						mutateDocument(
							(s) => {
								console.log(s);
								if (s) {
									const newItems = [...(s?.items || [])];
									newItems[row]["price"] = Number(value);
									console.log(newItems);
									return { ...s, items: newItems };
								}
							},
							{
								revalidate: false,
							},
						);
					},
				},
			}),
			columnHelper.accessor("quantity", { cell: (c) => c.getValue() }),
		],
		[document, mutateDocument],
	);

	const { data: clients } = useSWR("partners", () =>
		pb.collection("partner").getList(),
	);

	async function saveDocument() {
		if (!document) {
			return;
		}
		if (!document.id.length) {
			const newId = await SalesDocument.create(document);
			if (newId) {
				navigate(`/sales-document/${newId}`, { replace: true });
			}
			return;
		}

		if (await SalesDocument.save(document.id, document)) {
			setEnableEditing(false);
		}
	}

	async function postDocument() {
		//TODO: винести функцію в модель.
		if (!document) {
			return;
		}

		if (!document.id.length) {
			const newId = await SalesDocument.create({
				...document,
				posted: true,
			});
			setEnableEditing(false);
			return newId;
		}

		if (
			await SalesDocument.save(document.id, {
				...document,
				posted: true,
			})
		) {
			setEnableEditing(false);
			return true;
		}
		mutateDocument();
	}

	return (
		<main className="p-2 h-full flex flex-col">
			<title>{`Розхід`}</title>
			<Link
				href="/list/sales-document"
				className="py-2 px-3 border border-gray-100 rounded-sm hover:bg-gray-100 mb-2 mt-1 inline-block"
			>
				Повернутися
			</Link>
			<h1 className="flex text-2xl pb-3">Розхід товарів</h1>
			<div className="flex flex-col gap-2 bg-gray-50">
				<div className="flex gap-1 w-full">
					<Button
						variant="contained"
						disabled={!enableEditing}
						onClick={async () => {
							if (!document) {
								return;
							}

							if (!document.id.length) {
								const newId = await SalesDocument.create({
									...document,
									posted: true,
								});
								if (newId) {
									navigate(`/sales-document/${newId}`);
								}
								return;
							}

							if (
								await SalesDocument.save(document.id, {
									...document,
									posted: true,
								})
							) {
								navigate("/list/sales-document");
							}
						}}
					>
						Провести і закрити
					</Button>
					<Button
						variant="outlined"
						onClick={() => postDocument()}
						disabled={!enableEditing}
					>
						Провести
					</Button>
					<Button
						variant="outlined"
						color="info"
						disabled={!enableEditing}
						onClick={saveDocument}
					>
						<Icon className="mr-1">save</Icon>
						Зберегти
					</Button>

					<Button
						variant="contained"
						color="primary"
						disabled={enableEditing}
						onClick={() => setEnableEditing(true)}
					>
						<Icon className="mr-1">edit</Icon>
						Змінити
					</Button>
					<Button
						variant="outlined"
						color="warning"
						onClick={() => {
							if (!document) {
								return;
							}
							const newDocument = { ...document, posted: false };
							mutateDocument(
								(p) => {
									if (p) {
										return newDocument;
									}
								},
								{
									revalidate: false,
								},
							);

							SalesDocument.save(document.id, newDocument);
						}}
						disabled={!document?.posted}
					>
						Відміна проведення
					</Button>
				</div>
				<div className="flex gap-2">
					<TextField
						label="Номер"
						disabled={!enableEditing}
						value={document?.id || ""}
					/>
					<DateTimePicker
						label="Дата"
						disabled={!enableEditing}
						value={dayjs(document?.date)}
						onChange={(v) =>
							mutateDocument(
								(p) => {
									if (p && v) {
										return { ...p, date: v.toISOString() };
									}
								},
								{
									revalidate: false,
								},
							)
						}
						viewRenderers={{
							hours: null,
							minutes: null,
							seconds: null,
						}}
					/>
				</div>
				<div className="flex gap-2">
					<FormControl variant="outlined" size="small">
						<InputLabel id="supplier-select-lable">
							Клієнт
						</InputLabel>
						<Select
							className="min-w-42 text-start"
							disabled={!enableEditing}
							value={document?.client || ""}
							onChange={(e) =>
								mutateDocument(
									(p) =>
										p
											? { ...p, client: e.target.value }
											: undefined,
									{ revalidate: false },
								)
							}
							labelId="supplier-select-lable"
							label="Клієнт"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{clients?.items.map((client) => (
								<MenuItem
									key={client.id}
									value={client.id}
									className="text-start"
								>
									{client.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						label="Коментар"
						size="small"
						disabled={!enableEditing}
						value={document?.comment || ""}
						onChange={(e) =>
							mutateDocument(
								(p) =>
									p
										? { ...p, comment: e.target.value }
										: undefined,
								{ revalidate: false },
							)
						}
					/>
				</div>
				<div>
					<ProductSelectionToDocumentDialog
						type="sales"
						disabled={!enableEditing}
						addNewItem={(newItem) => {
							mutateDocument(
								(p) => {
									if (p) {
										return {
											...p,
											items: [...p.items, newItem],
										};
									}
								},
								{
									revalidate: false,
								},
							);
						}}
					/>
				</div>
			</div>
			{/*<TableContainer>*/}
				<MyTable
					columns={columns}
					data={document?.items}
					changeData={(newData) => {
						if (!document) {
							return;
						}
						mutateDocument(
							{ ...document, items: newData },
							{ revalidate: false },
						);
					}}
					buttons={{
						remove: {
							text: true,
						},
					}}
					disabled={!enableEditing}
				/>
			{/*</TableContainer>*/}
			{/*</div>*/}
		</main>
	);
}
