import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    data: RegisterPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        "/auth/register",
        data
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    data: LoginPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        "/auth/login",
        data
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/auth/logout"
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Logout Failed"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (
    email: string,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        "/auth/forgot-password",
        { email }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to send reset email"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    data: {
      token: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        `/auth/reset-password/${data.token}`,
        {
          password: data.password,
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Password reset failed"
      );
    }
  }
);