import React from "react";
import ItemCard from "../item-card";
import { Item } from "@/entities/item";

interface Props {
  items: Item[];
}
//TODO: FIND A WAY TO PASS LOCALE TO DATE FNS
export default function Items({ items }: Props) {
  return (
    <>
      {items.map((item) => (
        <ItemCard
          authorName={item.author.firstName}
          collectionName={item.collection.name}
          date={item.updatedAt}
          title={item.name}
          key={item.id}
        />
      ))}
    </>
  );
}