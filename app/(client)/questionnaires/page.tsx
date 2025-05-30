"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";

function Questionnaires() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    router.push(`/questionnaires/1?name=${name}&email=${email}`);
  };
  return (
    <div className="w-full h-full px-5 md:px-20 lg:px-24 pt-20 pb-40">
      <div>
        <h1 className="text-3xl font-bold text-[#433878]">Kuesioner</h1>
        <p className="text-base text-[#433878]">Tingkatkan layanan kami dengan pendapat anda!</p>
      </div>
      <div className="sm:w-8/12 lg:w-4/12 m-auto text-center flex flex-col gap-y-8 pt-20">
        <div className="flex flex-col gap-y-2">
          <span className="text-3xl font-bold text-[#433878]">Mari Kita Mulai!</span>
          <p className="text-base text-[#433878]">Sebelum Anda mengisi kuesioner, kami memerlukan sedikit informasi untuk mengenal Anda lebih baik.</p>
        </div>
        <form onSubmit={handleSubmit} className="questionnaires__form-input-user flex justify-start flex-col gap-y-2 text-start text-[#433878]">
          <div className="flex flex-col gap-y-2">
            <label className="text-sm flex items-center gap-x-1">
              <IoMdPerson className="text-lg" /> Nama Lengkap
            </label>
            <input type="text" name="name" className="questionnaires__form-input-user__name w-full focus:outline-none text-sm bg-[#F4F1FA] px-4 py-2 rounded-md" />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-sm flex items-center gap-x-1">
              <MdEmail className="text-lg" /> Email Aktif
            </label>
            <input type="email" name="email" className="questionnaires__form-input-user__email w-full focus:outline-none text-sm bg-[#F4F1FA] px-4 py-2 rounded-md" />
          </div>
          <button type="submit" className="questionnaires__form-input-user__submit  focus:outline-none text-sm bg-[#7E60BF] text-white py-2 rounded-sm mt-5 w-60 m-auto">
            Mulai
          </button>
        </form>
      </div>
    </div>
  );
}

export default Questionnaires;
