"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchEventById,
  updateEvent,
} from "@/store/eventThunk";

import {
  AppDispatch,
  RootState,
} from "@/store/store";

export default function EditEventPage() {
  const params = useParams();

  const router = useRouter();

  const dispatch =
    useDispatch<AppDispatch>();

  const token = useSelector(
    (state: RootState) =>
      state.auth.token
  );

  const {
    selectedEvent,
  } = useSelector(
    (state: RootState) =>
      state.events
  );

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  useEffect(() => {
    dispatch(
      fetchEventById(
        params.id as string
      )
    );
  }, [dispatch, params.id]);

  useEffect(() => {
    if (selectedEvent) {
      setTitle(
        selectedEvent.title
      );

      setDescription(
        selectedEvent.description
      );
    }
  }, [selectedEvent]);

  const handleSubmit =
    async () => {
      const result =
        await dispatch(
          updateEvent({
            id:
              params.id as string,
            token:
              token as string,
            eventData: {
              title,
              description,
            },
          })
        );

      if (
        updateEvent.fulfilled.match(
          result
        )
      ) {
        alert(
          "Event Updated"
        );

        router.push(
          "/events"
        );
      }
    };

  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">
        Edit Event
      </h1>

      <input
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
        placeholder="Title"
        className="border p-2 w-full mb-3"
      />

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        placeholder="Description"
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={
          handleSubmit
        }
        className="bg-black text-white px-4 py-2"
      >
        Update Event
      </button>
    </div>
  );
}