import { Collections } from "@/entities/collections";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import axios from "@/lib/axios/axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getLatestCollections(): Promise<
  ApiSuccessResponseWithData<Collections[]>
> {
  try {
    const { data } = await axios.get<ApiSuccessResponseWithData<Collections[]>>(
      `${BASE_URL}/collections/latest/feed`
    );
    return data;
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
  }
}
