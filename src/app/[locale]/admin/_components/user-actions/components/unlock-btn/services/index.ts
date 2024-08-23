import { UsersIds } from "@/app/[locale]/admin/_interfaces";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function unLockUsersByIds(users: UsersIds): Promise<string> {
  try {
    const { statusText } = await axios.patch(
      `${BASE_URL}/users/un-lock`,
      users
    );
    return statusText;
  } catch (error) {
    throw new Error(`${error}`);
  }
}