import { createColumnHelper } from "@tanstack/react-table";
import useSWR from "swr";
import {
  BrandResponse,
  Collections,
  ProductResponse,
  SupplierResponse,
} from "../../pocketbase-types";
import { Link } from "wouter";
import { pb } from "../utils/pb";

import Button from "@mui/material/Button";
import { NavBar } from "../components/nav-bar";
import { FormEvent, useState } from "react";
import { MyTable } from "../components/table";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";

type ExpandedProduct = ProductResponse<{
  brand: BrandResponse;
  supplier: SupplierResponse;
}>;

const columnHelper = createColumnHelper<ExpandedProduct>();

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
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("expand.brand.name", {
    header: () => "brand",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("expand.supplier.name", {
    header: () => "supplier",
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
];

export function ProductListPage() {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useSWR(["product-list", searchValue], () =>
    pb.collection(Collections.Product).getList<
      ProductResponse<{
        brand: BrandResponse;
        supplier: SupplierResponse;
      }>
    >(1, 200, {
      expand: "brand,supplier",
      filter: `name ~ '${searchValue}' || article ~ '${searchValue}'`,
    }),
  );

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const searchValue = new FormData(e.currentTarget).get("searchValue") || "";
    setSearchValue(searchValue);
  }

  return (
    <main className="p-4 h-full flex flex-col">
      <NavBar />
      <h1 className="text-3xl pb-2 pt-4">Список товарів</h1>
      <form onSubmit={onFormSubmit} className="flex gap-2">
        <TextField
          placeholder="..."
          variant="outlined"
          size="small"
          name="searchValue"
        />
        <Button type="submit" size="medium" variant="contained">
          Пошук
        </Button>
      </form>
      <TableContainer className={`h-full ${isLoading && "opacity-50"}`}>
        <MyTable columns={columns} data={data?.items} />
      </TableContainer>
    </main>
  );
}
