import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import useSWR from "swr";
import type {  ProductRecord } from "../../pocketbase-types";
import { Link } from "wouter";
import { pb } from "../utils/pb";

const defaultData: ProductRecord[] = [
	{
        id: "111",
        search_code: ""
    },
];

const columnHelper = createColumnHelper<ProductRecord>();

const columns = [
	columnHelper.accessor("id", {
		header: () => "id",
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor("article", {
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor("name", {
		cell: (info) => (
			<Link href={`/product/${info.row.getValue("id")}`}>
				{" "}
				{info.getValue()}
			</Link>
		),
	}),
	// columnHelper.accessor("supplier_id")
];

export function TestPage() {
	const { data } = useSWR("data", () =>
		pb.collection("product").getList(1, 200, {
			expand: "brand,supplier",
		}),
	);

	const table = useReactTable({
		data: data?.items || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<main>
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext(),
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot>
					{table.getFooterGroups().map((footerGroup) => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.footer,
												header.getContext(),
											)}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
		</main>
	);
}
