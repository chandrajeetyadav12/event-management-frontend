import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAllEvents,
  getSingleEvent,
  createEvent
} from "@/services/event.service";

export const fetchEvents =
  createAsyncThunk(
    "events/fetchAll",
    async (_, thunkAPI) => {
      try {
        return await getAllEvents();
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );

export const fetchEventById =
  createAsyncThunk(
    "events/fetchOne",
    async (
      id: string,
      thunkAPI
    ) => {
      try {
        return await getSingleEvent(
          id
        );
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );




export const createNewEvent =
  createAsyncThunk(
    "events/create",
    async (
      data: {
        eventData: any;
        token: string;
      },
      thunkAPI
    ) => {
      try {
        return await createEvent(
          data.eventData,
          data.token
        );
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );