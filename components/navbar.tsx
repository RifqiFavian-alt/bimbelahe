"use client";

import React from "react";
import { Navlink } from "@/types/navlink";
// import { isMobile } from "react-device-detect";
import Image from "next/image";
import { FaUserGroup, FaPen } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";

function Navbar() {
  const navlinkMap: Navlink[] = [
    {
      name: "Siswa",
      url: "/dashboard/student",
      icon: <FaUserGroup />,
    },
    {
      name: "Pengguna",
      url: "/dashboard/user",
      icon: <MdAdminPanelSettings />,
    },
    {
      name: "Pembayaran",
      url: "/dashboard/payment",
      icon: <AiFillDollarCircle />,
    },
    {
      name: "Ulasan",
      url: "/dashboard/review",
      icon: <FaPen />,
    },
  ];
  const pathname = usePathname();
  const style = {
    activeClass: "bg-[#7E60BF] text-white rounded-md",
    inactiveClass: "text-[#433878]",
  };
  const { profile } = useProfile();

  return (
    <div className="navbar_container w-80 h-screen flex flex-col items-center bg-[#B2A0DA] bg-opacity-15 relative px-10 py-14 gap-y-10">
      <Image src="/ahe-logo.png" alt="ahe-logo" width={82} height={46} className="" />
      <div className="navbar_links w-full flex flex-col gap-y-2">
        {navlinkMap.map((link) => (
          <a key={link.name} href={link.url} className={`flex items-center font-semibold text-lg gap-2 py-3 px-4 ${pathname === link.url ? style.activeClass : style.inactiveClass}`}>
            {link.icon}
            <span>{link.name}</span>
          </a>
        ))}
      </div>
      {profile?.name && <div>{profile.name}</div>}
    </div>
  );
}

export default Navbar;
