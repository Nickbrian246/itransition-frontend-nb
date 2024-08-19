import { CustomField } from "@/entities/custom-field";
import { Item } from "@/entities/item";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import axios from "axios";
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
    throw new Error(`${error}`);
  }
}

export async function createItem(
  item: Pick<Item, "name" | "customFields" | "tagsIds" | "collectionId">
): Promise<ApiSuccessResponseWithData<Item>> {
  try {
    const { data } = await axios.post<ApiSuccessResponseWithData<Item>>(
      `${BASE_URL}/items`,
      item
    );
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}