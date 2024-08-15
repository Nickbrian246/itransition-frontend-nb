import { Collections } from "@/entities/collections";

export interface CreateCollection
  extends Omit<Collections, "id" | "updatedAt" | "items" | "category"> {
  categories: string[];
}
