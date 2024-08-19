import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { Box, IconButton, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { styled } from "@mui/system";
import { ChangeEvent, useEffect, useState } from "react";
import { v4 } from "uuid";
import { EditCustomFields } from "../..";
import CustomDeleteIconButton from "@/components/custom-components/custom-delete-icon-button";
interface Props {
  isEditable: boolean;
  name: string;
  value: string;
  id: string;
  gatherData: (data: EditCustomFields) => void;
  handleDeleteItem: (fieldData: EditCustomFields) => void;
}
const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
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
export default function FieldString({
  isEditable,
  name,
  value,
  id,
  gatherData,
  handleDeleteItem,
}: Props) {
  const [text, setText] = useState<EditCustomFields>({
    id: v4(),
    name: name,
    value: "",
    type: "STRING",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      gatherData(text);
    }, 900);
    return () => clearTimeout(timer);
  }, [text]);

  useEffect(() => {
    if (value && id)
      setText((prev) => {
        return { ...prev, value: value, id: id };
      });
  }, [value, id]);
  const handleTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText((prev) => {
      return { ...prev, value: event.target.value };
    });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="caption">{name}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Textarea
          disabled={!isEditable}
          onChange={handleTextArea}
          aria-label="empty textarea"
          placeholder="Write here"
          value={text.value}
        />
        {isEditable && (
          <Box>
            <CustomDeleteIconButton
              handleClick={() => {
                handleDeleteItem(text);
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
