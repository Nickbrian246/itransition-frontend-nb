import { Collections } from "@/entities/collections";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getMyCollections(): Promise<
  ApiSuccessResponseWithData<Collections[]>
> {
  try {
    const { data } = await axios.get<ApiSuccessResponseWithData<Collections[]>>(
      `${BASE_URL}/collections`
    );
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
