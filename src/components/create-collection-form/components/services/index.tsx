import { Categories } from "@/entities/categories";
import { ApiSuccessResponseWithData } from "@/types/api/api-response-interface";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GetCategories(): Promise<
  ApiSuccessResponseWithData<Categories[]>
> {
  try {
    const { data } = await axios.get(`${BASE_URL}/categories`);
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
