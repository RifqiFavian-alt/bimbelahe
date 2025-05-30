"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Select } from "@/components/select";
import { IoArrowBack } from "react-icons/io5";
import { FaExclamationCircle } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api";
import axios from "axios";

const createUserFormScheme = z.object({
  id: z.string(),
  currentEmail: z.string(),
  name: z.string().min(1, { message: "Kolom nama wajib diisi." }),
  email: z.string().min(1, { message: "Kolom email wajib diisi." }).email("Struktur email tidak valid."),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
  role: z.enum(["ADMIN", "USER"], { message: "Role harus berupa ADMIN atau USER" }),
});

type userFormScheme = z.infer<typeof createUserFormScheme>;

const roles = [
  { label: "Admin", value: "ADMIN" },
  { label: "User", value: "USER" },
];

function UserEdit() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<userFormScheme>({
    resolver: zodResolver(createUserFormScheme),
  });

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await api.get(`/api/users/read?id=${id}`);
        const fetchedUser = data.data.users[0];
        if (!data.success) throw new Error(data.message);

        reset({
          id: fetchedUser.id,
          name: fetchedUser.name,
          email: fetchedUser.email,
          currentEmail: fetchedUser.email,
          password: "",
          role: fetchedUser.role as "USER" | "ADMIN",
        });
      } catch (error) {
        if (axios.isAxiosError(error)) console.error(error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
      }
    }
    getUser();
  }, [id, reset]);

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/api/users/update`, values);
      if (!data.success) {
        throw new Error(data.message);
      }
      toast.success("Pengguna berhasil diubah", {
        style: { borderRadius: "50px", zIndex: 100, marginTop: "15px" },
      });
      router.push("/dashboard/user");
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

          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 md:min-w-96 flex-auto md:flex-initial rounded-xl py-2 px-4">
            <label className="text-[#7E60BF] text-xs">Password</label>
            <input {...register("password")} className="bg-transparent outline-none font-bold text-sm text-[#7E60BF]" type="password" />
            {errors.password && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {errors.password.message}
              </span>
            )}
          </div>

          <Controller name="role" control={control} render={({ field }) => <Select value={field.value} onChange={field.onChange} error={errors.role?.message} options={roles} placeholder="Role" />} />
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

export default UserEdit;
