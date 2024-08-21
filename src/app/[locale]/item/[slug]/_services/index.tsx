import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import axios from "axios";
import { ItemWithEditableCustomFields } from "../_interfaces";
import { Item } from "@/entities/item";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getItemById(
  id: string
): Promise<ApiSuccessResponseWithData<ItemWithEditableCustomFields>> {
  try {
    const { data } = await axios.get(`${BASE_URL}/items/${id}`);
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function updateItemById(
  item: Pick<Item, "name" | "customFields" | "tagsIds">,
  id: string
): Promise<ApiSuccessResponseWithData<Item>> {
  try {
    const { data } = await axios.put<ApiSuccessResponseWithData<Item>>(
      `${BASE_URL}/items/${id}`,
      item
    );
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
export async function deleteItemById(id: string): Promise<{
  statusText: string;
  status: number;
}> {
  try {
    const { statusText, status } = await axios.delete(
      `${BASE_URL}/items/${id}`
    );
    return { statusText, status };
  } catch (error) {
    throw new Error(`${error}`);
  }
}
