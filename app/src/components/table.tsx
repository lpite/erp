import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import {
  useEffect,
  useState,
  type KeyboardEvent as KeyboardEventReact,
} from "react";

type TableButton =
  | {
      icon: true;
      text?: false;
    }
  | {
      icon?: false;
      text: true;
    }
  | {
      icon: true;
      text: true;
    };

interface TableButtons {
  add?: TableButton & { event: () => void };
  remove?: TableButton;
}

interface TableProps {
  data?: any[];
  changeData?: (data: any[]) => void;
  columns: ColumnDef<any, any>[];
  buttons?: TableButtons;
  onRowClick?: () => any;
  onRowDoubleClick?: (row: Row<any>) => any;
}

const emptyArray: any[] = [];

export function MyTable({
  data,
  changeData,
  columns,
  buttons,
  onRowClick: onRowClickHandler,
  onRowDoubleClick: onRowDoubleClickHander,
}: TableProps) {
  const table = useReactTable({
    data: data ?? emptyArray,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [editCell, setEditCell] = useState(false);

  function onRowClick(row: Row<any>) {
    setSelectedRow(row.id);
    if (onRowClickHandler) {
      onRowClickHandler();
    }
  }

  function onRowDoubleClick(row: Row<any>) {
    if (onRowDoubleClickHander) {
      onRowDoubleClickHander(row);
    }
  }

  function onCellClick(cell: Cell<any, any>) {
    setSelectedCell(cell.column.id);
  }

  useEffect(() => {
    function keyBoardListener(e: KeyboardEvent) {
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;

      const rows = table.getRowModel().rows;
      const index = rows.findIndex((r) => r.id === selectedRow);

      if (index === -1) return;

      if (e.key === "ArrowDown" && index < rows.length - 1) {
        setSelectedRow(rows[index + 1].id);
        setEditCell(false);
      }

      if (e.key === "ArrowUp" && index > 0) {
        setSelectedRow(rows[index - 1].id);
        setEditCell(false);
      }

      if (e.key === "ArrowLeft") {
        if (!selectedCell) {
          return;
        }
        const columnIds = table.getAllColumns().map((el) => el.id);
        const currentColumnIndex = columnIds.indexOf(selectedCell);
        if (currentColumnIndex === 0) {
          return;
        }

        setEditCell(false);
        setSelectedCell(columnIds[currentColumnIndex - 1]);
      }
      if (e.key === "ArrowRight") {
        if (!selectedCell) {
          return;
        }
        const columnIds = table.getAllColumns().map((el) => el.id);
        const currentColumnIndex = columnIds.indexOf(selectedCell);
        if (currentColumnIndex + 1 === columnIds.length) {
          return;
        }

        setEditCell(false);
        setSelectedCell(columnIds[currentColumnIndex + 1]);
      }
      if (e.key === "Enter") {
        if (!selectedCell) {
          return;
        }
        const columnIds = table.getVisibleFlatColumns().map((el) => el.id);
        const currentColumnIndex = columnIds.indexOf(selectedCell);
        const column = table.getVisibleFlatColumns()[currentColumnIndex];
        if (column.columnDef.meta?.editable) {
          setEditCell(true);
        }
      }
    }

    function onCopy(e: ClipboardEvent) {
      console.log(e);
    }

    window.addEventListener("keydown", keyBoardListener);
    window.addEventListener("copy", onCopy);
    return () => {
      window.removeEventListener("keydown", keyBoardListener);
      window.removeEventListener("copy", onCopy);
    };
  }, [selectedRow, selectedCell]);

  function onInputKeyDown(e: KeyboardEventReact<HTMLInputElement>) {
    if (e.key === "Enter") {
      // e.currentTarget.blur();
      if (data) {
        const d = data[Number(selectedRow)];
        if (d) {
          console.log(d);
          console.log(selectedCell);
        }
      }

      setEditCell(false);
    }
  }

  return (
    <div className="pt-4">
      {buttons ? (
        <div className="pb-2">
          {buttons?.add?.icon || buttons?.add?.text ? (
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={buttons.add.event}
            >
              {buttons.add.icon ? <Icon>add</Icon> : null}
              {buttons.add.text ? "Додати" : null}
            </Button>
          ) : null}
          {buttons?.remove?.icon || buttons?.remove?.text ? (
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                if (!changeData) {
                  return;
                }
                changeData(
                  data?.filter((_, i) => i !== Number(selectedRow)) || [],
                );
              }}
            >
              {buttons.remove.icon ? <Icon>cross</Icon> : null}
              {buttons.remove.text ? "remove" : null}
            </Button>
          ) : null}
        </div>
      ) : null}

      <Table
        style={{
          borderCollapse: "collapse",
          border: "1px solid #ccc",
        }}
        size="small"
        stickyHeader={true}
      >
        <TableHead>
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
          {table.getRowModel().rows.map((row) => (
            <TableRow
              style={{
                background: selectedRow === row.id ? "#e6f7ff" : "transparent",
              }}
              onClick={() => onRowClick(row)}
              onDoubleClick={() => onRowDoubleClick(row)}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => {
                const onChangeHander = cell.column.columnDef.meta?.onChange;

                return (
                  <TableCell
                    key={cell.id}
                    style={{
                      background:
                        selectedCell === cell.column.id &&
                        row.id === selectedRow
                          ? "#8cceed"
                          : "transparent",
                    }}
                    onClick={() => onCellClick(cell)}
                    className="text-start border-x border-gray-300 p-0 select-none"
                  >
                    {selectedCell === cell.column.id &&
                    row.id === selectedRow &&
                    editCell ? (
                      <input
                        onChange={(e) => onChangeHander(row.id, e.target.value)}
                        autoFocus
                        onKeyDown={onInputKeyDown}
                        value={cell.getValue()}
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
