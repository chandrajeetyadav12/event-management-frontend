"use client";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";

import {
  createNewEvent,
} from "@/store/eventThunk";

import {
  AppDispatch,
  RootState,
} from "@/store/store";

export default function CreateEventPage() {
  const dispatch =
    useDispatch<AppDispatch>();

  const router =
    useRouter();

  const token =
    useSelector(
      (state: RootState) =>
        state.auth.token
    );

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      venue: "",
      date: "",
      totalSeats: 100,
      availableSeats: 100,
      price: 0,
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!token) {
      alert("Login First");
      return;
    }

    const result =
      await dispatch(
        createNewEvent({
          eventData: formData,
          token,
        })
      );

    if (
      createNewEvent.fulfilled.match(
        result
      )
    ) {
      alert(
        "Event Created Successfully"
      );

      router.push("/events");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Create Event
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          name="venue"
          placeholder="Venue"
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          type="date"
          name="date"
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          type="number"
          name="availableSeats"
          placeholder="Available Seats"
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <button
          className="bg-black text-white px-5 py-3 rounded"
        >
          Create Event
        </button>

      </form>

    </div>
  );
}