"use client";
import TagCard from "@/components/tag-card";
import TagsSelector from "@/components/tag-selector";
import { Tag } from "@/entities/tags";
import { Box } from "@mui/material";
import React, { SetStateAction } from "react";
interface Props {
  isEditable: boolean;
  tags: Tag[];
  setTagsSelected: React.Dispatch<SetStateAction<Tag[]>>;
  tagsSelected: Tag[];
}
export default function Tags({
  isEditable,
  tags,
  setTagsSelected,
  tagsSelected,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        mt: "10px",
        flexWrap: "wrap",
        minWidth: "200px",
      }}
    >
      {isEditable ? (
        <TagsSelector
          setTagsSelected={setTagsSelected}
          tagsSelected={tagsSelected}
        />
      ) : (
        tags.map((t) => <TagCard title={t.name} key={t.id} id={t.id} />)
      )}
    </Box>
  );
}
