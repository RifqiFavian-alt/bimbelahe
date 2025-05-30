import Image from "next/image";
import React from "react";
import { IoLocation } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { FaClock, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";

function Footer() {
  return (
    <div className="footer__container relative bottom-0 bg-[url('/assets/footer.webp')] overflow-hidden flex flex-col gap-y-10 lg:gap-y-20 bg-cover w-full h-[full] px-8 py-10 md:px-24 justify-end md:h-[600px] md:w-screen lg:h-[550px]">
      <Image src={"/ahe-logo.webp"} alt="ahe-logo" width={100} height={50} priority className="" />
      <div className="flex lg:justify-around gap-5 text-sm md:text-base flex-wrap lg:flex-nowrap">
        <div id="Tentang" className="about_us flex flex-col text-[#433878] gap-y-5 basis-2/3 lg:basis-1/3">
          <span className="font-bold  ">Tentang Kami</span>
          <span>Bimbel AHE Tambun menyediakan bimbingan belajar menyenangkan dan berkualitas.</span>
          <span>
            <IoLocation className="inline text-xl" />
            Jl. Pendidikan II, RT.003/002 No.12, Tambun Selatan, Kab. Bekasi, Jawa Barat.
          </span>
        </div>
        <div className="operational_hours flex flex-col text-[#433878] gap-y-5 basis-1/3 items-start lg:items-center">
          <span className="font-bold ">Jam Operasional</span>
          <div className="operational_hours__content flex flex-col gap-y-2">
            <span className="flex items-center gap-x-2">
              Senin <GoDotFill className="text-xl" /> Rabu <GoDotFill className="text-xl" /> Jumat
            </span>
            <span className="flex items-center gap-x-2">
              <FaClock className="text-lg" /> 08.00 - 17.00 WIB
            </span>
          </div>
        </div>
        <div id="Kontak" className="contact flex flex-col text-[#433878] gap-y-5 basis-1/3 items-start lg:items-center">
          <span className="font-bold scroll-mt-20">Kontak</span>
          <div className="contact__content flex flex-col gap-y-2">
            <span className="flex items-center gap-x-2">
              <FaPhone className="text-lg" /> +62-812-9446-8507
            </span>
            <span className="flex items-center gap-x-2">
              <MdEmail className="text-xl" /> example@gmail.com
            </span>
            <div className="contact__content__social flex gap-x-2 items-center">
              <BsFacebook className="text-3xl" /> <AiFillInstagram className="text-4xl" />
            </div>
          </div>
        </div>
      </div>
      <span className="text-sm text-center text-[#433878]">Copyright 2025 by Anak Hebat Tambun</span>
    </div>
  );
}

export { Footer };
