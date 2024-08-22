import React from "react";
import ItemCard from "../item-card";
import { Item } from "@/entities/item";
import { Locale } from "@/types/types";

interface Props {
  items: Item[];
  locale: Locale;
}

export default function Items({ items, locale }: Props) {
  return (
    <>
      {items.map((item) => (
        <ItemCard
          editedBy={item.editedBy}
          isEdited={item.isEdited}
          locale={locale}
          authorName={item.author.firstName}
          collectionName={item.collection.name}
          date={item.updatedAt}
          title={item.name}
          key={item.id}
          id={item.id}
        />
      ))}
    </>
  );
}
