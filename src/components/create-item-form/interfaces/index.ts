import { Item } from "@/entities/item";
export interface CreateItemInterface
  extends Pick<Item, "name" | "customFields" | "collectionId" | "userId"> {}

export interface CreateItemTags {
  itemId: string;
  tagsIds: string[];
}
