import ItemCard from "@/components/items/components/item-card";
import { Item } from "@/entities/item";
import { Box } from "@mui/material";
import React from "react";
interface Props {
  items: Item[];
}
export default function Items({ items }: Props) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: "15px", mt: "20px" }}
    >
      {items.map((item) => (
        <ItemCard
          authorName={item.author.firstName}
          key={item.id}
          id={item.id}
          collectionName={item.collection.name}
          date={item.updatedAt}
          title={item.name}
        />
      ))}
    </Box>
  );
}
