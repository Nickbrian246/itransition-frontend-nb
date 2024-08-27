import { UpdateRoles, UsersIds } from "@/app/[locale]/admin/_interfaces";
import axios from "@/lib/axios/axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function changeRolesByIds(users: UpdateRoles): Promise<string> {
  try {
    const { statusText } = await axios.patch(`${BASE_URL}/users/role`, users);
    return statusText;
  } catch (error) {
    //@ts-ignore
    const err: ErrorResponse<string> = error.response.data;

    throw err;
  }
}
