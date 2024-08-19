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

interface Props {
  setKey: React.Dispatch<SetStateAction<FilterKeys>>;
  key: FilterKeys;
}
export default function FilterOptionsMenu({ key, setKey }: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    setKey(event.target.value as FilterKeys);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">filter by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={key}
          onChange={handleChange}
        >
          <MenuItem value={"items"}>Items</MenuItem>
          <MenuItem value={"updatedAt"}>Date</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
