import { UserPreferences } from "@/entities/user";
import {
  ApiSuccessResponseWithData,
  ApiSuccessResponseWithMetaData,
} from "@/types/api/api-response-interface";
import { AccessToken, UserApiResponse } from "@/types/api/api-response-types";
import { LoginUser, RegisterUser } from "@/validations";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios/axios";
import { setTheme } from "../theme/theme-slice";
import { setLocale } from "../current-locale";
import { setUserPreferencesInLocalStorage } from "@/utils/localstorage/localstorage";
import { ErrorResponse } from "@/types/api/api-error.interface";
import { setGlobalWarning } from "../global-warning/slice";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const registerUser = createAsyncThunk<
  ApiSuccessResponseWithMetaData<UserApiResponse, AccessToken>,
  RegisterUser,
  { rejectValue: string }
>(
  "auth/register",
  async (userData, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post<
        ApiSuccessResponseWithMetaData<UserApiResponse, AccessToken>
      >(`${BASE_URL}/auth/signup`, userData);
      return fulfillWithValue(data);
    } catch (error) {
      //@ts-ignore
      let err: ErrorResponse<string> = error.response.data;
      dispatch(
        setGlobalWarning({
          message: err.message,
          severity: "error",
        })
      );
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk<
  ApiSuccessResponseWithMetaData<UserApiResponse, AccessToken>,
  LoginUser,
  { rejectValue: string }
>(
  "auth/login",
  async (userData, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post<
        ApiSuccessResponseWithMetaData<UserApiResponse, AccessToken>
      >(`${BASE_URL}/auth/signin`, userData);

      return fulfillWithValue(data);
    } catch (error: any) {
      //@ts-ignore
      let err: ErrorResponse<string> = error.response.data;
      dispatch(
        setGlobalWarning({
          message: err.message,
          severity: "error",
        })
      );
      return rejectWithValue(err.message);
    }
  }
);

export const getUser = createAsyncThunk<
  ApiSuccessResponseWithData<UserApiResponse>,
  string
>(
  "getUser",
  async (accessToken, { fulfillWithValue, dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get<
        ApiSuccessResponseWithMetaData<UserApiResponse, AccessToken>
      >(`${BASE_URL}/users/user`, {
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
      });
      const {
        data: { userPreferences },
      } = data;
      if (userPreferences?.language && userPreferences?.theme) {
        dispatch(setTheme(data.data.userPreferences.theme));
        dispatch(setLocale(data.data.userPreferences.language));
      }

      return fulfillWithValue(data);
    } catch (error: any) {
      //@ts-ignore
      let err: ErrorResponse<string> = error.response.data;
      dispatch(
        setGlobalWarning({
          message: err.message,
          severity: "error",
        })
      );
      return rejectWithValue(err.message);
    }
  }
);

export const saveUserPreference = createAsyncThunk<
  ApiSuccessResponseWithData<UserPreferences>,
  UserPreferences
>(
  "auth/saveUserPreference",
  async (userPreferences, { fulfillWithValue, dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post<
        ApiSuccessResponseWithData<UserPreferences>
      >(`${BASE_URL}/user-preferences`, userPreferences);
      setUserPreferencesInLocalStorage(data.data);
      dispatch(setTheme(userPreferences.theme));
      dispatch(setLocale(userPreferences.language));
      return fulfillWithValue(data);
    } catch (error: any) {
      //@ts-ignore
      let err: ErrorResponse<string> = error.response.data;
      dispatch(
        setGlobalWarning({
          message: err.message,
          severity: "error",
        })
      );
      return rejectWithValue(err.message);
    }
  }
);
