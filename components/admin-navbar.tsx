"use client";

import React from "react";
import Image from "next/image";
import { api } from "@/lib/api";
import { Navlink } from "@/types/navlink";
import { useProfile } from "@/hooks/use-profile";
import { useIsMobile } from "@/hooks/use-is-mobile";

// Icon
import { IoPersonCircle, IoClose } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";

function Navbar({ navlink, pathname, isOpen, setIsOpen }: { navlink: Navlink[]; pathname: string; isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { profile } = useProfile();

  const style = {
    activeClass: "bg-[#7E60BF] text-white rounded-full px-8",
    base: "text-[#433878] px-4",
  };

  async function handleLogout() {
    try {
      const { data } = await api.post("/api/auth/logout");
      if (!data.success) throw new Error(data.message);
      router.push("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
      }
    }
  }

  return (
    <div
      className={`navbar_container w-80 h-screen absolute transition-all duration-300 ${
        isOpen ? "left-0" : "-left-[350px]"
      } flex flex-col items-center bg-[#F4F1FA] md:left-0 md:relative px-10 py-14 gap-y-10 z-100`}
    >
      <Image src="/ahe-logo.webp" alt="ahe-logo" width={82} height={46} priority />
      {isMobile && <IoClose className="absolute top-5 right-5 text-xl bg-[#B2A0DA] bg-opacity-40 rounded-full p-1 text-[#433878]" onClick={() => setIsOpen(false)} />}
      <div className="navbar_links w-full flex flex-col flex-grow gap-y-2">
        {navlink.map((link) => (
          <a
            key={link.name}
            href={link.url}
            className={`flex items-center font-semibold text-lg gap-2 py-3 outline-none active:outline-none ${pathname === link.url ? style.activeClass : style.base}`}
          >
            {link.icon}
            <span>{link.name}</span>
          </a>
        ))}
      </div>
      <div className="w-full flex items-center justify-between">
        {profile?.name && (
          <span className="flex items-center gap-2 text-[#433878] font-semibold">
            <IoPersonCircle className="text-2xl" />
            {profile.name}
          </span>
        )}
        <FiLogOut className="text-[#E94343] hover:cursor-pointer text-xl" onClick={handleLogout} />
      </div>
    </div>
  );
}

export { Navbar };
