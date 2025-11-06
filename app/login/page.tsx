"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import axios from "axios";

const loginFormScheme = z.object({
  email: z.string().min(1, { message: "Harap isi kolom ini." }).email("Struktur email tidak valid."),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

type LoginFormScheme = z.infer<typeof loginFormScheme>;

const Login: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<LoginFormScheme>({
    resolver: zodResolver(loginFormScheme),
  });
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const onSubmit = handleSubmit(async (values) => {
    setError(null);
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/login", values);

      if (!data.success) throw new Error(data.message || "Login gagal");
      router.push("/dashboard/student");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        setError(err.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
      } else if (err instanceof Error) {
        setError(err.message);
        console.log(err);
      } else {
        console.log(err);
        setError("Terjadi kesalahan, silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("error") === "SessionExpired") {
        setError("Sesi Anda telah berakhir. Silakan login kembali.");
      }
    }
  }, []);

  return (
    <div className="login_container h-screen flex flex-col justify-center items-center gap-y-10">
      <Image src="/ahe-logo.webp" alt="ahe-logo" width={130} height={74} priority={true} />
      <div className="login_card border flex flex-col justify-center items-center border-[#B2A0DA] w-72 sm:w-2/3 lg:w-1/3 rounded-md py-10 sm:py-16">
        <span className="text-xl sm:text-2xl font-bold text-[#433878] text-center">Selamat Datang Kembali!</span>
        <p className="text-xs sm:text-sm w-2/3 text-[#433878] text-center">Silakan masukkan informasi akun Anda untuk melanjutkan.</p>

        <form onSubmit={onSubmit} className="login_form flex flex-col gap-y-5 mt-14 w-3/4 sm:w-2/3">
          <div className="email_form">
            <label htmlFor="email" className="text-[#433878] flex items-center gap-x-1">
              <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.75 16.5C2.2 16.5 1.72933 16.3043 1.338 15.913C0.946667 15.5217 0.750667 15.0507 0.75 14.5V2.5C0.75 1.95 0.946 1.47933 1.338 1.088C1.73 0.696666 2.20067 0.500667 2.75 0.5H18.75C19.3 0.5 19.771 0.696 20.163 1.088C20.555 1.48 20.7507 1.95067 20.75 2.5V14.5C20.75 15.05 20.5543 15.521 20.163 15.913C19.7717 16.305 19.3007 16.5007 18.75 16.5H2.75ZM10.75 9.5L18.75 4.5V2.5L10.75 7.5L2.75 2.5V4.5L10.75 9.5Z"
                  fill="#433878"
                />
              </svg>
              Email
            </label>
            <input type="text" placeholder="Email" required {...register("email")} className="w-full p-2 text-[#433878] mt-2 rounded-md placeholder:text-sm focus:outline-none" />
            {formState.errors?.email && <p className="text-red-500 text-xs">{formState.errors.email.message}</p>}
          </div>

          <div className="password_form">
            <label htmlFor="password" className="text-[#433878] flex items-center gap-x-0">
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.75 22C6.2 22 5.72933 21.8043 5.338 21.413C4.94667 21.0217 4.75067 20.5507 4.75 20V10C4.75 9.45 4.946 8.97933 5.338 8.588C5.73 8.19667 6.20067 8.00067 6.75 8H7.75V6C7.75 4.61667 8.23767 3.43767 9.213 2.463C10.1883 1.48833 11.3673 1.00067 12.75 1C14.1327 0.999334 15.312 1.487 16.288 2.463C17.264 3.439 17.7513 4.618 17.75 6V8H18.75C19.3 8 19.771 8.196 20.163 8.588C20.555 8.98 20.7507 9.45067 20.75 10V20C20.75 20.55 20.5543 21.021 20.163 21.413C19.7717 21.805 19.3007 22.0007 18.75 22H6.75ZM12.75 17C13.3 17 13.771 16.8043 14.163 16.413C14.555 16.0217 14.7507 15.5507 14.75 15C14.7493 14.4493 14.5537 13.9787 14.163 13.588C13.7723 13.1973 13.3013 13.0013 12.75 13C12.1987 12.9987 11.728 13.1947 11.338 13.588C10.948 13.9813 10.752 14.452 10.75 15C10.748 15.548 10.944 16.019 11.338 16.413C11.732 16.807 12.2027 17.0027 12.75 17ZM9.75 8H15.75V6C15.75 5.16667 15.4583 4.45833 14.875 3.875C14.2917 3.29167 13.5833 3 12.75 3C11.9167 3 11.2083 3.29167 10.625 3.875C10.0417 4.45833 9.75 5.16667 9.75 6V8Z"
                  fill="#433878"
                />
              </svg>
              Password
            </label>
            <input type="password" placeholder="Password" {...register("password")} required className="w-full text-[#433878] p-2 mt-2 rounded-md placeholder:text-sm focus:outline-none" />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button type="submit" disabled={loading} className={`form_button w-full h-12 rounded-md text-white ${loading ? "bg-[#D7D4E7]" : "bg-[#7E60BF]"}`}>
            {loading ? "Loading..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
