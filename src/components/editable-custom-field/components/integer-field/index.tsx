import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { Box, IconButton, styled, TextField, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { ChangeEvent, useEffect, useState } from "react";
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
export default function IntegerField({
  isEditable,
  name,
  value,
  id,
  gatherData,
  handleDeleteItem,
}: Props) {
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [numericField, setNumericField] = useState<EditCustomFields>({
    id: v4(),
    name,
    value: "",
    type: "INTEGER",
  });

  useEffect(() => {
    if (!isDirty) return;
    const timer = setTimeout(() => {
      gatherData(numericField);
    }, 900);
    return () => clearTimeout(timer);
  }, [numericField, isDirty]);

  useEffect(() => {
    if (value && id)
      setNumericField((prev) => {
        return { ...prev, value, id };
      });
  }, [value, id]);
  const handleTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNumericField((prev) => {
      return { ...prev, value: event.target.value };
    });
  };
  const handleFocus = () => {
    setIsDirty(true);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
      <Typography variant="caption">{name}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          onFocus={handleFocus}
          disabled={!isEditable}
          onChange={handleTextArea}
          aria-label="empty textarea"
          placeholder="Write here"
          value={numericField.value}
          type="number"
        />
        {isEditable && (
          <Box>
            <CustomDeleteIconButton
              handleClick={() => {
                handleDeleteItem(numericField);
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
