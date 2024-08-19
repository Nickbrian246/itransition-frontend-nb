import { CustomInputLabel } from "@/components/custom-components";
import { Box, TextField, Button } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { createTag } from "./services";
import { Tag } from "@/entities/tags";

interface Props {
  AddNewTag: (tag: Tag) => void;
}
export default function AddNewTag({ AddNewTag }: Props) {
  const [newTag, setNewTag] = useState<string>("");

  const handleAddNewTag = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleCreateTag = () => {
    createTag(newTag)
      .then((res) => AddNewTag(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Box>
        <CustomInputLabel htmlFor="addNewTag" variant="standard">
          Add new Tag
        </CustomInputLabel>
        <TextField
          id="addNewTag"
          onChange={handleAddNewTag}
          placeholder="add new tag"
        />
      </Box>
      <Button
        disabled={newTag.length < 1}
        onClick={handleCreateTag}
        variant="contained"
      >
        Add tag
      </Button>
    </Box>
  );
}
