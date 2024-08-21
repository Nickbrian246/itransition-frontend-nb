import { Collections } from "@/entities/collections";
import { CustomField } from "@/entities/custom-field";

export interface CreateCollection
  extends Omit<
    Collections,
    "id" | "updatedAt" | "items" | "category" | "user" | "categoryId"
  > {
  category: string;
}
export interface Custom extends Omit<CustomField, "collectionId"> {
  id: string;
}
