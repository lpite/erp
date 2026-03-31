import { Link } from "wouter";
import { NavBar } from "../components/nav-bar";
import { createColumnHelper } from "@tanstack/react-table";
import {
  PartnerResponse,
  Collections,
  SalesDocumentResponse,
} from "../../pocketbase-types";
import { MyTable } from "../components/table";
import useSWR from "swr";
import { pb } from "../utils/pb";

type ExpandedIncomeDocument = SalesDocumentResponse<{
  client: PartnerResponse;
}>;

const columnHelper = createColumnHelper<ExpandedIncomeDocument>();

const columns = [
  columnHelper.accessor("id", {
    header: () => "id",
    cell: (info) => (
      <Link href={`/sales-document/${info.getValue()}`}>{info.getValue()}</Link>
    ),
  }),
  columnHelper.accessor("posted", {
    cell: (info) => (info.getValue() ? "yes" : "no"),
  }),
  columnHelper.accessor("date", {
    cell: (info) => new Date(info.getValue()).toLocaleString(),
  }),
  columnHelper.accessor("expand.client.name", {
    header: "client",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("comment", {
    cell: (info) => info.getValue(),
  }),
];

export function SalesDocumentListPage() {
  const { data: documents } = useSWR("sales-docuemnt-list", () =>
    pb.collection(Collections.SalesDocument).getList(0, 100, {
      expand: "client",
    }),
  );
  return (
    <main className="p-4">
      <NavBar />
      <div>
        <Link href="/sales-document/new">Новий</Link>
      </div>
      <MyTable columns={columns} data={documents?.items} />
    </main>
  );
}
