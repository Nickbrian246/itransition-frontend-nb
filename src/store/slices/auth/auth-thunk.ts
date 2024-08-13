import {
  ApiSuccessResponseWithData,
  ApiSuccessResponseWithMetaData,
} from "@/types/api/api-response-interface";
import { AccessToken, UserApiResponse } from "@/types/api/api-response-types";
import { LoginUser, RegisterUser } from "@/validations";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const registerUser = createAsyncThunk<
  ApiSuccessResponseWithMetaData<UserApiResponse, AccessToken>,
  RegisterUser,
  { rejectValue: string }
>("auth/register", async (userData, { fulfillWithValue, rejectWithValue }) => {
  try {
    const { data } = await axios.post<
      ApiSuccessResponseWithMetaData<UserApiResponse, AccessToken>
    >(`${BASE_URL}/auth/signup`, userData);
    return fulfillWithValue(data);
  } catch (error: any) {
    return rejectWithValue(error.response.data.message as string);
  }
});

export const loginUser = createAsyncThunk<
  ApiSuccessResponseWithMetaData<UserApiResponse, AccessToken>,
  LoginUser,
  { rejectValue: string }
>("auth/login", async (userData, { fulfillWithValue, rejectWithValue }) => {
  try {
    const { data } = await axios.post<
      ApiSuccessResponseWithMetaData<UserApiResponse, AccessToken>
    >(`${BASE_URL}/auth/signin`, userData);

    return fulfillWithValue(data);
  } catch (error: any) {
    return rejectWithValue(error.response.data.message as string);
  }
});

export const getUser = createAsyncThunk<
  ApiSuccessResponseWithData<UserApiResponse>
>("getUser", async (_, { fulfillWithValue, rejectWithValue }) => {
  try {
    const { data } = await axios.get<
      ApiSuccessResponseWithMetaData<UserApiResponse, AccessToken>
    >(`${BASE_URL}/users/user`);
    return fulfillWithValue(data);
  } catch (error: any) {
    console.log(error.response.data.message);
    throw new Error(error);
  }
});
