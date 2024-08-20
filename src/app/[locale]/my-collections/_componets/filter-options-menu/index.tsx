"use client";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React, { SetStateAction } from "react";
import { FilterKeys } from "../../_interfaces";
import { useTranslation } from "react-i18next";

interface Props {
  setKey: React.Dispatch<SetStateAction<FilterKeys>>;
  key: FilterKeys;
}
export default function FilterOptionsMenu({ key, setKey }: Props) {
  const { t } = useTranslation();
  const handleChange = (event: SelectChangeEvent) => {
    setKey(event.target.value as FilterKeys);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {t("commons:filterBy")}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={key}
          onChange={handleChange}
        >
          <MenuItem value={"items"}>Items</MenuItem>
          <MenuItem value={"updatedAt"}>{t("commons:date")}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
