import { Collections } from "@/entities/collections";
import axios from "@/lib/axios/axios";
import {
  CreateCollection as CreateCollectionInterface,
  UpdateCollection,
} from "../interfaces";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import { CustomField } from "@/entities/custom-field";
import { Categories } from "@/entities/categories";
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
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
  }
}
export async function editCollectionById(
  collection: UpdateCollection,
  id: string
): Promise<ApiSuccessResponseWithData<Collections>> {
  try {
    const { data } = await axios.put<ApiSuccessResponseWithData<Collections>>(
      `${BASE_URL}/collections/${id}`,
      collection
    );
    return data;
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
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
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
  }
}

export async function CreateNewCategory(
  name: string
): Promise<ApiSuccessResponseWithData<Categories>> {
  try {
    const { data } = await axios.post(`${BASE_URL}/categories`, { name });
    return data;
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
  }
}
