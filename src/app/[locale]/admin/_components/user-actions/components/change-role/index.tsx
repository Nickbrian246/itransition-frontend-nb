"use client";
import { Role } from "@/entities/user";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { changeRolesByIds } from "./services";
import { setGlobalWarning } from "@/store/slices/global-warning/slice";
import { ErrorResponse } from "@/types/api/api-error.interface";
import { errorsRedirectToHome } from "@/utils/errors-actions/errors";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/use-redux/redux";
interface Props {
  usersSelected: any[];
  updateUsers: () => void;
}
export default function ChangeRoles({ usersSelected, updateUsers }: Props) {
  const [role, setRole] = useState<Role>("USER");
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
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
        dispatch(
          setGlobalWarning({
            message: "roles updated successfully",
            severity: "success",
          })
        );
      })
      .catch((err: ErrorResponse<string>) => {
        dispatch(
          setGlobalWarning({
            message: t(`errors:${err.message}`),
            severity: "error",
          })
        );
        if (
          errorsRedirectToHome[err.message as keyof typeof errorsRedirectToHome]
        ) {
          router.replace("/");
        }
      });
  };

  return (
    <Box
      sx={{ width: 320, display: "flex", gap: "10px", alignItems: "center" }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {t("commons:selectRole")}
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
        sx={{ padding: "5px", width: "200px", height: "40px" }}
        variant="contained"
        onClick={handleChangeRole}
      >
        {t("commons:editRole")}
      </Button>
    </Box>
  );
}
