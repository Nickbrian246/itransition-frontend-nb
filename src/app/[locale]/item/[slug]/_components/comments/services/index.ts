import { Comments } from "@/entities/comments";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import axios from "axios";
import { GetLikes } from "../../../_interfaces";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCommentsByItemId(
  id: string
): Promise<ApiSuccessResponseWithData<Comments[]>> {
  try {
    const { data } = await axios.get(`${BASE_URL}/comments/item/${id}`);
    return data;
  } catch (error) {
    throw new Error("");
  }
}
export async function CreateComment(
  comment: Pick<Comments, "content" | "itemId">
): Promise<ApiSuccessResponseWithData<Comments[]>> {
  try {
    const { data } = await axios.post(`${BASE_URL}/comments`, comment);
    return data;
  } catch (error) {
    throw new Error("");
  }
}
export async function getLIkes(
  itemId: string
): Promise<ApiSuccessResponseWithData<GetLikes>> {
  try {
    const { data } = await axios.get<ApiSuccessResponseWithData<GetLikes>>(
      `${BASE_URL}/likes/${itemId}`
    );
    return data;
  } catch (error) {
    throw new Error("");
  }
}
export async function createLike(
  itemId: string
): Promise<ApiSuccessResponseWithData<GetLikes>> {
  try {
    const { data } = await axios.post<ApiSuccessResponseWithData<GetLikes>>(
      `${BASE_URL}/likes/${itemId}`
    );
    return data;
  } catch (error) {
    throw new Error("");
  }
}

export async function disLike(
  itemId: string
): Promise<ApiSuccessResponseWithData<GetLikes>> {
  try {
    const { data } = await axios.delete<ApiSuccessResponseWithData<GetLikes>>(
      `${BASE_URL}/likes/${itemId}`
    );
    return data;
  } catch (error) {
    throw new Error("");
  }
}
