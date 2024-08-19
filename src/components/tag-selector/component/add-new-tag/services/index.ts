import { Tag } from "@/entities/tags";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function createTag(
  name: string
): Promise<ApiSuccessResponseWithData<Tag>> {
  try {
    const { data } = await axios.post<ApiSuccessResponseWithData<Tag>>(
      `${BASE_URL}/tags`,
      { name }
    );

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
