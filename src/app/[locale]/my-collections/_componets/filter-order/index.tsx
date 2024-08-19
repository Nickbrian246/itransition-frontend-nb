"use client";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Dispatch, SetStateAction, useState } from "react";
import { FilterOrder as FilterOrderInterface } from "../../_interfaces";

interface Props {
  filterOrder: FilterOrderInterface;
  setFilterOrder: Dispatch<SetStateAction<FilterOrderInterface>>;
}
export default function FilterOrder({ filterOrder, setFilterOrder }: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    setFilterOrder(event.target.value as FilterOrderInterface);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Order By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterOrder}
          onChange={handleChange}
        >
          <MenuItem value={"ASC"}>Ascendente</MenuItem>
          <MenuItem value={"DES"}>Descendente</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
