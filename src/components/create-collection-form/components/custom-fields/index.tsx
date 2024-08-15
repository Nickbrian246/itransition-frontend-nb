"use client";
import { CustomField, TypeCustomField } from "@/entities/custom-field";
import {
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { v4 } from "uuid";

interface Custom extends Omit<CustomField, "collectionId"> {
  id: string;
}

export default function CustomFields() {
  const [type, setType] = useState<TypeCustomField>("STRING");
  const { t } = useTranslation();
  const [customFields, setCustomFields] = useState<Custom[]>([]);
  const [name, setName] = useState<string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as TypeCustomField);
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAddButton = () => {
    setCustomFields((prev) => {
      return prev.concat({ name: name, type: type, id: v4() });
    });
    setName("");
  };

  const handleDeleteField = (id: string) => {
    setCustomFields((prev) => {
      const data = prev.filter((field) => field.id !== id);
      return data;
    });
  };
  return (
    <>
      <Typography variant="caption">
        {t("commons:addCustomFieldsToYourItems")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row", flexWrap: "wrap" },
          gap: "15px",
        }}
      >
        <TextField
          value={name}
          onChange={handleName}
          placeholder={t("commons:name")}
        />
        <FormControl sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">
            {t("commons:type")}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={handleChange}
          >
            <MenuItem value="INTEGER">{t("commons:INTEGER")}</MenuItem>
            <MenuItem value="DATE">{t("commons:DATE")}</MenuItem>
            <MenuItem value="BOOLEAN">{t("commons:BOOLEAN")}</MenuItem>
            <MenuItem value="STRING">{t("commons:STRING")}</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={handleAddButton}
          disabled={name.length === 0}
          variant="contained"
        >
          {t("commons:add")}
        </Button>
        <Box
          sx={{
            maxHeight: "300px",
            overflow: "auto",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: { xs: "column", md: "row" },
            gap: "10px",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {customFields.length > 0 &&
            customFields.map((field) => (
              <Card
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  padding: "10px",
                }}
                key={field.id}
              >
                <Typography variant="caption">
                  {t("commons:name")}:{field.name}
                </Typography>
                <Typography variant="caption">
                  {t("commons:type")}: {t(`commons:${field.type}`)}
                </Typography>
                <IconButton
                  onClick={() => {
                    handleDeleteField(field.id);
                  }}
                >
                  <DeleteOutlineOutlinedIcon sx={{ color: "red" }} />
                </IconButton>
              </Card>
            ))}
        </Box>
      </Box>
    </>
  );
}
