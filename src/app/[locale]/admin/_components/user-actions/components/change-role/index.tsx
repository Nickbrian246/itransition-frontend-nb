"use client";
import {
  SelectChangeEvent,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { changeRolesByIds } from "./services";
import { Role, User } from "@/entities/user";
interface Props {
  usersSelected: any[];
  updateUsers: () => void;
}
export default function ChangeRoles({ usersSelected, updateUsers }: Props) {
  const [role, setRole] = useState<Role>("USER");

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as Role);
  };

  const handleChangeRole = () => {
    changeRolesByIds({
      usersIds: usersSelected,
      role,
    })
      .then((res) => {
        updateUsers();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      sx={{ minWidth: 420, display: "flex", gap: "10px", alignItems: "center" }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          seleccione el rol{" "}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={role ?? "USER"}
          value={role ?? "USER"}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"USER"}>user</MenuItem>
          <MenuItem value={"ADMIN"}>admin</MenuItem>
        </Select>
      </FormControl>
      <Button
        disabled={usersSelected.length === 0}
        sx={{ padding: "5px", width: "100%", height: "40px" }}
        variant="contained"
        onClick={handleChangeRole}
      >
        Editar roles
      </Button>
    </Box>
  );
}
