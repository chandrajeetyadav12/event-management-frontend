"use client";

import { io, Socket } from "socket.io-client";

const socket: Socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000",
  {
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  }
);

let activeRoomId: string | null = null;

const rejoinActiveRoom = () => {
  if (!activeRoomId) return;
  socket.emit("join-event", activeRoomId);
};

socket.on("connect", rejoinActiveRoom);

export const joinEventRoom = (eventId: string | string[] | undefined) => {
  if (!eventId || typeof eventId !== "string") return;

  if (activeRoomId === eventId) {
    rejoinActiveRoom();
    return;
  }

  if (activeRoomId) {
    socket.emit("leave-event", activeRoomId);
  }

  activeRoomId = eventId;
  rejoinActiveRoom();
};

export const leaveEventRoom = (eventId?: string | string[]) => {
  if (!eventId || typeof eventId !== "string") return;

  if (activeRoomId === eventId) {
    socket.emit("leave-event", eventId);
    activeRoomId = null;
  }
};

export default socket;