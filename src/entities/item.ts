import { Collections } from "./collections";
import { CustomField } from "./custom-field";
import { User } from "./user";
import { Tag } from "./tags";
import { Comments } from "./comments";
export type CustomFieldForItem = Omit<CustomField, "collectionId">;
export interface Item {
  name: string;
  collection: Collections;
  collectionId: string;
  author: User;
  authorId: string;
  tagsIds: string[];
  tag: Tag[];
  customFields?: CustomFieldForItem[];
  updatedAt: string;
  id: string;
  comments: Comments;
}
