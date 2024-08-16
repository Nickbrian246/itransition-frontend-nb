import { Collections } from "./collections";
import { CustomField } from "./custom-field";
import { User } from "./user";
import { Tag } from "./tags";
import { Comments } from "./comments";
type CustomFieldForItem = Omit<CustomField, "collectionId">;
export interface Item {
  name: string;
  collection: Collections;
  author: User;
  tagsIds: Tag[];
  customFields?: CustomFieldForItem[];
  updatedAt: string;
  id: string;
  comments: Comments;
}
