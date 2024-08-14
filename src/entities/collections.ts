import { Item } from "./item";

export interface Collections {
  name: string;
  description: string;
  category: string;
  imageId?: string;
  id: string;
  updatedAt: string;
  items?: Item[];
}
