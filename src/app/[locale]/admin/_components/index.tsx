"use client";
import React, { useEffect, useState } from "react";
import UsersTable from "./grid";
import UserActions from "./user-actions";
import { Box } from "@mui/material";
import { User } from "@/entities/user";
import { getUsers } from "../_services";
import { GridRowSelectionModel, GridCallbackDetails } from "@mui/x-data-grid";
import { useAppSelector } from "@/hooks/use-redux/redux";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [rows, setRows] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { role } = useAppSelector((state) => state.user.user);
  const router = useRouter();
  useEffect(() => {
    if (role !== "ADMIN") return router.replace("/");
    getAllUsers();
  }, [role]);

  const getAllUsers = () => {
    setIsLoading(true);
    setSelectedRows([]);
    getUsers()
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleSelectionChange = (
    rowSelectionModel: GridRowSelectionModel,
    details: GridCallbackDetails
  ) => {
    setSelectedRows(rowSelectionModel);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "10px",
      }}
    >
      <UserActions usersSelected={selectedRows} updateUsers={getAllUsers} />
      <UsersTable
        selectedRows={selectedRows}
        handleSelectionChange={handleSelectionChange}
        rows={rows}
        isLoading={isLoading}
      />
    </Box>
  );
}
