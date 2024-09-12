import { Collections } from "@/entities/collections";
import { ErrorResponse } from "@/types/api/api-error.interface";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import axios from "@/lib/axios/axios";
import { User } from "@/entities/user";
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
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
  }
}
export async function deleteCollectionById(
  id: string
): Promise<{ status: number; statusText: string }> {
  try {
    const { status, statusText } = await axios.delete<
      ApiSuccessResponseWithData<Collections[]>
    >(`${BASE_URL}/collections/${id}`);
    return { status, statusText };
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
  }
}

export async function getCollectionsByUserId(
  id: string
): Promise<ApiSuccessResponseWithData<Collections[]>> {
  try {
    const { data } = await axios.get<ApiSuccessResponseWithData<Collections[]>>(
      `${BASE_URL}/collections/user/${id}`
    );
    return data;
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
  }
}

export async function getUserById(id: string) {
  try {
    const { data } = await axios.get<ApiSuccessResponseWithData<User>>(
      `${BASE_URL}/users/user/${id}`
    );
    return data;
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
  }
}
