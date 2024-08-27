import axios from "@/lib/axios/axios";
const BASE_ULR = process.env.NEXT_PUBLIC_BASE_URL;
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import { Item } from "@/entities/item";
export async function getLatestItems(): Promise<
  ApiSuccessResponseWithData<Item[]>
> {
  try {
    const { data } = await axios.get<ApiSuccessResponseWithData<Item[]>>(
      `${BASE_ULR}/items/latest/feed`
    );
    return data;
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
  }
}
