"use client";

import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import EventCard from "@/components/EventCard";

import {
  fetchEvents,
} from "@/store/eventThunk";

import {
  AppDispatch,
  RootState,
} from "@/store/store";

export default function EventsPage() {
  const dispatch =
    useDispatch<AppDispatch>();

  const {
    events,
    loading,
  } = useSelector(
    (state: RootState) =>
      state.events
  );

  useEffect(() => {
    dispatch(
      fetchEvents()
    );
  }, [dispatch]);

  if (loading) {
    return (
      <h1>
        Loading Events...
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">
        Events
      </h1>

      <div className="grid md:grid-cols-3 gap-5">
        {events.map(
          (event) => (
            <EventCard
              key={
                event._id
              }
              event={event}
            />
          )
        )}
      </div>
    </div>
  );
}