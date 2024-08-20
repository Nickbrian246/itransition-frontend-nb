import { Collections } from "@/entities/collections";
import axios from "axios";
import { CreateCollection as CreateCollectionInterface } from "../interfaces";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import { CustomField } from "@/entities/custom-field";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function CreateCollection(
  collection: CreateCollectionInterface
): Promise<ApiSuccessResponseWithData<Collections>> {
  try {
    const { data } = await axios.post<ApiSuccessResponseWithData<Collections>>(
      `${BASE_URL}/collections`,
      collection
    );
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
export async function editCollectionById(
  collection: CreateCollectionInterface,
  id: string
): Promise<ApiSuccessResponseWithData<Collections>> {
  try {
    const { data } = await axios.put<ApiSuccessResponseWithData<Collections>>(
      `${BASE_URL}/collections/${id}`,
      collection
    );
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function CreateCustomFIeldsByCollectionId(fields: CustomField[]) {
  try {
    const { status } = await axios.post(
      `${BASE_URL}/custom-fields`,
      {
        customFields: fields,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return status;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
