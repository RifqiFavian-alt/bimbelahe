"use client";
import React from "react";
import { useRouter } from "next/navigation";

function FinishQuestionnaires() {
  const router = useRouter();
  return (
    <div className="w-full h-full px-5 md:px-20 lg:px-24 pt-20 pb-40">
      <div>
        <h1 className="text-3xl font-bold text-[#433878]">Kuesioner</h1>
        <p className="text-base text-[#433878]">Tingkatkan layanan kami dengan pendapat anda!</p>
      </div>
      <div className="mt-10 flex flex-col w-full lg:w-6/12 mx-auto py-16 border-b-2 border-[#B2A0DA] text-center gap-y-3">
        <span className="text-3xl font-bold text-[#433878]">Terima Kasih!</span>
        <p className="text-base text-[#433878]">Terima kasih telah membantu kami menjadi lebih baik untuk Anda. Bersama kita ciptakan pengalaman belajar yang luar biasa!</p>
        <button type="submit" className="questionnaires__form-input-user__submit focus:outline-none text-sm bg-[#7E60BF] text-white py-2 rounded-sm mt-5 w-60 m-auto" onClick={() => router.push("/")}>
          Kembali
        </button>
      </div>
    </div>
  );
}

export default FinishQuestionnaires;
