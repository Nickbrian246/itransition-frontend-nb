import { ApiSuccessResponseWithMetaData } from "@/types/api/api-response-interface";
import { AccessToken, UserApiResponse } from "@/types/api/api-response-types";
import { LoginUser, RegisterUser } from "@/validations";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = process.env.BASE_URL;

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
    return rejectWithValue(
      error.response?.data?.message || "Error desconocido"
    );
  }
});

export const loginUser = createAsyncThunk<
  ApiSuccessResponseWithMetaData<UserApiResponse, AccessToken>,
  LoginUser,
  { rejectValue: string }
>("auth/register", async (userData, { fulfillWithValue, rejectWithValue }) => {
  try {
    const { data } = await axios.post<
      ApiSuccessResponseWithMetaData<UserApiResponse, AccessToken>
    >(`${BASE_URL}/auth/signin`, userData);

    return fulfillWithValue(data);
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Error desconocido"
    );
  }
});
