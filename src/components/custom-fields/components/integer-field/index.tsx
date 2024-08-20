import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { Box, styled, TextField, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 } from "uuid";
import { EditCustomFields } from "../..";
interface Props {
  isEditable: Boolean;
  name: string;
  gatherData: (data: EditCustomFields) => void;
}
const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);
export default function IntegerField({ isEditable, name, gatherData }: Props) {
  const [numericField, setNumericField] = useState<EditCustomFields>({
    id: v4(),
    name,
    value: "",
    type: "INTEGER",
  });
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      gatherData(numericField);
    }, 900);
    return () => clearTimeout(timer);
  }, [numericField]);

  const handleTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value);

    setNumericField((prev) => {
      return { ...prev, value: event.target.value };
    });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
      <Typography variant="caption">{name}</Typography>
      <TextField
        onChange={handleTextArea}
        aria-label="empty textarea"
        placeholder={t("commons:writeHere")}
        value={numericField.value}
        type="number"
      />
    </Box>
  );
}
