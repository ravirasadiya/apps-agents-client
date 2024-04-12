import { GridColDef } from "@mui/x-data-grid";

// Agents Report columns
export const agentReportsGrid: GridColDef[] = [
  { field: "report_date", headerName: "Date", width: 500 },
  { field: "description", headerName: "Description", width: 500 },
  {
    field: "created_at",
    headerName: "Created at",
    width: 500,
  },
];
