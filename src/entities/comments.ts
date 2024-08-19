import { Item } from "./item";
import { User } from "./user";

export interface Comments {
  content: string;
  itemId: string;
  item: Item;
  userId: string;
  user: User;
  id: string;
  updatedAt: string;
}
