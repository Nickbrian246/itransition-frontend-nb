import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { User, UserPreferences } from "@/entities/user";
import {
  getUser,
  loginUser,
  registerUser,
  saveUserPreference,
} from "./auth-thunk";
import {
  setAccessToken,
  setUserPreferencesInLocalStorage,
} from "@/utils/localstorage/localstorage";
export interface userState extends Omit<User, "password" | "lastName"> {
  isAuth: boolean;
}
interface AuthError {
  message: string;
  duration?: number;
  isActive: boolean;
}
interface InitialState {
  user: userState;
  authError: AuthError;
}
const defaultUserPreference: UserPreferences = {
  language: "en",
  theme: "LIGHT",
};
const initialState: InitialState = {
  user: {
    email: "",
    firstName: "",
    role: null,
    isAuth: false,
    userPreferences: defaultUserPreference,
  },
  authError: {
    duration: 3000,
    message: "",
    isActive: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: userState }) => {
      state.user = { ...payload, isAuth: true };
    },
    cleanAuth: () => {
      return { ...initialState };
    },
    cleanAuthErrorMessage: (state) => {
      state.authError = { isActive: false, message: "" };
    },
    setUserPreference: (state, { payload }: { payload: UserPreferences }) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        setAccessToken(payload.metaData.access_token);
        state.user = {
          ...payload.data,
          userPreferences: defaultUserPreference,
          isAuth: true,
        };
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.authError = {
          isActive: true,
          message: payload ?? "",
        };
      })

      .addCase(loginUser.fulfilled, (state, { payload }) => {
        setAccessToken(payload.metaData.access_token);
        if (payload.data.userPreferences)
          setUserPreferencesInLocalStorage(payload.data.userPreferences);
        state.user = { ...payload.data, isAuth: true };
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.authError = { isActive: true, message: payload ?? "" };
      })

      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user = { ...payload.data, isAuth: true };
      })

      .addCase(saveUserPreference.fulfilled, (state, { payload }) => {
        if (payload.data) setUserPreferencesInLocalStorage(payload.data);
        state.user.userPreferences = payload.data;
      });
  },
});

export const { cleanAuth, setUser, cleanAuthErrorMessage } = userSlice.actions;

export default userSlice.reducer;
