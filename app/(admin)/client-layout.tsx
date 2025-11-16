"use client";

import { Navbar } from "@/components/admin-navbar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { FaUserGroup, FaPen } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
  role: string | null;
}

export default function ClientDashboardLayout({ children, role }: Props) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navlinkMap = [
    { name: "Siswa", url: "/dashboard/student", icon: <FaUserGroup /> },
    { name: "Pengguna", url: "/dashboard/user", icon: <MdAdminPanelSettings /> },
    { name: "Pembayaran", url: "/dashboard/payment", icon: <AiFillDollarCircle /> },
    { name: "Ulasan", url: "/dashboard/review", icon: <FaPen /> },
    { name: "Laporan", url: "/dashboard/report", icon: <TbReportSearch /> },
  ];

  const filteredNavlink = role === "USER" ? navlinkMap.filter((item) => item.name !== "Pengguna") : navlinkMap;

  const activeNavlink = filteredNavlink.find((navlink) => navlink.url === pathname);

  return (
    <>
      <Toaster toastOptions={{ success: { duration: 700 }, error: { duration: 700 } }} />
      <div className="flex">
        <Navbar navlink={filteredNavlink} pathname={pathname} isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex flex-col gap-y-7 flex-1 ml-0 md:ml-80 px-5 md:px-20 py-10 transition-all duration-300">
          {activeNavlink && (
            <div className="flex justify-between items-center mb-8">
              <div className="text-[#433878] text-2xl flex gap-x-2 items-center">
                {activeNavlink.icon}
                {activeNavlink.name}
              </div>
              {isMobile && (
                <div className="text-[#433878] text-2xl">
                  <GiHamburgerMenu onClick={() => setIsOpen((prev) => !prev)} />
                </div>
              )}
            </div>
          )}
          {children}
        </main>
      </div>
    </>
  );
}
