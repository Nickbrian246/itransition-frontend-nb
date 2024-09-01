import { Item } from "@/entities/item";

export interface ItemByTagId {
  id: string;
  itemId: string;
  tagId: string;
  createdAt: string;
  item: Item;
}
