import { UserPreferences } from "@/entities/user";
import {
  ApiSuccessResponseWithData,
  ApiSuccessResponseWithMetaData,
} from "@/types/api/api-response-interface";
import { AccessToken, UserApiResponse } from "@/types/api/api-response-types";
import { LoginUser, RegisterUser } from "@/validations";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setTheme } from "../theme/theme-slice";
import { setLocale } from "../current-locale";
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
>("getUser", async (_, { fulfillWithValue, dispatch }) => {
  try {
    const { data } = await axios.get<
      ApiSuccessResponseWithMetaData<UserApiResponse, AccessToken>
    >(`${BASE_URL}/users/user`);
    const {
      data: { userPreferences },
    } = data;
    if (userPreferences.language && userPreferences.theme) {
      dispatch(setTheme(data.data.userPreferences.theme));
      dispatch(setLocale(data.data.userPreferences.language));
    }
    return fulfillWithValue(data);
  } catch (error: any) {
    throw new Error(error);
  }
});

export const saveUserPreference = createAsyncThunk<
  ApiSuccessResponseWithData<UserPreferences>,
  UserPreferences
>(
  "auth/saveUserPreference",
  async (userPreferences, { fulfillWithValue, dispatch }) => {
    try {
      const { data } = await axios.post<
        ApiSuccessResponseWithData<UserPreferences>
      >(`${BASE_URL}/user-preferences`, userPreferences);
      dispatch(setTheme(userPreferences.theme));
      dispatch(setLocale(userPreferences.language));
      return fulfillWithValue(data);
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
