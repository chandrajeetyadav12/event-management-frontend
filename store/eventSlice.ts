import {
  createSlice,
} from "@reduxjs/toolkit";

import {
  fetchEventById,
  fetchEvents,
  createNewEvent,
  updateEvent,
  deleteEvent
} from "./eventThunk";


interface EventState {
  events: any[];
  loading: boolean;
  error: string | null;
  selectedEvent: any;
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
  selectedEvent: null,
};

const eventSlice =
  createSlice({
    name: "events",
    initialState,
    reducers: {
      seatUpdated: (state, action) => {
        const { eventId, availableSeats } = action.payload;
        state.events = state.events.map((e: any) =>
          e._id?.toString() === eventId?.toString()
            ? { ...e, availableSeats }
            : e
        );

        if (state.selectedEvent && state.selectedEvent._id?.toString() === eventId?.toString()) {
          state.selectedEvent = { ...state.selectedEvent, availableSeats };
        }
      },
    },

    extraReducers: (
      builder
    ) => {
      builder

        .addCase(
          fetchEvents.pending,
          (state) => {
            state.loading =
              true;
          }
        )

        .addCase(
          fetchEvents.fulfilled,
          (
            state,
            action
          ) => {
            state.loading =
              false;

            state.events =
              action.payload.data;
          }
        )

        .addCase(
          fetchEvents.rejected,
          (
            state,
            action
          ) => {
            state.loading =
              false;

            state.error =
              action.payload as string;
          }
        )
        .addCase(
          fetchEventById.pending,
          (state) => {
            state.loading = true;
          }
        )

        .addCase(
          fetchEventById.fulfilled,
          (state, action) => {
            state.loading = false;

            state.selectedEvent =
              action.payload.data;
          }
        )

        .addCase(
          fetchEventById.rejected,
          (state, action) => {
            state.loading = false;

            state.error =
              action.payload as string;
          }
        )
        .addCase(
          createNewEvent.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          createNewEvent.fulfilled,
          (state, action) => {
            state.loading = false;

            state.events.push(
              action.payload.data
            );
          }
        )

        .addCase(
          createNewEvent.rejected,
          (state, action) => {
            state.loading = false;

            state.error =
              action.payload as string;
          }
        )
        .addCase(
  updateEvent.pending,
  (state) => {
    state.loading = true;
  }
)

.addCase(
  updateEvent.fulfilled,
  (state, action) => {
    state.loading = false;

    state.events = state.events.map(
      (event) =>
        event._id ===
        action.payload.data._id
          ? action.payload.data
          : event
    );

    state.selectedEvent =
      action.payload.data;
  }
)

.addCase(
  updateEvent.rejected,
  (state, action) => {
    state.loading = false;

    state.error =
      action.payload as string;
  }
)

.addCase(
  deleteEvent.pending,
  (state) => {
    state.loading = true;
  }
)

.addCase(
  deleteEvent.fulfilled,
  (state, action) => {
    state.loading = false;

    state.events =
      state.events.filter(
        (event) =>
          event._id !== action.payload.id
      );
  }
)

.addCase(
  deleteEvent.rejected,
  (state, action) => {
    state.loading = false;

    state.error =
      action.payload as string;
  }
)
    },
  });
export const { seatUpdated } = eventSlice.actions;

export default eventSlice.reducer;