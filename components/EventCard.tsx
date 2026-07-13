import { deleteEvent } from "@/store/eventThunk";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
interface Props {
  event: any;
}

export default function EventCard({
  event,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(
  (state: RootState) =>
    state.auth.token
);
const user = useSelector(
  (state: RootState) =>
    state.auth.user
);
  const handleDelete = async (
  id: string
) => {
    const confirmed = window.confirm(
    "Are you sure you want to delete this event?"
  );

  if (!confirmed) return;
  const result =
    await dispatch(
      deleteEvent({
        id,
        token:
          token as string,
      })
    );

  if (
    deleteEvent.fulfilled.match(
      result
    )
  ) {
    alert(
      "Event Deleted"
    );
  }
};
  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold">
        {event.title}
      </h2>

      <p>
        {event.description}
      </p>

      <p>
        Venue:
        {event.venue}
      </p>

      <p>
        Seats:
        {event.availableSeats}
      </p>

      <Link
        href={`/events/${event._id}`}
        className="inline-block mt-4 bg-black text-white px-4 py-2 rounded"
      >
        View Details
      </Link>
      {user?.role === "admin" && (
        <div className="mt-3 flex gap-2">
          <Link
            href={`/events/edit/${event._id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </Link>

          <button
            onClick={() =>
              handleDelete(event._id)
            }
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}