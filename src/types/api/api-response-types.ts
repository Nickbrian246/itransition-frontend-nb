import { User } from "@/entities/user";

export interface UserApiResponse
  extends Pick<User, "email" | "firstName" | "role" | "userPreferences"> {}

export type AccessToken = { access_token: string };
