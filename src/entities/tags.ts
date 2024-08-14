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
