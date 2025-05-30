"use client";
import { useIsMobile } from "@/hooks/use-is-mobile";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

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
  return (
    <div className="navbar__container flex justify-between items-center py-7 px-7 md:px-7 lg:px-24">
      <Image src="/ahe-logo.webp" alt="ahe-logo" width={82} height={46} priority />
      <div className={`navbar__links ${isOpen ? "flex" : "hidden md:flex"} absolute z-50 top-20 right-0 flex-col md:flex-row md:static md:gap-x-2 lg:gap-x-7 items-center`}>
        {links.map((link, i) =>
          link.url ? (
            <Link key={i} href={link.url as string} className="text-[#433878] text-lg hover:text-[#7E60BF] px-4 outline-none text-decoration-none">
              {link.name}
            </Link>
          ) : (
            <button
              key={i}
              className="text-[#433878] text-lg hover:text-[#7E60BF] px-4 outline-none bg-none"
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
        <button className="bg-[#433878] text-white font-semibold px-6 py-2 rounded-sm">Daftar</button>
        {isMobile && (
          <div className="text-[#433878] text-2xl">
            <GiHamburgerMenu onClick={() => setIsOpen((prev) => !prev)} />
          </div>
        )}
      </div>
    </div>
  );
}

export { Navbar };
