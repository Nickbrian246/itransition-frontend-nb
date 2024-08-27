import { User } from "@/entities/user";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import axios from "@/lib/axios/axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getUsers(): Promise<ApiSuccessResponseWithData<User[]>> {
  try {
    const { data } = await axios.get(`${BASE_URL}/users`);
    return data;
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;
    throw err;
  }
}
