import { Item } from "@/entities/item";

export interface ItemByTagId {
  id: string;
  itemId: string;
  tagId: string;
  createdAt: string;
  item: Item;
}

export interface TagResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
