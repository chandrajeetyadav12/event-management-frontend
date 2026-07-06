"use client";

import { useEffect } from "react";
import socket from "@/hooks/useSocket";

export default function SocketListener() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("seat-updated", (data) => {
      console.log("Seat Updated", data);
    });

    socket.on("new-booking", (data) => {
      console.log("New Booking", data);
    });

    return () => {
      socket.off("connect");
      socket.off("seat-updated");
      socket.off("new-booking");
    };
  }, []);

  return null;
}