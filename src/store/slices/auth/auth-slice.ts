import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { User } from "@/entities/user";
import { getUser, loginUser, registerUser } from "./auth-thunk";
import { setAccessToken } from "@/utils/localstorage/localstorage";
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
const initialState: InitialState = {
  user: {
    email: "",
    firstName: "",
    role: null,
    isAuth: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        setAccessToken(payload.metaData.access_token);
        state.user = { ...payload.data, isAuth: true };
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.authError = {
          isActive: true,
          message: payload ?? "",
        };
      })

      .addCase(loginUser.fulfilled, (state, { payload }) => {
        setAccessToken(payload.metaData.access_token);
        state.user = { ...payload.data, isAuth: true };
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.authError = { isActive: true, message: payload ?? "" };
      })

      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user = { ...payload.data, isAuth: true };
      });
  },
});

export const { cleanAuth, setUser, cleanAuthErrorMessage } = userSlice.actions;

export default userSlice.reducer;
