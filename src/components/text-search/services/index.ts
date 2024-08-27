import { Item } from "@/entities/item";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import axios from "@/lib/axios/axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCoincidences(
  text: string
): Promise<ApiSuccessResponseWithData<Item[]>> {
  try {
    const { data } = await axios.get(`${BASE_URL}/text-search?text=${text}`);
    return data;
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
  }
}
