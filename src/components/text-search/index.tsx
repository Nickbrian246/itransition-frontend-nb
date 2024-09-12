"use client";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteValue,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getCoincidences } from "./services";
import { Item } from "@/entities/item";
import { useTranslation } from "react-i18next";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useRouter } from "next/navigation";
import { log } from "console";
export default function TextSearch() {
  const [coincidences, setCoincidences] = useState<Item[]>([]);
  const [text, setText] = useState<string>("");
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      getTextSearchCoincidences();
    }, 800);
    return () => clearTimeout(timer);
  }, [text]);

  const getTextSearchCoincidences = () => {
    getCoincidences(text)
      .then((res) => setCoincidences(res.data))
      .catch((err) => {
        // console.log(err)
      });
  };

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOptionSelected = (event: React.SyntheticEvent, value: Item) => {
    if (!value) return;
    //@ts-ignore
    const id = value["_id"]["$oid"] as string;
    router.push(`/item/${id}`);
  };
  return (
    <Autocomplete
      sx={{
        width: { xs: "100%", md: "500px" },
        ".MuiAutocomplete-inputRoot": { height: "35px" },
      }}
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={coincidences}
      noOptionsText={t("commons:noResults")}
      filterOptions={(x) => x}
      //@ts-ignore
      getOptionLabel={(option) => (option.name ? option.name : "")}
      //@ts-ignore
      onChange={(event, value) => handleOptionSelected(event, value)}
      renderOption={(props, option) => {
        if (option.name) {
          return <li {...props}>{option.name}</li>;
        } else {
          return <li {...props}>{t("commons:noResults")}</li>;
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={handleText}
          placeholder={t("commons:search")}
          InputProps={{
            ...params.InputProps,
            type: "search",
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
