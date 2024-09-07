import { Collections } from "@/entities/collections";
import { Item } from "@/entities/item";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import axios from "@/lib/axios/axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function getCollectionById(
  id: string
): Promise<ApiSuccessResponseWithData<Collections>> {
  try {
    const { data } = await axios.get(`${BASE_URL}/collections/${id}`);

    return data;
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;
    throw err;
  }
}

export async function getItemsByCollectionId(
  id: string
): Promise<ApiSuccessResponseWithData<Item[]>> {
  try {
    const { data } = await axios.get(`${BASE_URL}/items/collection/${id}`);

    return data;
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;
    throw err;
  }
}
