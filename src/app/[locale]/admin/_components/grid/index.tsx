"use client";
import { User } from "@/entities/user";
import { Paper } from "@mui/material";
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridRowSelectionModel,
} from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "firstName", headerName: "Name", width: 150 },
  { field: "role", headerName: "Role", width: 150 },
  { field: "email", headerName: "E-Mail", width: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
];

interface Props {
  rows: User[];
  isLoading: boolean;
  selectedRows: any[];
  handleSelectionChange: (
    rowSelectionModel: GridRowSelectionModel,
    details: GridCallbackDetails
  ) => void;
}
export default function UsersTable({
  rows,
  isLoading,
  handleSelectionChange,
  selectedRows,
}: Props) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Paper>
        <DataGrid
          onRowSelectionModelChange={handleSelectionChange}
          rowSelectionModel={selectedRows}
          loading={isLoading}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Paper>
    </div>
  );
}
