import useSWR from "swr";
import { pb } from "../utils/pb";
import { useParams, useLocation } from "wouter";
import { MouseEvent, useMemo, useRef, useState } from "react";
import EntitySelect from "../components/entity-select";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { Collections, ProductResponse } from "../../pocketbase-types";

import {
  Cell,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { ProductSelectionToDocumentDialog } from "../components/product-selection-to-document-dialog";
import { IncomeDocument, IncomeDocumentItem } from "../models/income-document";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Icon from "@mui/material/Icon";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";

export type DocumentProduct = {
  id: string;
  product: ProductResponse;
  quantity: number;
};

const columnHelper = createColumnHelper<IncomeDocumentItem>();

// хаахаххахахахххахахахха боже чому чому ччому чому чому цей світ такий цікавий.
const emptyArray: any[] = [];

export function IncomeDocumentPage() {
  const { id } = useParams();
  const [_, navigate] = useLocation();

  const [enableEditing, setEnableEditing] = useState(
    id === "new" ? true : false,
  );

  const { data: document, mutate: mutateDocument } = useSWR(
    ["income-document", id],
    () => IncomeDocument.load(id as string),
    {
      revalidateIfStale: !enableEditing,
      revalidateOnFocus: !enableEditing,
    },
  );

  const { data: suppliers } = useSWR("partners", () =>
    pb.collection("partner").getList(),
  );

  async function saveDocument() {
    if (!document) {
      return;
    }
    if (!document.id.length) {
      const newId = await IncomeDocument.create(document);
      if (newId) {
        navigate(`/income-document/${newId}`);
      }
      return;
    }

    if (await IncomeDocument.save(document.id, document)) {
      setEnableEditing(false);
    }
  }

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: () => "id",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("product.article", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("product.name", {
        cell: (info) => (
          <EntitySelect
            table={Collections.Product}
            id={info.row.original.product?.id}
            disabled={
              !enableEditing ||
              !selectedRows.includes(info.row.original.id) ||
              selectedRows.length > 1
            }
            onChange={(el) =>
              changeRow(info.row.index, {
                product: el,
              })
            }
          />
        ),
      }),
      columnHelper.accessor("quantity", {
        header: () => "quantity",
        cell: (info) => (
          <EditableCell
            onChange={(value) =>
              changeRow(info.row.index, {
                quantity: parseFloat(value),
              })
            }
            value={info.getValue()}
            disabled={
              !enableEditing ||
              !selectedRows.includes(info.row.original.id) ||
              selectedRows.length > 1
            }
          />
        ),
      }),
      columnHelper.accessor("price", {
        cell: (info) => (
          <EditableCell
            onChange={(value) =>
              changeRow(info.row.index, {
                price: Number(value),
              })
            }
            value={info.getValue()}
            disabled={
              !enableEditing ||
              !selectedRows.includes(info.row.original.id) ||
              selectedRows.length > 1
            }
          />
        ),
      }),
    ],
    [selectedRows, enableEditing],
  );
  const table = useReactTable({
    data: document?.items ?? emptyArray,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDeleteSelected = () => {
    const remaining = document?.items?.filter(
      (r) => !selectedRows.includes(r.id),
    );
    if (!remaining) {
      return;
    }
    mutateDocument(
      (p) => {
        if (p) {
          return { ...p, items: remaining };
        }
      },
      {
        revalidate: false,
      },
    );
    // setSelectedRows(null);
  };

  function selectRow(e: MouseEvent, index: number) {
    const item = document?.items[index];
    if (!item) {
      return;
    }
    if (!e.shiftKey) {
      setSelectedRows([item.id]);
      return;
    }

    const checked = selectedRows.indexOf(item.id) !== -1;
    if (!checked) {
      setSelectedRows((p) => [...p, item.id]);
    } else {
      setSelectedRows((p) => p.filter((el) => el !== item.id));
    }
  }

  const handleSwapRows = () => {
    // const selectedIds = Object.keys(selectedRows).map(Number);
    // if (selectedIds.length !== 2) {
    // 	alert("Select exactly two rows to swap.");
    // 	return;
    // }
    // const [a, b] = selectedIds;
    // const newData = [...data];
    // const i1 = newData.findIndex((r) => r.id === a);
    // const i2 = newData.findIndex((r) => r.id === b);
    // [newData[i1], newData[i2]] = [newData[i2], newData[i1]];
    // setData(newData);
  };

  const handleSelectAll = () => {
    setSelectedRows(document?.items?.map((el) => el.id) || []);
  };

  const handleClearSelection = () => setSelectedRows([]);

  function addNewRow(item: IncomeDocumentItem) {
    mutateDocument(
      (prev) => {
        if (prev) {
          return { ...prev, items: [...prev.items, item] };
        }
      },
      {
        revalidate: false,
      },
    );
  }

  function changeRow(
    rowIndex: number,
    updatedRow: Partial<IncomeDocumentItem>,
  ) {
    mutateDocument(
      (prev) => {
        if (prev) {
          return {
            ...prev,
            items: prev.items.map((item, i) => {
              if (i === rowIndex) {
                return { ...item, ...updatedRow };
              }
              return item;
            }),
          };
        }
      },
      {
        revalidate: false,
      },
    );
  }

  return (
    <main className="p-2">
      <title>{`Надходження ${document?.id}`}</title>

      <h1 className="flex text-2xl pb-3">Надходження товарів </h1>
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
                const newId = await IncomeDocument.create(document);
                if (newId) {
                  navigate(`/income-document/${newId}`);
                }
                return;
              }

              if (
                await IncomeDocument.save(document.id, {
                  ...document,
                  posted: true,
                })
              ) {
                navigate("/list/income-document");
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

              IncomeDocument.save(document.id, newDocument);
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
                  if (p) {
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
            <InputLabel id="supplier-select-lable">Постачальник</InputLabel>
            <Select
              className="min-w-42 text-start"
              disabled={!enableEditing}
              value={document?.supplier || ""}
              onChange={(e) =>
                mutateDocument(
                  (p) => (p ? { ...p, supplier: e.target.value } : undefined),
                  { revalidate: false },
                )
              }
              labelId="supplier-select-lable"
              label="Постачальник"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {suppliers?.items.map((supplier) => (
                <MenuItem
                  key={supplier.id}
                  value={supplier.id}
                  className="text-start"
                >
                  {supplier.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="p-3">
        <div className="flex gap-2 pb-2">
          <Button
            variant="contained"
            color="success"
            size="small"
            disabled={!enableEditing}
            onClick={() =>
              addNewRow({
                id: Math.random().toString(),
                price: 0,
                quantity: 0,
                product: null,
                isNew: true,
              })
            }
          >
            <Icon>add</Icon>
            Додати
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            disabled={!enableEditing}
            onClick={handleDeleteSelected}
          >
            <Icon>clear</Icon>
            Видалити
          </Button>
          <ProductSelectionToDocumentDialog
            type="income"
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

        <Table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            border: "1px solid #ccc",
          }}
          size="small"
          stickyHeader={true}
        >
          <TableHead style={{ background: "#f4f4f4" }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    className="text-start border-x border-gray-300"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row, i) => (
              <TableRow
                style={{
                  background: selectedRows.includes(row.original.id)
                    ? "#e6f7ff"
                    : "transparent",
                }}
                onClick={(e) => {
                  if (enableEditing) {
                    selectRow(e, i);
                  }
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="text-start border-x border-gray-300 p-0 select-none"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

interface TableRowProps {
  row: Row<IncomeDocumentItem>;
  cells: Cell<IncomeDocumentItem, unknown>[];
  selectedRows: string[];
}

function MyTableRow({ row, cells, selectedRows }: TableRowProps) {
  return (
    <TableRow
      style={{
        background: selectedRows.includes(row.original.id)
          ? "#e6f7ff"
          : "transparent",
      }}
    >
      {cells.map((cell) => (
        <TableCell
          key={cell.id}
          className="text-start border-x border-gray-300 p-0 select-none"
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

interface EditableCellProps {
  value: string | number;
  onChange: (v: string) => void;
  disabled: boolean;
}

function EditableCell({ value, onChange, disabled }: EditableCellProps) {
  // const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  // 	if (editing) {
  // 		inputRef.current?.focus();
  // 	}
  // }, [editing]);

  function onClick(e: MouseEvent) {
    e.stopPropagation();
  }

  function onDoubleClick(e: MouseEvent) {
    e.stopPropagation();
    // setEditing(true);
  }

  return (
    <div
      onDoubleClick={onDoubleClick}
      className={`${typeof value === "number" ? "text-end" : "text-start"} px-3`}
    >
      {!disabled ? (
        <input
          className="w-12 text-end p-0 m-0 outline border-none appearance-none"
          value={value}
          ref={inputRef}
          onClick={onClick}
          // onBlur={() => setEditing(false)}
          type={typeof value === "number" ? "number" : "text"}
          onChange={(ev) => onChange(ev.target.value)}
        />
      ) : (
        <div className="w-12 inline-block">{value}</div>
      )}
    </div>
  );
}
