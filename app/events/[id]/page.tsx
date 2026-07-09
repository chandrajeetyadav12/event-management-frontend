"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams, useRouter
} from "next/navigation";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchEventById,
} from "@/store/eventThunk";

import {
  bookEvent,
} from "@/store/bookingThunk";

import {
  AppDispatch,
  RootState,
} from "@/store/store";
import { joinEventRoom, leaveEventRoom } from "@/hooks/useSocket";

export default function EventDetails() {
  const params =
    useParams();
  const router = useRouter();

  const dispatch =
    useDispatch<AppDispatch>();

  const [seats, setSeats] =
    useState(1);

  const {
    selectedEvent,
    loading,
    
  } = useSelector(
    (state: RootState) =>
      state.events
  );
  const {
    success,error
  } = useSelector(
    (state: RootState) =>
      state.booking
  );
  const token =
    useSelector(
      (
        state: RootState
      ) =>
        state.auth.token
    );

  useEffect(() => {
    dispatch(
      fetchEventById(
        params.id as string
      )
    );

    joinEventRoom(params.id as string);

    return () => {
      leaveEventRoom(params.id as string);
    };
  }, [dispatch, params.id]);

  const handleBooking =
    async () => {
      if (!token) {
        alert(
          "Please login first"
        );

        return;
      }

      const result = await dispatch(
        bookEvent({
          eventId: selectedEvent._id,
          seats,
          token,
        })
      );
      if (bookEvent.fulfilled.match(result)) {
        alert("Booking Successful");

        router.push("/bookings");
      }

    };

  if (
    loading ||
    !selectedEvent
  ) {
    return (
      <h1>
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold">
        {
          selectedEvent.title
        }
      </h1>

      <p className="mt-3">
        {
          selectedEvent.description
        }
      </p>

      <p className="mt-3">
        Venue:
        {
          selectedEvent.venue
        }
      </p>

      <p className="mt-3">
        Available Seats:
        {
          selectedEvent.availableSeats
        }
      </p>

      <div className="mt-5">
        <input
          type="number"
          value={seats}
          min={1}
          onChange={(e) =>
            setSeats(
              Number(
                e.target.value
              )
            )
          }
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={
          handleBooking
        }
        className="mt-5 bg-black text-white px-5 py-3 rounded"
      >
        Book Now
      </button>
      {success && (
        <p className="text-green-600 mt-3">
          {success}
        </p>
      )}

      {error && (
        <p className="text-red-500 mt-3">
          {error}
        </p>
      )}
    </div>
  );
}