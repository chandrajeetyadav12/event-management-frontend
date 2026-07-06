"use client";

import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchMyBookings,
} from "@/store/bookingThunk";

import {
  AppDispatch,
  RootState,
} from "@/store/store";

export default function BookingsPage() {
  const dispatch =
    useDispatch<AppDispatch>();

  const token =
    useSelector(
      (state: RootState) =>
        state.auth.token
    );

  const {
    bookings,
    loading,
    error,
  } = useSelector(
    (state: RootState) =>
      state.booking
  );

  useEffect(() => {
    if (token) {
      dispatch(
        fetchMyBookings(
          token
        )
      );
    }
  }, [
    dispatch,
    token,
  ]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold">
          Loading Bookings...
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      {bookings.length === 0 ? (
        <div className="border rounded-lg p-6 text-center">
          <p className="text-gray-500">
            No bookings found.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map(
            (booking: any) => (
              <div
                key={booking._id}
                className="border rounded-lg p-5 shadow-sm"
              >
                <h2 className="text-xl font-semibold">
                  {
                    booking.eventId
                      ?.title
                  }
                </h2>

                <p className="mt-2">
                  <span className="font-medium">
                    Venue:
                  </span>{" "}
                  {
                    booking.eventId
                      ?.venue
                  }
                </p>

                <p>
                  <span className="font-medium">
                    Seats:
                  </span>{" "}
                  {
                    booking.seats
                  }
                </p>

                <p>
                  <span className="font-medium">
                    Status:
                  </span>{" "}
                  {
                    booking.bookingStatus
                  }
                </p>

                <p>
                  <span className="font-medium">
                    Booking Date:
                  </span>{" "}
                  {new Date(
                    booking.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}