import { ZodIssue } from "zod";
export interface ApiFailureResponse {
  message: string;
  errors?: ZodIssue[];
}

export interface ApiSuccessResponseWithMetaData<T, V> {
  data: T;
  metaData: V;
}
export interface ApiSuccessResponseWithData<T> {
  data: T;
}
