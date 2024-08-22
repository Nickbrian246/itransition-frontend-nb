import { Collections } from "@/entities/collections";
import { CustomField } from "@/entities/custom-field";

export interface CreateCollection
  extends Omit<
    Collections,
    | "id"
    | "updatedAt"
    | "items"
    | "category"
    | "user"
    | "categoryId"
    | "author"
    | "editedBy"
    | "isEdited"
  > {
  category: string;
}
export interface UpdateCollection
  extends Omit<
    Collections,
    | "id"
    | "updatedAt"
    | "items"
    | "category"
    | "user"
    | "categoryId"
    | "userId"
    | "author"
    | "editedBy"
    | "isEdited"
  > {
  category: string;
}
export interface Custom extends Omit<CustomField, "collectionId"> {
  id: string;
}

export interface EditableCollection
  extends Omit<
    Collections,
    | "user"
    | "updatedAt"
    | "category"
    | "categoryId"
    | "userId"
    | "author"
    | "editedBy"
    | "isEdited"
  > {
  categoryId: string | null;
}
