import { Item } from "./item";
import { Categories } from "./categories";
import { User } from "./user";
export interface Collections {
  name: string;
  description: string;
  category: Categories;
  user: User;
  imageId?: string | null;
  id: string;
  updatedAt: string;
  items?: Item[];
}
