"use client";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const createStudentFormScheme = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Kolom nama wajib diisi." }),
  email: z.string().min(1, { message: "Kolom email wajib diisi." }).email("Struktur email tidak valid."),
  phone: z.string().min(1, { message: "Kolom no telepon wajib diisi." }),
  startMonth: z.number().min(1, { message: "Bulan mulai harus valid (1-12)." }),
});
type createStudentFormScheme = z.infer<typeof createStudentFormScheme>;

function StudentEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createStudentFormScheme>({
    resolver: zodResolver(createStudentFormScheme),
  });

  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getStudent() {
      try {
        const { data } = await api.get(`/api/students/read?studentId=${id}`);
        const fetchedStudent = data.data.students[0];
        if (!data.success) throw new Error(data.message);

        reset({
          id: fetchedStudent.id,
          name: fetchedStudent.name,
          email: fetchedStudent.email,
          phone: fetchedStudent.phone,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
        }
      }
    }
    getStudent();
  }, [id, reset]);

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/api/students/update`, values);
      if (!data.success) throw new Error(data.message);

      toast.success("Siswa berhasil diubah", {
        style: { borderRadius: "50px", zIndex: 100, marginTop: "15px" },
      });
      router.push("/dashboard/student");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.", {
          style: { borderRadius: "50px", zIndex: 100, marginTop: "15px" },
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
          <span className="text-[#433878] text-base font-semibold">Edit</span>
          <span className="text-[#433878] text-2xl font-bold">Siswa</span>
        </div>
        <button className="px-2 py-2 rounded-xl text-xl bg-[#7E60BF] text-white" onClick={() => router.push("/dashboard/student")}>
          <IoArrowBack />
        </button>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-y-10">
        <div className="flex flex-wrap gap-4 w-3/4">
          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 w-fit rounded-xl py-2 px-4">
            <label className="text-[#7E60BF] text-xs">Nama</label>
            <input {...register("name")} className="bg-transparent outline-none font-bold text-sm text-[#7E60BF]" type="text" />
            {errors.name?.message && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 w-fit rounded-xl py-2 px-4">
            <label className="text-[#7E60BF] text-xs">Email</label>
            <input {...register("email")} className="bg-transparent outline-none font-bold text-sm text-[#7E60BF]" type="email" />
            {errors.email?.message && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 md:min-w-96 flex-auto md:flex-initial rounded-xl py-2 px-4">
            <label className="text-[#7E60BF] text-xs">No Telepon</label>
            <input {...register("phone")} className="bg-transparent outline-none font-bold text-sm text-[#7E60BF]" type="text" />
            {errors.phone?.message && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>

        <div className="button-submit__section flex gap-x-3">
          <button type="submit" disabled={loading} className="px-4 py-2 w-24 cursor-pointer self-start rounded-md bg-[#7E60BF] text-white">
            Simpan
          </button>
          <button className="px-4 py-2 self-start w-24 rounded-md bg-[#E6E0F3] text-[#433878]" onClick={() => router.push("/dashboard/student")}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentEdit;
