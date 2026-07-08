"use client";

import { useParams } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";

import {
  AppDispatch,
  RootState,
} from "@/store/store";

import { resetPassword } from "@/store/authThunk";

interface FormData {
  password: string;
}

export default function ResetPasswordPage() {
  const params = useParams();

  const dispatch =
    useDispatch<AppDispatch>();

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

  const onSubmit = (
    data: FormData
  ) => {
    dispatch(
      resetPassword({
        token:
          params.token as string,
        password:
          data.password,
      })
    );
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md border p-6 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6">
          Reset Password
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <input
            type="password"
            placeholder="New Password"
            {...register(
              "password"
            )}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded"
          >
            {loading
              ? "Updating..."
              : "Update Password"}
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