import { Item } from "./item";
import { Categories } from "./categories";
export interface Collections {
  name: string;
  description: string;
  category: Categories;
  imageId?: string | null;
  id: string;
  updatedAt: string;
  items?: Item[];
}
