import { Tag, TagWithItems } from "@/entities/tags";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import axios from "@/lib/axios/axios";
import { ItemByTagId, TagResponse } from "../_interfaces/item";
import { Item } from "@/entities/item";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function getItemsByTagId(
  id: string
): Promise<ApiSuccessResponseWithData<ItemByTagId[]>> {
  try {
    const { data } = await axios.get<ApiSuccessResponseWithData<ItemByTagId[]>>(
      `${BASE_URL}/items-tags/tag/${id}`
    );
    return data;
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
  }
}

export async function getTagById(
  id: string
): Promise<ApiSuccessResponseWithData<Tag>> {
  try {
    const { data } = await axios.get<ApiSuccessResponseWithData<TagResponse>>(
      `${BASE_URL}/tags/${id}`
    );
    return data;
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
  }
}
