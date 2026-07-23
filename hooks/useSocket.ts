"use client";

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let activeRoomId: string | null = null;

const rejoinActiveRoom = () => {
  if (!activeRoomId) return;

  const socketInstance = getSocket();
  if (!socketInstance) return;

  socketInstance.emit("join-event", activeRoomId);
};

export const getSocket = () => {
  if (typeof window === "undefined") return null;

  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socket.on("connect", rejoinActiveRoom);
  }

  return socket;
};

export const joinEventRoom = (eventId: string | string[] | undefined) => {
  if (typeof window === "undefined") return;
  if (!eventId || typeof eventId !== "string") return;

  const socketInstance = getSocket();
  if (!socketInstance) return;

  if (activeRoomId === eventId) {
    rejoinActiveRoom();
    return;
  }

  if (activeRoomId) {
    socketInstance.emit("leave-event", activeRoomId);
  }

  activeRoomId = eventId;
  rejoinActiveRoom();
};

export const leaveEventRoom = (eventId?: string | string[]) => {
  if (typeof window === "undefined") return;
  if (!eventId || typeof eventId !== "string") return;

  const socketInstance = getSocket();
  if (!socketInstance) return;

  if (activeRoomId === eventId) {
    socketInstance.emit("leave-event", eventId);
    activeRoomId = null;
  }
};

export default getSocket;