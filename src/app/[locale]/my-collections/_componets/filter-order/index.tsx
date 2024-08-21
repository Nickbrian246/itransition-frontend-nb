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
import { useTranslation } from "react-i18next";

interface Props {
  filterOrder: FilterOrderInterface;
  setFilterOrder: Dispatch<SetStateAction<FilterOrderInterface>>;
}
export default function FilterOrder({ filterOrder, setFilterOrder }: Props) {
  const { t } = useTranslation();
  const handleChange = (event: SelectChangeEvent) => {
    setFilterOrder(event.target.value as FilterOrderInterface);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {t("commons:orderBy")}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterOrder}
          onChange={handleChange}
        >
          <MenuItem value={"ASC"}>{t("commons:ascending")}</MenuItem>
          <MenuItem value={"DES"}>{t("commons:descending")}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
