"use client";

import React from "react";
import Image from "next/image";
import { api } from "@/lib/api";
import { Navlink } from "@/types/navlink";
import { useProfile } from "@/hooks/use-profile";
import { useIsMobile } from "@/hooks/use-is-mobile";

// Icons
import { IoPersonCircle, IoClose } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useHasMounted } from "@/hooks/use-has-mounted";

type NavbarProps = {
  navlink: Navlink[];
  pathname: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Navbar({ navlink, pathname, isOpen, setIsOpen }: NavbarProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { profile } = useProfile();
  const hasMounted = useHasMounted();
  if (!hasMounted) return null;

  const style = {
    activeClass: "bg-[#7E60BF] text-white rounded-full px-8",
    base: "text-[#433878] px-4",
  };
  const sidebarClass = `navbar_container fixed top-0 left-0 h-screen w-80 z-40 bg-[#F4F1FA] px-10 py-14 flex flex-col items-center transition-transform duration-300 transform`;

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
    <>
      {/* Overlay untuk mobile */}
      {isMobile && isOpen && <div className="fixed inset-0 bg-black/30 z-30" onClick={() => setIsOpen(false)} />}

      <div className={`${sidebarClass} ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}`}>
        <Image src="/ahe-logo.webp" alt="ahe-logo" width={82} height={46} priority />
        {isMobile && <IoClose className="absolute top-5 right-5 text-xl bg-[#B2A0DA] bg-opacity-40 rounded-full p-1 text-[#433878] cursor-pointer" onClick={() => setIsOpen(false)} />}

        <div className="navbar_links w-full flex flex-col flex-grow gap-y-2 mt-10">
          {navlink.map((link) => (
            <a
              key={link.name}
              href={link.url}
              onClick={() => isMobile && setIsOpen(false)}
              className={`flex items-center font-semibold text-lg gap-2 py-3 outline-none active:outline-none ${pathname === link.url ? style.activeClass : style.base}`}
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}
        </div>

        <div className="w-full flex items-center justify-between mt-10">
          {profile?.name && (
            <span className="flex items-center gap-2 text-[#433878] font-semibold">
              <IoPersonCircle className="text-2xl" />
              {profile.name}
            </span>
          )}
          <FiLogOut className="text-[#E94343] hover:cursor-pointer text-xl" onClick={handleLogout} />
        </div>
      </div>
    </>
  );
}

export { Navbar };
