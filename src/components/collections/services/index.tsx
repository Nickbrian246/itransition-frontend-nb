import { Collections } from "@/entities/collections";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import axios from "axios";
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
    throw Error(`${error}`);
  }
}
