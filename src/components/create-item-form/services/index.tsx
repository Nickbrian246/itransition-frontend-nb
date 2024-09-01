import { CustomField } from "@/entities/custom-field";
import { Item } from "@/entities/item";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import axios from "@/lib/axios/axios";
import { CreateItemInterface, CreateItemTags } from "../interfaces";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCustomFieldsByCollectionId(
  collectionId: string
): Promise<ApiSuccessResponseWithData<CustomField[]>> {
  try {
    const { data } = await axios.get<ApiSuccessResponseWithData<CustomField[]>>(
      `${BASE_URL}/custom-fields/${collectionId}`
    );
    return data;
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
  }
}

export async function createItem(
  item: CreateItemInterface
): Promise<ApiSuccessResponseWithData<Item>> {
  try {
    const { data } = await axios.post<ApiSuccessResponseWithData<Item>>(
      `${BASE_URL}/items`,
      item
    );
    return data;
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
  }
}

export async function crateItemsTags(
  tags: CreateItemTags
): Promise<ApiSuccessResponseWithData<Item>> {
  try {
    const { data } = await axios.post<ApiSuccessResponseWithData<Item>>(
      `${BASE_URL}/items-tags`,
      tags
    );
    return data;
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
  }
}
