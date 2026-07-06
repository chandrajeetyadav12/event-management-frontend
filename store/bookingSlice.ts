import { createSlice } from "@reduxjs/toolkit";
import { bookEvent, fetchMyBookings } from "./bookingThunk";

interface BookingState {
  loading: boolean;
  booking: any;
  bookings: any[];
  error: string | null;
  success: string | null;
}

const initialState: BookingState = {
  loading: false,
  booking: null,
  bookings: [],
  error: null,
  success: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(bookEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      .addCase(
        bookEvent.fulfilled,
        (state, action) => {
          state.loading = false;
          state.booking =
            action.payload.data;

          state.success =
            "Booking Successful!";
        }
      )

      .addCase(
        bookEvent.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload as string;
        }
      )
      .addCase(
        fetchMyBookings.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchMyBookings.fulfilled,
        (state, action) => {
          state.loading = false;

          state.bookings =
            action.payload.data;
        }
      )

      .addCase(
        fetchMyBookings.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload as string;
        }
      )
  },
});

export default bookingSlice.reducer;