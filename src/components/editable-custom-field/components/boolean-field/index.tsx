import { ChangeEvent, useEffect, useState } from "react";

import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
} from "@mui/material";

import { v4 } from "uuid";
import { EditCustomFields } from "../..";
import CustomDeleteIconButton from "@/components/custom-components/custom-delete-icon-button";
interface Props {
  isEditable: Boolean;
  name: string;
  value: string;
  id: string;
  gatherData: (data: EditCustomFields) => void;
  handleDeleteItem: (fieldData: EditCustomFields) => void;
}

export default function BooleanField({
  isEditable,
  value,
  id,
  gatherData,
  name,
  handleDeleteItem,
}: Props) {
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [checkBoxField, setCheckBoxField] = useState<EditCustomFields>({
    id: v4(),
    name,
    value: "false",
    type: "BOOLEAN",
  });

  useEffect(() => {
    if (!isDirty) return;
    const timer = setTimeout(() => {
      gatherData(checkBoxField);
    }, 900);
    return () => clearTimeout(timer);
  }, [checkBoxField]);

  useEffect(() => {
    if (value && id)
      setCheckBoxField((prev) => {
        return {
          ...prev,
          value: value === "true" ? "true" : "false",
          id,
        };
      });
  }, [value]);

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);

    setCheckBoxField((prev) => ({
      ...prev,
      value: event.target.checked ? "true" : "false",
    }));
  };

  const handleFocus = () => {
    setIsDirty(true);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="caption">{name}</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              onFocus={handleFocus}
              checked={checkBoxField.value === "true"}
              onChange={handleCheckBox}
              disabled={!isEditable}
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Typography>{name}</Typography>
              {isEditable && (
                <CustomDeleteIconButton
                  handleClick={() => {
                    handleDeleteItem(checkBoxField);
                  }}
                />
              )}
            </Box>
          }
        />
      </FormGroup>
    </Box>
  );
}
