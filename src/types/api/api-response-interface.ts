import { ZodIssue } from "zod";
export interface ApiFailureResponse {
  message: string;
  errors?: ZodIssue[];
}

export interface ApiAuthUserSuccess {
  userName: string;
}
export interface ApiAuthUserSuccessMetaData {
  access_token: string;
}

export interface DecodedUser {
  id: string;
}
