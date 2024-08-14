import { Tag, TagWithItems } from "@/entities/tags";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function getItemsByTagId(
  id: string
): Promise<ApiSuccessResponseWithData<TagWithItems>> {
  try {
    const { data } = await axios.get<ApiSuccessResponseWithData<TagWithItems>>(
      `${BASE_URL}/tags/${id}/items`
    );
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
