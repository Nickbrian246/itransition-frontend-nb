import { Collections } from "./collections";
import { CustomField } from "./custom-field";
import { User } from "./user";
import { Tag } from "./tags";
type CustomFieldForItem = Omit<CustomField, "collectionId">;
export interface Item {
  name: string;
  collection: Collections;
  author: User;
  tag: Tag;
  customFields?: CustomFieldForItem[];
  updatedAt: string;
  id: string;
}
