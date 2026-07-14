"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getProfile } from "@/store/authThunk";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const token = useSelector(
    (state: RootState) => state.auth.token
  );

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
    }
  }, [dispatch, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-xl font-semibold">
          Loading Profile...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center text-4xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold">
                {user?.name}
              </h1>

              <p className="text-gray-300 mt-1">
                {user?.email}
              </p>

              <span className="inline-block mt-3 px-4 py-1 rounded-full bg-white text-black text-sm font-semibold">
                {user?.role}
              </span>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-6">
              Account Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="border rounded-xl p-4">
                <p className="text-gray-500 text-sm">
                  Full Name
                </p>
                <p className="font-semibold text-lg">
                  {user?.name}
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-500 text-sm">
                  Email Address
                </p>
                <p className="font-semibold text-lg break-all">
                  {user?.email}
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-500 text-sm">
                  Role
                </p>
                <p className="font-semibold text-lg capitalize">
                  {user?.role}
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-500 text-sm">
                  Account Status
                </p>
                <p className="font-semibold text-green-600">
                  Active
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90">
                Edit Profile
              </button>

          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}