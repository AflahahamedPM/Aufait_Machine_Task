import React from "react";
import StatusBackground from "./StatusBackground";
import TypeDot from "./TypeDot";

const capitalize = (str = "") => str.charAt(0).toUpperCase() + str.slice(1);

export const riskColumns = [
  {
    accessorKey: "recordNo",
    header: "Record No",
    enableSorting: true,
  },
  {
    accessorKey: "description",
    header: "Risk Activity Description",
    enableSorting: true,
    cell: ({ getValue }) => capitalize(getValue()),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <StatusBackground status={getValue()} />,
    enableSorting: true,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ getValue }) => <TypeDot type={getValue()} />,
    enableSorting: true,
  },
  {
    accessorKey: "phase",
    header: "Phase",
    enableSorting: true,
    cell: ({ getValue }) => capitalize(getValue()),
  },
  {
    accessorKey: "department",
    header: "Department",
    enableSorting: true,
    cell: ({ getValue }) => capitalize(getValue()),
  },
  {
    accessorKey: "impact",
    header: "Impact",
    enableSorting: true,
  },
  {
    accessorKey: "likelihood",
    header: "Likelihood",
    enableSorting: true,
  },
];
