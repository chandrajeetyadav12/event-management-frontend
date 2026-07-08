"use client";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { AppDispatch, RootState } from "@/store/store";
import { forgotPassword } from "@/store/authThunk";

interface FormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    loading,
    error,
    success,
  } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    register,
    handleSubmit,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    dispatch(
      forgotPassword(data.email)
    );
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md border p-6 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6">
          Forgot Password
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Enter Email"
            {...register("email")}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>

        {success && (
          <p className="text-green-600 mt-4">
            {success}
          </p>
        )}

        {error && (
          <p className="text-red-500 mt-4">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}