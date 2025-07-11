"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import CountdownTimer from "./countdown-timer";
import UploadButton from "./upload-button";

const timeForAssignment = 24 * 1 * 3600000; //1 day

export const columns = [
  {
    accessorKey: "assignment",
    header: () => <div className="text-left">Assignment</div>,
    cell: ({ row }: any) => (
      <div className="text-left">{row.getValue("assignment")}</div>
    ),
  },
  {
    accessorKey: "started_datetime",
    header: ({ column }: any) => (
      <Button
        variant="ghost"
        className="mx-auto flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Due Date <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: any) => (
      <div className="text-center">
        {new Date(
          row.getValue("started_datetime") + timeForAssignment
        ).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "countdown",
    header: ({ column }: any) => (
      <Button
        variant="ghost"
        className="mx-auto flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Pending Time <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: any) => {
      const finishedDate = row.getValue("started_datetime") + timeForAssignment;
      // Get the finished date (epoch timestamp)
      const pendingTime = Math.max(finishedDate - Date.now(), 0); // Calculate pending time (ensure no negative)

      return <CountdownTimer dueTime={pendingTime + Date.now()} />;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }: any) => (
      <div className="text-center">
        <Badge> {row.getValue("status")}</Badge>
      </div>
    ),
  },
  {
    accessorKey: "submitted",
    header: () => <div className="text-center">Submission</div>,
    cell: ({ row }: any) => {
      const assignmentId = row.original._id; // Assuming assignmentId is part of your row data
      return !row.getValue("submitted") ? (
        <UploadButton assignmentId={assignmentId} />
      ) : (
        <div className="text-center font-medium text-green-600">Submitted!</div>
      );
    },
  },
  {
    accessorKey: "your_marks",
    header: () => <div className="text-center">Your Marks</div>,
    cell: ({ row }: any) => {
      const marks = parseFloat(row.getValue("your_marks"));
      return <div className="text-center font-medium">{marks}</div>;
    },
  },
  {
    accessorKey: "pass_marks",
    header: () => <div className="text-right">Pass Marks</div>,
    cell: ({ row }: any) => {
      const marks = parseFloat(row.getValue("pass_marks"));
      return <div className="text-right font-medium">{marks}</div>;
    },
  },
];

export function DataTable({ assignments }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const data = assignments.map((assignment: any) => {
    return {
      _id: assignment._id,
      assignment: assignment.title,
      dueDate: assignment.dueDate,
      status: assignment.status,
      your_marks: assignment.your_marks,
      pass_marks: 50,
      submitted: assignment.submitted,
      started_datetime: assignment.started_datetime,
    };
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full bg-white rounded-md shadow-md p-5 mt-5">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Assignments..."
          value={
            (table.getColumn("assignment")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("assignment")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border h-[500px] max-h-[500px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
