import api from "./api";

export const createBooking =
  async (
    eventId: string,
    seats: number,
    token: string
  ) => {
    const response =
      await api.post(
        "/bookings",
        {
          eventId,
          seats,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };
  export const getMyBookings = async (
  token: string
) => {
  const response = await api.get(
    "/bookings/my-bookings",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};