import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";

const TableComponent = ({ tableData = [], columns = [] }) => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
    },
  });

  const {
    pageIndex,
    pageSize,
  } = table.getState().pagination;

  const totalRows = table.getRowCount();
  const from = pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="rounded-md border bg-white mt-10">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => {
                if (header.isPlaceholder) return null;

                const canSort = header.column.getCanSort();
                const sortState = header.column.getIsSorted();

                return (
                  <TableHead
                    key={header.id}
                    className={`select-none ${canSort ? "cursor-pointer" : ""}`}
                    onClick={
                      canSort
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}

                      {canSort && (
                        <>
                          {sortState === "asc" && <ArrowUp size={14} />}
                          {sortState === "desc" && <ArrowDown size={14} />}
                          {!sortState && (
                            <ChevronsUpDown size={14} className="opacity-40" />
                          )}
                        </>
                      )}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell ??
                        cell.column.columnDef.accessorKey,
                      cell.getContext(),
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-6">
                No datas found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-4 py-4 text-sm">
        <div className="font-medium text-[#231F1F]">
          Showing {from} to{" "}
          <span className="px-3 py-1 border-2 rounded-lg mx-1">{to}</span>
          of {totalRows} Items
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={table.previousPage}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 rounded border disabled:opacity-40 cursor-pointer"
          >
            ‹
          </button>

          {Array.from({ length: table.getPageCount() }).map((_, i) => {
            const isActive = pageIndex === i;

            if (i > 2 && i < table.getPageCount() - 1) {
              if (i === 3) return <span key={i}>…</span>;
              return null;
            }

            return (
              <button
                key={i}
                onClick={() => table.setPageIndex(i)}
                className={`w-8 h-8 rounded-full border text-sm cursor-pointer
                  ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }
                `}
              >
                {i + 1}
              </button>
            );
          })}

          <button
            onClick={table.nextPage}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 rounded border disabled:opacity-40 cursor-pointer"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
