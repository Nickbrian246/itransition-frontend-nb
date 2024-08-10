import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { User } from "@/entities/user";
import { registerUser } from "./auth-thunk";

type InitialState = Omit<User, "password">;
const initialState: InitialState = {
  email: "",
  firstName: "",
  lastName: "",
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: InitialState }) => {
      return { ...payload };
    },
    cleanAuth: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, () => {})
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        console.log(payload);
      });
  },
});

export const { cleanAuth, setUser } = userSlice.actions;

export default userSlice.reducer;
