import ItemCard from "@/components/items/components/item-card";
import { Item } from "@/entities/item";
import { Locale } from "@/types/types";
import { Typography } from "@mui/material";
interface Props {
  tagName: string;
  items: Item[];
  locale: Locale;
}
export default function ItemsCards({ tagName, locale, items }: Props) {
  return (
    <>
      <Typography variant="h6"> Tag: {tagName}</Typography>
      {items.map((item) => (
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
