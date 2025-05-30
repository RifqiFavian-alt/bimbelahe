"use client";
import React, { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { Chatbot } from "@/components/chatbot";
import { FaQuoteLeft, FaWhatsapp } from "react-icons/fa6";
import { EmblaCarousel } from "@/components/embla-carousel";
import { EmblaOptionsType } from "embla-carousel";

// Image Assets
import arrow1 from "@/public/assets/arrow1.webp";
import arrow2 from "@/public/assets/arrow2.webp";
import rectangle1 from "@/public/assets/rectangle1.webp";
import rectangle2 from "@/public/assets/rectangle2.webp";
import rectangle3 from "@/public/assets/rectangle3.webp";
import rectangle4 from "@/public/assets/rectangle4.webp";
import rectangle6 from "@/public/assets/rectangle6.webp";
import rectangle5 from "@/public/assets/rectangle5.webp";
import rectangle7 from "@/public/assets/rectangle7.webp";
import heroimage from "@/public/assets/hero_image.webp";
import wave from "@/public/assets/wave.webp";
import alasekolah from "@/public/assets/ala_sekolah_logo.webp";
import prisma from "@/public/assets/prisma_logo.webp";
import brainy from "@/public/assets/brainy_logo.webp";

function Home() {
  const OPTIONS: EmblaOptionsType = {
    skipSnaps: true,
    slidesToScroll: 3,
    breakpoints: {
      "(min-width: 0px)": {
        slidesToScroll: 1,
      },
      "(min-width: 768px)": {
        slidesToScroll: 2,
      },
      "(min-width: 1024px)": {
        slidesToScroll: 3,
      },
    },
  };
  const SLIDES = [
    {
      name: "Rifqi Favian H",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      name: "John Doe",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      name: "Jane Doe",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      name: "Rifqi Favian H",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      name: "John Doe",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      name: "Jane Doe",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
  ];
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <div className="w-full h-full px-5 md:px-20 lg:px-24 pb-40 flex flex-col gap-y-28 ">
        <Image src={rectangle1} alt="assets" className="absolute top-0 left-0 -z-10 " />
        <Image src={rectangle2} alt="assets" className="absolute -right-36 -top-20 md:right-0 -z-10 h-[755px] w-[400px]" />

        {/* Hero */}
        <div className="hero flex justify-center relative md:justify-around items-center flex-col-reverse md:flex-row md:gap-x-16 lg:gap-x-36 gap-y-5">
          <div className="hero__text flex flex-col justify-center gap-y-6 md:gap-y-8">
            <div className="flex flex-col gap-y-4 justify-center items-center md:items-start">
              <span className="text-3xl text-[#433878] text-center font-bold max-w-[500px] md:text-4xl lg:text-6xl sm:text-start">Langkah Cerdas Menuju Prestasi!</span>
              <span className="text-base text-[#433878] text-center min-w-28 md:max-w-[300px] md:text-start lg:text-lg  ">
                Temani si kecil meraih impian dengan metode belajar efektif dan menyenangkan.
              </span>
            </div>
            <div className="hero__button flex justify-center md:justify-start gap-x-4">
              <button className="min-w-[150px] bg-[#7E60BF] text-white py-3 md:px-4 md:py-3 rounded-sm">Mulai Belajar</button>
              <button className="min-w-[150px] border border-[#7E60BF] py-3 text-[#7E60BF] md:px-4 md:py-3 rounded-sm">Hubungi Kami</button>
            </div>
          </div>
          <Image src={heroimage} alt="heroimage" width={550} height={550} className="min-w-[300px]" />
          <Image src={arrow1} alt="assets" className="absolute -left-10 -z-10 -bottom-32 md:-bottom-28 md:-left-24 lg:-bottom-10 w-[150px]" />
        </div>

        {/* Card Program */}
        <div className="card__program relative flex flex-col md:flex-row gap-x-10 items-center gap-y-24 py-5 justify-center">
          <div className="card__program_text flex flex-col items-center gap-y-4 relative">
            <span className="text-[#433878] text-2xl lg:text-4xl font-bold text-center">Program</span>
            <span className="text-[#433878] md:text-xs lg:text-base text-base text-center max-w-60">Pilihan bimbel terbaik untuk anak, seru dan mendukung kemajuan belajar!</span>
            <Image src={wave} alt="wave" className="absolute -bottom-12 left-10 md:left-0 md:-bottom-10 lg:-bottom-14 lg:left-10 -z-10 w-36" />
          </div>
          <div className="card__program__card flex flex-col md:flex-row md:gap-x-4 gap-y-4 justify-center items-center">
            <Card image={alasekolah} title="Ala Sekolah" description="Membaca cepat dan menyenangkan untuk anak-anak!" />
            <Card image={prisma} width={120} title="Prisma" description="Ngitung Gampang, Nilai Melesat Bersama Prisma!" />
            <Card image={brainy} width={130} title="Brainy" description="Berani Bicara, Jago English Bareng Brainy" />
          </div>
          <Image src={rectangle3} alt="assets" className="absolute -left-28 top-0 " />
          <Image src={rectangle4} alt="assets" className="absolute -right-28" />
        </div>

        {/* Galeri */}
        <div className="galeri relative flex flex-col gap-y-10 py-10 justify-center items-center">
          <span className="text-[#433878] text-2xl lg:text-4xl gap-x-2 flex items-center justify-center font-bold text-center">
            Galeri
            <svg width="50" height="50" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.4829 12.5096L64.1929 25.4946L51.2079 64.2046L12.4979 51.2196L25.4829 12.5096Z" fill="#7E60BF" />
              <path d="M28.0554 18.235L58.5667 28.1808L49.525 55.9183L19.0137 45.9725L28.0554 18.235Z" fill="#433878" />
              <path d="M15.8681 8.42627L56.0073 15.8171L48.6165 55.9563L8.47729 48.5654L15.8681 8.42627Z" fill="#AB72B9" />
              <path d="M19.2777 13.7725L50.8798 19.3871L45.7756 48.1163L14.1735 42.5017L19.2777 13.7725Z" fill="#B2A0DA" />
              <path d="M5.83333 5.83331H46.6667V46.6666H5.83333V5.83331Z" fill="#E4B1F0" />
              <path d="M10.2083 10.2083H42.2917V39.375H10.2083V10.2083Z" fill="#B2A0D9" />
              <path
                d="M23.3333 18.9584C23.3333 17.3542 24.6458 16.0417 26.25 16.0417C27.8542 16.0417 29.1667 17.3542 29.1667 18.9584C29.1667 20.5625 26.25 24.7917 26.25 24.7917C26.25 24.7917 23.3333 20.5625 23.3333 18.9584ZM29.1667 30.625C29.1667 32.2292 27.8542 33.5417 26.25 33.5417C24.6458 33.5417 23.3333 32.2292 23.3333 30.625C23.3333 29.0209 26.25 24.7917 26.25 24.7917C26.25 24.7917 29.1667 29.0209 29.1667 30.625Z"
                fill="white"
              />
              <path
                d="M19.6875 24.3542C18.2292 23.4792 17.7917 21.7292 18.6667 20.4167C19.5417 18.9584 21.2917 18.5209 22.6042 19.3959C24.0625 20.2709 26.25 24.7917 26.25 24.7917C26.25 24.7917 21.1458 25.2292 19.6875 24.3542ZM32.8125 25.2292C34.2708 26.1042 34.7083 27.8542 33.8333 29.1667C32.9583 30.625 31.2083 31.0625 29.8958 30.1875C28.4375 29.4584 26.25 24.7917 26.25 24.7917C26.25 24.7917 31.3542 24.3542 32.8125 25.2292Z"
                fill="white"
              />
              <path
                d="M32.8125 24.3542C34.2708 23.4792 34.7083 21.7292 33.8333 20.4167C32.9583 18.9584 31.2083 18.5209 29.8958 19.3959C28.4375 20.125 26.25 24.7917 26.25 24.7917C26.25 24.7917 31.3542 25.2292 32.8125 24.3542ZM19.6875 25.2292C18.2292 26.1042 17.7917 27.8542 18.6667 29.1667C19.5417 30.625 21.2917 31.0625 22.6042 30.1875C24.0625 29.3125 26.25 24.7917 26.25 24.7917C26.25 24.7917 21.1458 24.3542 19.6875 25.2292Z"
                fill="white"
              />
              <path
                d="M26.25 27.7083C27.8608 27.7083 29.1667 26.4025 29.1667 24.7917C29.1667 23.1808 27.8608 21.875 26.25 21.875C24.6392 21.875 23.3333 23.1808 23.3333 24.7917C23.3333 26.4025 24.6392 27.7083 26.25 27.7083Z"
                fill="#FFC107"
              />
            </svg>
          </span>

          <div className="grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-4 md:grid-cols-4 md:grid-rows-1 justify-center items-center">
            <div className="">
              <Image src="/assets/photo1.webp" alt="photo1" width={190} height={190} className="justify-self-center" />
            </div>
            <div className="grid gap-y-7">
              <Image src="/assets/photo2.webp" alt="photo2" width={220} height={220} />
              <Image src="/assets/photo3.webp" alt="photo3" width={220} height={220} />
            </div>
            <div className="grid gap-y-7 md:col-start-3 md:row-start-1">
              <Image src="/assets/photo4.webp" alt="photo4" width={220} height={220} />
              <Image src="/assets/photo5.webp" alt="photo5" width={220} height={220} />
            </div>
            <div>
              <Image src="/assets/photo6.webp" alt="photo6" width={190} height={190} className="justify-self-center" />
            </div>
            <Image src={rectangle6} alt="assets" className="absolute -bottom-48 w-[350px]" />
          </div>
        </div>

        {/* Other */}
        <div className="flex flex-col relative md:flex-row justify-center items-center md:gap-x-10 gap-x-36 py-5 px-5">
          <Image src="/assets/illustration1.webp" alt="illustration1" width={450} height={450} />
          <Image src={arrow2} alt="assets" className="absolute bottom-10 -right-10 w-48 md:-right-32 md:bottom-20 lg:top-48 md:w-72 -z-10" />
          <div className="flex flex-col gap-y-5 md:gap-y-3 lg:gap-y-7 items-center justify-center">
            <span className="text-3xl md:text-2xl lg:text-4xl font-bold text-[#433878] max-w-96 md:max-w-4xl lg:max-w-96 ">Belajar lebih terarah dengan jadwal yang fleksibel!</span>
            <span className="text-base text-[#433878] max-w-96 md:max-w-5xl lg:max-w-96">Jadwalkan waktu terbaik untuk anak Anda dan wujudkan pembelajaran yang menyenangkan! </span>
            <button className="bg-[#7E60BF] text-white px-4 py-3 rounded-sm self-start flex gap-x-3 items-center">
              Diskusikan <FaWhatsapp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Review */}
        <div id="Ulasan" className="flex flex-col gap-y-20 relative items-center justify-center scroll-mt-10">
          <Image src={rectangle7} alt="assets" className="absolute -left-36 top-0 md:-top-96 md:-left-48 -z-10" />
          <Image src={rectangle5} alt="assets" className="absolute -right-36 bottom-0 md:-bottom-96 md:-right-48 -z-10" />
          <div className="review__title flex flex-col items-center text-[#433878] text-center">
            <span className="text-sm font-semibold tracking-wide">ULASAN PENGGUNA</span>
            <span className="text-3xl font-semibold max-w-96">Pendapat Mereka Tentang Kami</span>
          </div>
          <EmblaCarousel options={OPTIONS}>
            {SLIDES.map((slide, index) => (
              <div className="embla__slide bg-white border border-[#7E60BF] rounded-md flex flex-col items-center justify-center gap-y-7 h-[var(--slide-height)]" key={index}>
                <FaQuoteLeft className="text-4xl text-[#433878]" />
                <span className="text-base text-[#433878] text-center font-normal">{slide.review}</span>
                <span className="bg-[#F4F1FA] rounded-full px-6 py-3 text-[#433878] text-sm font-normal w-fit mt-4"> {slide.name}</span>
              </div>
            ))}
          </EmblaCarousel>
        </div>
      </div>
      <button onClick={() => dialog.current?.showModal()} className="bg-[#E6E0F3] w-[40px] h-[40px] fixed bottom-5 right-5 rounded-full text-[#433878] font-semibold flex justify-center items-center">
        B
      </button>
      <Chatbot ref={dialog} />
    </>
  );
}

type CardProps = {
  image?: StaticImageData;
  width?: number;
  height?: number;
  title: string;
  description: string;
};

function Card({ image, width = 82, height = 46, title, description }: CardProps) {
  return (
    <div className="card min-w-60 md:min-w-44 lg:min-w-56 lg:min-h-64 bg-[#E9C1F3] flex flex-col gap-y-2 items-center rounded-md py-8 px-8 text-center">
      {image && <Image src={image} alt={image.toString()} width={width} height={height} priority />}
      <span className="text-lg lg:text-xl text-[#433878] font-bold">{title}</span>
      <span className="text-sm md:text-xs lg:text-sm text-[#433878] max-w-36">{description}</span>
    </div>
  );
}
export { Home };
