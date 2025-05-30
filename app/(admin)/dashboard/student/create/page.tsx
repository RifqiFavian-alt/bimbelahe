"use client";

import { Select } from "@/components/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";

const months = [
  {
    label: "Januari",
    value: "1",
  },
  {
    label: "Februari",
    value: "2",
  },
  {
    label: "Maret",
    value: "3",
  },
  {
    label: "April",
    value: "4",
  },
  {
    label: "Mei",
    value: "5",
  },
  {
    label: "Juni",
    value: "6",
  },
  {
    label: "Juli",
    value: "7",
  },
  {
    label: "Agustus",
    value: "8",
  },
  {
    label: "September",
    value: "9",
  },
  {
    label: "Oktober",
    value: "10",
  },
  {
    label: "November",
    value: "11",
  },
  {
    label: "Desember",
    value: "12",
  },
];
const createStudentFormScheme = z.object({
  name: z.string().min(1, { message: "Kolom nama wajib diisi." }),
  email: z.string().min(1, { message: "Kolom email wajib diisi." }).email("Struktur email tidak valid."),
  phone: z.string().min(1, { message: "Kolom no telepon wajib diisi." }),
  startMonth: z.number().min(1, { message: "Bulan mulai harus valid (1-12)." }),
});
type userFormScheme = z.infer<typeof createStudentFormScheme>;

function StudentCreate() {
  const { register, handleSubmit, control, formState } = useForm<userFormScheme>({
    resolver: zodResolver(createStudentFormScheme),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const error = formState.errors;

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/students/create", values);
      if (!data.success) throw new Error(data.message);
      toast.success("Siswa berhasil dibuat", {
        style: {
          borderRadius: "50px",
          zIndex: 100,
          marginTop: "15px",
        },
      });
      router.push("/dashboard/student");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.", {
          style: {
            borderRadius: "50px",
            zIndex: 100,
            marginTop: "15px",
          },
        });
      }
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-[#433878] text-base font-semibold">Tambah</span>
          <span className="text-[#433878] text-2xl font-bold">Siswa</span>
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
            {error.name?.message && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {error.name.message}
              </span>
            )}
          </div>

          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 w-fit rounded-xl py-2 px-4">
            <label className="text-[#7E60BF] text-xs">Email</label>
            <input {...register("email")} className="bg-transparent outline-none font-bold text-sm text-[#7E60BF]" type="email" />
            {error.email?.message && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {error.email.message}
              </span>
            )}
          </div>

          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 md:min-w-96 flex-auto md:flex-initial rounded-xl py-2 px-4">
            <label className="text-[#7E60BF] text-xs">No Telepon</label>
            <input {...register("phone")} className="bg-transparent outline-none font-bold text-sm text-[#7E60BF]" type="text" />
            {error.phone?.message && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {error.phone.message}
              </span>
            )}
          </div>

          <Controller
            name="startMonth"
            control={control}
            render={({ field }) => <Select value={field.value} onChange={field.onChange} error={error.startMonth?.message} options={months} placeholder="Bulan" />}
          />
        </div>

        <div className="button-submit__section flex gap-x-3">
          <button type="submit" disabled={loading} className="px-4 py-2 w-24 cursor-pointer self-start rounded-md bg-[#7E60BF] text-white">
            Tambah
          </button>
          <button className="px-4 py-2 self-start w-24 rounded-md bg-[#E6E0F3] text-[#433878]" onClick={() => router.push("/dashboard/user")}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentCreate;
