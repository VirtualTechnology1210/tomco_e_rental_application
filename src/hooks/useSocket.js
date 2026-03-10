import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { tokenStorage } from "../utils/tokenStorage";
import { API_BASE_URL } from "../utils/constants";
import { incrementUnread } from "../store/slices/notificationSlice";
import Toast from "react-native-toast-message";
const SOCKET_URL = API_BASE_URL.replace("/api/v1", "");
const useSocket = (userId) => {
  const socketRef = useRef(null);
  const dispatch = useDispatch();
  const connect = useCallback(async () => {
    if (!userId) return;
    const token = await tokenStorage.getAccessToken();
    if (!token) return;
    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
      reconnection: true,
      reconnectionDelay: 2e3,
      reconnectionAttempts: 10
    });
    socket.on("connect", () => {
      console.log("[Socket] Connected");
    });
    socket.on("booking:new_request", (data) => {
      dispatch(incrementUnread());
      Toast.show({
        type: "info",
        text1: "New Booking Request! \u{1F514}",
        text2: `${data.vehicle_name} \u2014 \u20B9${data.total_cost}`,
        visibilityTime: 4e3
      });
    });
    socket.on("booking:accepted", (data) => {
      dispatch(incrementUnread());
      Toast.show({
        type: "success",
        text1: "Booking Accepted! \u2705",
        text2: "Your booking has been confirmed by the owner.",
        visibilityTime: 4e3
      });
    });
    socket.on("booking:rejected", (data) => {
      dispatch(incrementUnread());
      Toast.show({
        type: "error",
        text1: "Booking Rejected \u274C",
        text2: data.reason || "The owner declined your booking.",
        visibilityTime: 4e3
      });
    });
    socket.on("booking:cancelled", (data) => {
      dispatch(incrementUnread());
      Toast.show({
        type: "info",
        text1: "Booking Cancelled",
        text2: "A booking has been cancelled.",
        visibilityTime: 3e3
      });
    });
    socket.on("notification:new", () => {
      dispatch(incrementUnread());
    });
    socket.on("disconnect", (reason) => {
      console.log("[Socket] Disconnected:", reason);
    });
    socket.on("connect_error", (err) => {
      console.error("[Socket] Connection error:", err.message);
    });
    socketRef.current = socket;
  }, [userId, dispatch]);
  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, []);
  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);
  return { socket: socketRef.current, connect, disconnect };
};
export {
  useSocket
};
