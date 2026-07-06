import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="bg-gray-100 py-24">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold">
            Real Time Event Booking
          </h1>

          <p className="mt-4 text-gray-600">
            Book tickets instantly with
            live seat updates.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/events"
              className="bg-black text-white px-6 py-3 rounded"
            >
              Explore Events
            </Link>

            <Link
              href="/register"
              className="border px-6 py-3 rounded"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}