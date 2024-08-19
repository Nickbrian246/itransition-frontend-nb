import React, { ChangeEvent, useEffect, useState } from "react";

import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

import { EditCustomFields, SaveFieldsDataStatus } from "../..";
import { v4 } from "uuid";
interface Props {
  isEditable: Boolean;
  name: string;
  gatherData: (data: EditCustomFields) => void;
  fieldsStatus: SaveFieldsDataStatus;
}

export default function BooleanField({
  isEditable,
  fieldsStatus,
  gatherData,
  name,
}: Props) {
  const [checkBoxField, setCheckBoxField] = useState<EditCustomFields>({
    id: v4(),
    name,
    value: "false",
    type: "BOOLEAN",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      gatherData(checkBoxField);
    }, 900);
    return () => clearTimeout(timer);
  }, [checkBoxField]);

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);

    setCheckBoxField((prev) => ({
      ...prev,
      value: event.target.checked ? "true" : "false",
    }));
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="caption">{name}</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkBoxField.value === "true"}
              onChange={handleCheckBox}
              // disabled={!isEditable}
            />
          }
          label={name}
        />
      </FormGroup>
    </Box>
  );
}
