"use client";
import { useIsMobile } from "@/hooks/use-is-mobile";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const links = [
    {
      name: "Beranda",
      url: "/",
    },
    {
      name: "Tentang",
    },
    {
      name: "Kuesioner",
      url: "/questionnaires",
    },
    {
      name: "Ulasan",
    },
    {
      name: "Kontak",
    },
  ];
  if (links.length === 0) {
  }
  return (
    <nav className="navbar__container flex justify-between items-center py-7 px-7 md:px-7 lg:px-24">
      <Link href="/">
        <Image src="/ahe-logo.webp" alt="ahe-logo" width={82} height={46} priority />
      </Link>
      <div
        className={`navbar__links absolute z-50 w-full gap-y-2 bg-[#E9C1F3] py-7 md:py-0 right-0 flex flex-col transition-all duration-500 ease-in-out md:static md:flex md:flex-row md:gap-x-2 lg:gap-x-7 items-center md:w-auto md:bg-transparent ${
          isOpen ? "opacity-100 visible top-0" : "opacity-0 invisible md:opacity-100 md:visible -top-[100%]"
        }
  `}
      >
        {isMobile && isOpen && (
          <div className="your-class">
            <div className="navbar__close">
              <IoClose className="absolute top-5 right-5 text-xl bg-[#B2A0DA] bg-opacity-40 rounded-full p-1 text-[#433878]" onClick={() => setIsOpen(false)} />
            </div>
          </div>
        )}

        {links.map((link, i) =>
          link.url ? (
            <button key={i}>
              <Link href={link.url as string} className=" text-[#433878] text-lg hover:text-[#7E60BF] px-4 outline-none text-decoration-none">
                {link.name}
              </Link>
            </button>
          ) : (
            <button
              key={i}
              className=" text-[#433878] text-lg hover:text-[#7E60BF] px-4 outline-none bg-none"
              onClick={() => {
                const element = document.getElementById(link.name);
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {link.name}
            </button>
          )
        )}
      </div>
      <div className="flex items-center gap-x-4">
        <Link href="/registration">
          <button className="bg-[#433878] text-white font-semibold px-6 py-2 rounded-sm">Daftar</button>
        </Link>
        {isMobile && (
          <div className="text-[#433878] text-2xl">
            <GiHamburgerMenu onClick={() => setIsOpen((prev) => !prev)} />
          </div>
        )}
      </div>
    </nav>
  );
}

export { Navbar };
