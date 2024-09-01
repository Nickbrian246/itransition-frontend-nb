import { Item } from "./item";

export interface Tag {
  id: string;
  name: string;
}

export interface TagWithItems {
  id: string;
  name: string;
  items: Item[];
}

export interface Tags {
  id: string;
  itemId: string;
  tagId: string;
  createdAt: string;
  tag: Tag;
}
