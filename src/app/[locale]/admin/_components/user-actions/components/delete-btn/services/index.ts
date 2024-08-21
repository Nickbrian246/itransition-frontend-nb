import { UsersIds } from "@/app/[locale]/admin/_interfaces";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function deleteUsersByIds(users: UsersIds): Promise<string> {
  try {
    const { statusText } = await axios.put(`${BASE_URL}/users`, users);
    return statusText;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
