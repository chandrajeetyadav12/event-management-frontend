"use client";

import { useEffect, useState } from "react";

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

import { useDebounce } from "@/hooks/useDebounce";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";

export default function EventsPage() {
  const dispatch =
    useDispatch<AppDispatch>();

  const [searchInput, setSearchInput] =
    useState("");

  const debouncedSearch =
    useDebounce(searchInput, 1000);

  const {
    events,
    loading,
  } = useSelector(
    (state: RootState) =>
      state.events
  );

  const delayedLoading =
    useDelayedLoading(loading, 3000);

  useEffect(() => {

    dispatch(
  fetchEvents({
    search: debouncedSearch,
  })
);
  }, [dispatch, debouncedSearch]);

  if (delayedLoading) {
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

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search events by title..."
          value={searchInput}
          onChange={(e) =>
            setSearchInput(e.target.value)
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">
          No events found
        </p>
      ) : (
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
      )}
    </div>
  );
}