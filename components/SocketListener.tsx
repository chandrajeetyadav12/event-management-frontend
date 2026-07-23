"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "@/hooks/useSocket";
import { seatUpdated } from "@/store/eventSlice";
import { addNewBooking } from "@/store/bookingSlice";
import { AppDispatch, RootState } from "@/store/store";

export default function SocketListener() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const socket = getSocket();
    if (!socket) return;

    const handleConnect = () => {
      console.log("Connected:", socket.id);
    };

    const handleSeatUpdated = (data: any) => {
      console.log("Seat Updated", data);
      dispatch(seatUpdated(data));
    };

    const handleNewBooking = (data: any) => {
      console.log("New Booking", data);
      const isMine = currentUser && currentUser._id?.toString() === data.userId?.toString();
      dispatch(addNewBooking({ booking: data, isMine }));
    };

    socket.on("connect", handleConnect);
    socket.on("seat-updated", handleSeatUpdated);
    socket.on("new-booking", handleNewBooking);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("seat-updated", handleSeatUpdated);
      socket.off("new-booking", handleNewBooking);
    };
  }, [dispatch, currentUser]);

  return null;
}