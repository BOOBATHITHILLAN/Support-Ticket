import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: { username: string } | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};
export interface LoginResponse {
  message: string;
  user: { username: string };
  token: string;
}
const API_URL = import.meta.env.VITE_API_URL;
export const login = createAsyncThunk<
  LoginResponse,
  { username: string; password: string }
>("auth/login", async ({ username, password }) => {
  const res = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
    username,
    password,
  });
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
