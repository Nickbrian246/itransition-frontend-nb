import { CreateCustomFieldFromItem } from "@/entities/custom-field";
import { Item as ItemInterface } from "@/entities/item";
export interface ItemWithEditableCustomFields
  extends Omit<ItemInterface, "customFields"> {
  customFields: CreateCustomFieldFromItem[];
}

export interface GetLikes {
  didUserLikeIt: boolean;
  counter: number;
}
