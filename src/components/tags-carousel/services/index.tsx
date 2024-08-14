import axios from "axios";
import { Tag } from "@/entities/tags";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getTags(): Promise<ApiSuccessResponseWithData<Tag[]>> {
  try {
    const data = await axios.get<ApiSuccessResponseWithData<Tag[]>>(
      `${BASE_URL}/tags`
    );
    return data.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
