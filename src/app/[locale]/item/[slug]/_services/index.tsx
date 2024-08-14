import { Item } from "@/entities/item";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getItemById(
  id: string
): Promise<ApiSuccessResponseWithData<Item>> {
  try {
    const { data } = await axios.get(`${BASE_URL}/items/${id}`);
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
