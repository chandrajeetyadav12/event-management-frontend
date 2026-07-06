import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "./authThunk";
import Cookies from "js-cookie";
interface AuthState {
  loading: boolean;
  user: any;
  token: string | null;
  error: string | null;
  success: string | null;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  token: null,
  error: null,
  success: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        registerUser.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user =
            action.payload.user;

          state.token =
            action.payload.token;
          Cookies.set(
            "token",
            action.payload.data.token,
            {
              expires: 7,
            }
          );
        }
      )

      .addCase(
        registerUser.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload as string;
        }
      )
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      .addCase(
        loginUser.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user =
            action.payload.data.user;

          state.token =
            action.payload.data.token;
          state.success =
            "Login successful!";
        }
      )

      .addCase(
        loginUser.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload as string;
            state.success = null;
        }
      )
      .addCase(logoutUser.pending, (state) => {
  state.loading = true;
})

.addCase(logoutUser.fulfilled, (state) => {
  state.loading = false;

  state.user = null;
  state.token = null;
  state.error = null;
  state.success =null;
})

.addCase(logoutUser.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
})
  },
});

export default authSlice.reducer;