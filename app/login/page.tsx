"use client";

import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/Input";

import {
  loginSchema,
  LoginFormData,
} from "./loginSchema";

import { loginUser } from "@/store/authThunk";

import {
  AppDispatch,
  RootState,
} from "@/store/store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const dispatch =
    useDispatch<AppDispatch>();

  const {
    loading,
    error,
    success
  } = useSelector(
    (state: RootState) =>
      state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver:
      zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    const result = await dispatch(loginUser(data));
        if (loginUser.fulfilled.match(result)) {
          alert("Login Successful");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
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
              ? "Logging In..."
              : "Login"}
          </button>
          {success && (
            <p className="text-green-500 text-sm">
              {success}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}