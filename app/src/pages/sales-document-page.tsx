import { useState, useMemo, ChangeEvent } from "react";

import Button from "@mui/material/Button";
import { useLocation, useParams } from "wouter";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import Table from "@mui/material/Table";
// import TableHead from "@mui/material/TableHead";
// import TableBody from "@mui/material/TableBody";
// import TableRow from "@mui/material/TableRow";
import { SalesDocument, SalesDocumentItem } from "../models/sales-document";
import useSWR from "swr";
import { pb } from "../utils/pb";
import { MyTable } from "../components/table";
import { createColumnHelper } from "@tanstack/react-table";
import { ProductSelectionToDocumentDialog } from "../components/product-selection-to-document-dialog";

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
			columnHelper.accessor("product.name", {
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
				navigate(`/sales-document/${newId}`);
			}
			return;
		}

		if (await SalesDocument.save(document.id, document)) {
			setEnableEditing(false);
		}
	}

	return (
		<main className="p-2">
			<title>{`Розхід ${"1"}`}</title>
			<h1 className="flex text-2xl pb-3">Розхід товарів </h1>
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
				/>
				{/*<Table>
					<TableHead></TableHead>
					<TableBody></TableBody>
				</Table>*/}
			</div>
		</main>
	);
}
