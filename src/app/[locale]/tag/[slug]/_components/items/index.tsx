import ItemCard from "@/components/items/components/item-card";
import { Item } from "@/entities/item";
import { TagWithItems } from "@/entities/tags";
import { Typography } from "@mui/material";
import React from "react";
interface Props {
  tag: TagWithItems;
}
export default function ItemsCards({ tag }: Props) {
  return (
    <>
      <Typography variant="h6"> Tag: {tag?.name}</Typography>
      {tag?.items.map((item) => (
        <ItemCard
          authorName={item.author.firstName}
          collectionName={item.collection.name}
          date={item.updatedAt}
          id={item.id}
          title={item.name}
          key={item.id}
        />
      ))}
    </>
  );
}
