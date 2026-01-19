import { createColumnHelper } from "@tanstack/react-table";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import useSWR from "swr";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { pb } from "../utils/pb";
import {
	Collections,
	ProductRecord,
	ProductResponse,
} from "../../pocketbase-types";

const columnHelper = createColumnHelper<ProductResponse>();
// const columns = [
// 	columnHelper.accessor("id", {
// 		cell: (r) => r.getValue(),
// 	}),
// 	columnHelper.accessor("oem", {
// 		cell: (r) => r.getValue(),
// 	}),
// 	columnHelper.accessor("article", {
// 		cell: (r) => r.getValue(),
// 	}),
// 	columnHelper.accessor("name", {
// 		cell: (r) => r.getValue(),
// 	}),
// ];

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 70 },
	{ field: "firstName", headerName: "First name", width: 130 },
	{ field: "lastName", headerName: "Last name", width: 130 },
	{
		field: "1",
		headerName: "Age",
		type: "number",
	},
];

export function ProductSelectionDialog() {
	const { data } = useSWR("products", () =>
		pb.collection(Collections.Product).getList(),
	);

	// const table = useReactTable({
	// 	data: data?.items || [],
	// 	columns,
	// 	getCoreRowModel: getCoreRowModel(),
	// });

	return (
		<DataGrid
			rows={data?.items}
			columns={columns}
			// initialState={{ pagination: { paginationModel } }}
			pageSizeOptions={[5, 10]}
			checkboxSelection
			sx={{ border: 0 }}
		/>
	);
}
