import ItemCard from "@/components/items/components/item-card";
import { Item } from "@/entities/item";
import { TagWithItems } from "@/entities/tags";
import { Locale } from "@/types/types";
import { Typography } from "@mui/material";
import React from "react";
interface Props {
  tag: TagWithItems;
  locale: Locale;
}
export default function ItemsCards({ tag, locale }: Props) {
  return (
    <>
      <Typography variant="h6"> Tag: {tag?.name}</Typography>
      {tag?.items.map((item) => (
        <ItemCard
          editedBy={item.editedBy}
          isEdited={item.isEdited}
          authorName={item.author.firstName}
          collectionName={item.collection.name}
          date={item.updatedAt}
          id={item.id}
          title={item.name}
          key={item.id}
          locale={locale}
        />
      ))}
    </>
  );
}
