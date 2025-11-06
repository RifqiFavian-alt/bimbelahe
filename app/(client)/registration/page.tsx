"use client";

import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaExclamationCircle } from "react-icons/fa";
import { z } from "zod";

const createRegistrationFormScheme = z.object({
  fullname: z.string().min(1, { message: "Kolom nama wajib diisi." }),
  callname: z.string().min(1, { message: "Kolom nama panggilan wajib diisi." }),
  birthday: z.string().min(1, { message: "Kolom tanggal lahir wajib diisi." }),
  parentmom: z.string().min(1, { message: "Kolom nama ayah wajib diisi." }),
  parentdad: z.string().min(1, { message: "Kolom nama ibu wajib diisi." }),
  address: z.string().min(1, { message: "Kolom alamat wajib diisi." }),
  phone: z.string().min(1, { message: "Kolom no telepon wajib diisi." }),
  info: z.string().min(1, { message: "Kolom informasi wajib diisi." }),
});

type registrationFormScheme = z.infer<typeof createRegistrationFormScheme>;

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registrationFormScheme>({
    resolver: zodResolver(createRegistrationFormScheme),
  });
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const onSubmit = handleSubmit(async (values) => {
    setIsGenerating(true);
    try {
      const { data } = await api.post(
        "/api/registration",
        { ...values },
        {
          responseType: "arraybuffer",
          headers: { "Content-Type": "application/json" },
        }
      );

      const blob = new Blob([data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setPdfUrl(url);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.";

        toast.error(errorMessage, {
          style: { borderRadius: "50px", zIndex: 100, marginTop: "15px" },
        });
      } else {
        toast.error("Terjadi kesalahan tidak terduga");
      }
    } finally {
      setIsGenerating(false);
    }
  });

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  return (
    <div className="w-full h-full px-5 md:px-20 lg:px-24 pt-20 pb-40">
      <div className="w-10/12 md:w-8/12 lg:w-5/12">
        <h1 className="text-3xl font-bold text-[#433878]">Daftar</h1>
        <p className="text-base text-[#433878]">Bergabunglah dengan Bimbingan Belajar AHE dan tingkatkan kemampuan belajar Anda bersama kami. Proses pendaftaran cepat dan praktis!</p>
      </div>
      <div className="flex mt-10 items-center gap-x-3">
        <div className="min-w-8 h-8 text-[#433878] font-bold rounded-full bg-[#D7D4E7] flex justify-center items-center">1</div>
        <p className="text-base text-[#433878]">Yuk, isi formulir pendaftarannya di bawah ini, lalu klik tombol Daftar ya!</p>
      </div>
      <form onSubmit={onSubmit} className="registration__form text-[#433878] pt-10 w-11/12 m-auto">
        <div className="flex flex-wrap justify-start gap-4 text-start">
          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 rounded-xl py-2 px-4 w-4/12">
            <label className="text-[#7E60BF] text-xs">Nama Lengkap</label>
            <input {...register("fullname")} placeholder="cth: Arana Ruri" className="bg-transparent outline-none font-bold text-sm text-[#7E60BF]" type="text" />
            {errors.fullname && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {errors.fullname.message}
              </span>
            )}
          </div>
          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 w-fit rounded-xl py-2 px-4">
            <label className="text-[#7E60BF] text-xs">Nama Panggilan</label>
            <input {...register("callname")} placeholder="cth: Ruri" className="bg-transparent outline-none font-bold text-sm text-[#7E60BF]" type="text" />
            {errors.callname && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {errors.callname.message}
              </span>
            )}
          </div>
          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 rounded-xl py-2 px-4 w-3/12">
            <label className="text-[#7E60BF] text-xs">Tempat & Tanggal Lahir</label>
            <input {...register("birthday")} placeholder="cth: Jakarta, 01 Januari 2000" className="bg-transparent outline-none font-bold text-sm text-[#7E60BF]" type="text" />
            {errors.birthday && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {errors.birthday.message}
              </span>
            )}
          </div>
          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 rounded-xl py-2 px-4 w-3/12">
            <label className="text-[#7E60BF] text-xs">Nama Ibu</label>
            <input {...register("parentmom")} placeholder="cth: Arana" className="bg-transparent outline-none font-bold text-sm text-[#7E60BF]" type="text" />
            {errors.parentmom && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {errors.parentmom.message}
              </span>
            )}
          </div>
          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 rounded-xl py-2 px-4 w-3/12">
            <label className="text-[#7E60BF] text-xs">Nama Ayah</label>
            <input {...register("parentdad")} placeholder="cth: Yuka" className="bg-transparent outline-none font-bold text-sm text-[#7E60BF]" type="text" />
            {errors.parentdad && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {errors.parentdad.message}
              </span>
            )}
          </div>
          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 rounded-xl py-2 px-4 w-8/12 ">
            <label className="text-[#7E60BF] text-xs">Alamat</label>
            <textarea {...register("address")} placeholder="cth: Jl. Kebon Jeruk, Jakarta" className="bg-transparent outline-none font-bold text-sm text-[#7E60BF] h-[40px]" />
            {errors.address && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {errors.address.message}
              </span>
            )}
          </div>
          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 rounded-xl py-2 px-4 w-4/12">
            <label className="text-[#7E60BF] text-xs">Nomor Telepon</label>
            <input {...register("phone")} placeholder="cth: 08123456789" className="bg-transparent outline-none font-bold text-sm text-[#7E60BF]" type="text" />
            {errors.phone && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {errors.phone.message}
              </span>
            )}
          </div>
          <div className="bg-[#E6E0F3] flex flex-col gap-y-1 rounded-xl py-2 px-4 w-3/12">
            <label className="text-[#7E60BF] text-xs">Sumber Info Les</label>
            <input {...register("info")} placeholder="cth: Instagram" className="bg-transparent outline-none font-bold text-sm text-[#7E60BF]" type="text" />
            {errors.info && (
              <span className="text-red-500 text-xs flex gap-x-1 items-center">
                <FaExclamationCircle />
                {errors.info.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className={`w-fit px-5 py-3 mt-10 rounded-sm transition flex justify-center items-center ${isGenerating ? "bg-[#D7D4E7] cursor-not-allowed" : "bg-[#7E60BF] text-white"}`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </>
          ) : (
            "Daftar"
          )}
        </button>
      </form>

      {pdfUrl && (
        <>
          <div className="flex mt-10 items-center gap-x-3">
            <div className="min-w-8 h-8 text-[#433878] font-bold rounded-full bg-[#D7D4E7] flex justify-center items-center">2</div>
            <p className="text-base text-[#433878]">Setelah itu, cek lagi data yang kamu isi—pastikan sudah benar~ Kalau sudah oke, tinggal klik tombol Download aja.</p>
          </div>
          <div className="mt-10 w-11/12 m-auto">
            <iframe src={`${pdfUrl}#toolbar=0`} className="min-w-fit h-[422px] border rounded shadow-md" title="Preview PDF" />
            <div className="pdf-button flex gap-x-4">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="w-fit px-5 py-3 mt-10 rounded-sm bg-[#D7D4E7] text-[#433878]">
                Lihat Formulir
              </a>
              <a href={pdfUrl} download="form-terisi.pdf" className="w-fit px-5 py-3 mt-10 rounded-sm bg-[#7E60BF] text-white">
                Download Formulir
              </a>
            </div>
          </div>
          <div className="flex mt-10 items-center gap-x-3">
            <div className="min-w-8 h-8 text-[#433878] font-bold rounded-full bg-[#D7D4E7] flex justify-center items-center">3</div>
            <p className="text-base text-[#433878]">
              Hore, pendaftaranmu sudah selesai! 🎉 Jangan lupa ya: Print formulirnya, Tanda tangan di tempat yang diminta, Datang ke tempat les sesuai alamat yang tertera. Dan bawa juga dokumen yang
              diperlukan: Akta Kelahiran atau Surat Keterangan Lahir, Lem, kertas origami, dan buku gambar (khusus untuk anak usia TK/PAUD)
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Registration;
