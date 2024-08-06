import { CustomField } from "./custom-field";
type CustomFieldForItem = Omit<CustomField, "collectionId">;
export interface Item {
  name: string;
  collectionId: string;
  tagId: string;
  customFields: CustomFieldForItem[];
}
