"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "@/hooks/useSocket";
import { seatUpdated } from "@/store/eventSlice";
import { addNewBooking } from "@/store/bookingSlice";
import { AppDispatch, RootState } from "@/store/store";

export default function SocketListener() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("seat-updated", (data) => {
      console.log("Seat Updated", data);
      dispatch(seatUpdated(data));
    });

    socket.on("new-booking", (data) => {
      console.log("New Booking", data);
      const isMine = currentUser && currentUser._id?.toString() === data.userId?.toString();
      dispatch(addNewBooking({ booking: data, isMine }));
    });

    return () => {
      socket.off("connect");
      socket.off("seat-updated");
      socket.off("new-booking");
    };
  }, [dispatch, currentUser]);

  return null;
}