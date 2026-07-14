"use client";

import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  registerSchema,
  RegisterFormData,
} from "./registerSchema";

import { registerUser } from "@/store/authThunk";

import {
  AppDispatch,
  RootState,
} from "@/store/store";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch =
    useDispatch<AppDispatch>();

  const {
    loading,
    error,
  } = useSelector(
    (state: RootState) =>
      state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver:
      zodResolver(registerSchema),
  });

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    const result = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(result)) {
      alert(
        "Registration Successful"
      );
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center m-2.5">
      <div className="w-full max-w-md p-6 shadow-lg border rounded-xl">
        <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Input
            label="Name"
            placeholder="Enter Name"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="Email"
            placeholder="Enter Email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter Password"
            error={
              errors.password?.message
            }
            {...register("password")}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>

          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600 my-1.5">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}