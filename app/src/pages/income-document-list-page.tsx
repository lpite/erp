import { createColumnHelper } from "@tanstack/react-table";
import useSWR from "swr";
import {
  Collections,
  IncomeDocumentResponse,
  PartnerResponse,
} from "../../pocketbase-types";
import { Link } from "wouter";
import { pb } from "../utils/pb";
import { NavBar } from "../components/nav-bar";
import { MyTable } from "../components/table";

type ExpandedIncomeDocument = IncomeDocumentResponse<{
  supplier: PartnerResponse;
}>;

const columnHelper = createColumnHelper<ExpandedIncomeDocument>();

const columns = [
  columnHelper.accessor("id", {
    header: () => "id",
    cell: (info) => (
      <Link href={`/income-document/${info.getValue()}`}>
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("posted", {
    cell: (info) => (info.getValue() ? "yes" : "no"),
  }),
  columnHelper.accessor("date", {
    cell: (info) => new Date(info.getValue()).toLocaleString(),
  }),
  columnHelper.accessor("expand.supplier.name", {
    header: "supplier",
    cell: (info) => info.getValue(),
  }),
];

export function IncomeDocumentListPage() {
  const { data: documents } = useSWR("income-document-list", () =>
    pb
      .collection(Collections.IncomeDocument)
      .getList<ExpandedIncomeDocument>(0, 200, {
        expand: "supplier",
      }),
  );

  return (
    <main className="p-4">
      <NavBar />
      <div>
        <Link href="/income-document/new">Новий</Link>
      </div>
      <MyTable columns={columns} data={documents?.items} />
    </main>
  );
}
