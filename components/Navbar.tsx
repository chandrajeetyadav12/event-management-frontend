"use client";


import { logoutUser } from "@/store/authThunk";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(
    (state: RootState) =>
      state.auth.user
  );
  const router = useRouter();
  const handleLogout = async () => {
  const result = await dispatch(logoutUser());

  if (logoutUser.fulfilled.match(result)) {
    Cookies.remove("token");
    alert("Logout Successful");
    router.push("/login");
  }
};
  return (
    <nav className="bg-black text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="font-bold text-xl"
        >
          EventBooking
        </Link>

        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/events">
            Events
          </Link>
          {/* Before Login */}
          {!user && (
            <>
              <Link href="/login">
                Login
              </Link>

              <Link href="/register">
                Register
              </Link>
            </>
          )}
                    {/* After Login */}
          {user && (
            <>
              <Link href="/bookings">
                My Bookings
              </Link>

              {user.role === "admin" && (
                <Link href="/events/create">
                  Create Event
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="ml-2"
              >
                Logout
              </button>
            </>
          )}
          {/* <Link href="/login">
            Login
          </Link>

          <Link href="/register">
            Register
          </Link>
          <button onClick={handleLogout}>
            Logout
          </button> */}
          {/* {user?.role === "admin" && (
            <Link href="/events/create">
              Create Event
            </Link>
          )} */}
        </div>
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col gap-3 px-6 pb-4">
          <Link href="/events">Events</Link>

          {!user && (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}

          {user && (
            <>
              <Link href="/bookings">
                My Bookings
              </Link>

              {user.role === "admin" && (
                <Link href="/events/create">
                  Create Event
                </Link>
              )}

              <button onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}