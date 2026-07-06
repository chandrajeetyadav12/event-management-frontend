import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createBooking,getMyBookings
} from "@/services/booking.service";

export const bookEvent =
  createAsyncThunk(
    "booking/create",
    async (
      data: {
        eventId: string;
        seats: number;
        token: string;
      },
      thunkAPI
    ) => {
      try {
        return await createBooking(
          data.eventId,
          data.seats,
          data.token
        );
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );
  export const fetchMyBookings =
  createAsyncThunk(
    "booking/myBookings",
    async (
      token: string,
      thunkAPI
    ) => {
      try {
        return await getMyBookings(
          token
        );
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );