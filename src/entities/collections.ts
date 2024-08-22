import { Item } from "./item";
import { Categories } from "./categories";
import { User } from "./user";
import { CustomField } from "./custom-field";
export interface Collections {
  name: string;
  description: string;
  category: Categories;
  categoryId: string;
  user: User;
  author: User;
  editedBy: User;
  isEdited: boolean;
  userId: string | null;
  imageId: string | null;
  id: string;
  updatedAt: string;
  items?: Item[];
  customFields?: CustomField[];
}
