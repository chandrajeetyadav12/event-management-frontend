"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  getProfile,
  updateProfile,
} from "@/store/authThunk";
import Input from "@/components/Input";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function EditProfilePage() {
    const router = useRouter();
  const dispatch =
    useDispatch<AppDispatch>();

  const { user, loading } =
    useSelector(
      (state: RootState) =>
        state.auth
    );
useEffect(() => {
  const token =
    Cookies.get("token");

  console.log(
    "COOKIE TOKEN:",
    token
  );

  if (token) {
    dispatch(getProfile(token));
  }
}, [dispatch]);
//   const token =
//     useSelector(
//       (state: RootState) =>
//         state.auth.token
//     );

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

//   useEffect(() => {
//     if (token) {
//       dispatch(getProfile(token));
//     }
//   }, [dispatch, token]);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, reset]);
// useEffect(() => {
//   console.log("User changed:", user);
// }, [user]);
const onSubmit = (data: any) => {
  const token = Cookies.get("token");
  if (!token) return;

  dispatch(
    updateProfile({
      data,
      token,
    })
  ).unwrap();
  router.push("/profile");
};



  return (
    <div className="container py-5">
      <div className="max-w-xl mx-auto bg-white shadow rounded p-4">
        <h2 className="text-2xl font-bold mb-4">
          Edit Profile
        </h2>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >
          <Input
            label="Name"
            {...register("name")}
          />

          <Input
            label="Email"
            type="email"
            {...register("email")}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded"
          >
            {loading
              ? "Updating..."
              : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}