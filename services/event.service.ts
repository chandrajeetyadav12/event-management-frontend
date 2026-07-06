import api from "./api";

export const getAllEvents = async () => {
  const response = await api.get("/events");

  return response.data;
};

export const getSingleEvent = async (
  id: string
) => {
  const response = await api.get(
    `/events/${id}`
  );

  return response.data;
};

export const createEvent = async (
  data: any,
  token: string
) => {
  const response = await api.post(
    "/events",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};