"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoArrowBack } from "react-icons/io5";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaExclamationCircle } from "react-icons/fa";
import { api } from "@/lib/api";
import axios from "axios";
import toast from "react-hot-toast";

const createReviewFormScheme = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Kolom nama wajib diisi." }),
  email: z.string().min(1, { message: "Kolom email wajib diisi." }).email("Struktur email tidak valid."),
  review: z.string().min(1, { message: "Kolom review wajib diisi." }),
});
type reviewFormScheme = z.infer<typeof createReviewFormScheme>;

function ReviewEdit() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<reviewFormScheme>({
    resolver: zodResolver(createReviewFormScheme),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const { data } = await api.put("/api/questionnaires/update-detail", values);
      if (!data.success) throw new Error(data.message);
      toast.success("Review berhasil diubah", {
        style: { borderRadius: "50px", zIndex: 100, marginTop: "15px" },
      });
      router.push("/dashboard/review");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.", {
          style: { borderRadius: "50px", zIndex: 100, marginTop: "15px" },
        });
      }
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    const getReview = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/questionnaires/read?id=${id}`);
        const fetchedReview = data.data.questionnaires[0];
        if (!data.success) throw new Error(data.message);

        reset({
          id: fetchedReview.id,
          name: fetchedReview.name,
          email: fetchedReview.email,
          review: fetchedReview.review,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) console.error(error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    getReview();
  }, [id, reset]);

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-[#433878] text-base font-semibold">Edit</span>
          <span className="text-[#433878] text-2xl font-bold"> Pengguna</span>
        </div>
        <button className="px-2 py-2 rounded-xl text-xl bg-[#7E60BF] text-white" onClick={() => router.push("/dashboard/user")}>
          <IoArrowBack />
        </button>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-y-10">
        <div className="flex flex-wrap gap-4 w-3/4">
          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 w-fit rounded-xl py-2 px-4">
            <label className="text-[#7E60BF] text-xs">Nama</label>
            <input {...register("name")} className="bg-transparent outline-none font-bold text-sm text-[#7E60BF]" type="text" />
            {errors.name && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 w-fit rounded-xl py-2 px-4">
            <label className="text-[#7E60BF] text-xs">Email</label>
            <input {...register("email")} className="bg-transparent outline-none font-bold text-sm text-[#7E60BF]" type="email" />
            {errors.email && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 w-full md:min-w-96 flex-auto md:flex-initial rounded-xl py-2 px-4">
            <label className="text-[#7E60BF] text-xs">Review</label>
            <input {...register("review")} className="bg-transparent outline-none font-bold text-sm text-[#7E60BF]" type="text" />
            {errors.review && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {errors.review.message}
              </span>
            )}
          </div>
        </div>
        <div className="button-submit__section flex gap-x-3">
          <button type="submit" disabled={loading} className="px-4 py-2 w-24 cursor-pointer self-start rounded-md bg-[#7E60BF] text-white">
            Simpan
          </button>
          <button className="px-4 py-2 self-start w-24 rounded-md bg-[#E6E0F3] text-[#433878]" onClick={() => router.push("/dashboard/user")}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewEdit;
