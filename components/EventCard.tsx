import Link from "next/link";

interface Props {
  event: any;
}

export default function EventCard({
  event,
}: Props) {
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
    </div>
  );
}