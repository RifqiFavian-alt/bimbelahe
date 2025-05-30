"use client";
import { Navbar } from "@/components/admin-navbar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { FaUserGroup, FaPen } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navlinkMap = [
    { name: "Siswa", url: "/dashboard/student", icon: <FaUserGroup /> },
    { name: "Pengguna", url: "/dashboard/user", icon: <MdAdminPanelSettings /> },
    { name: "Pembayaran", url: "/dashboard/payment", icon: <AiFillDollarCircle /> },
    { name: "Ulasan", url: "/dashboard/review", icon: <FaPen /> },
  ];
  const activeNavlink = navlinkMap.find((navlink) => navlink.url === pathname);

  return (
    <>
      <Toaster
        reverseOrder={false}
        containerStyle={{
          top: 0,
        }}
        toastOptions={{ success: { duration: 700 }, error: { duration: 700 } }}
      />
      <div className="dashboard_layout relative h-screen overflow-hidden flex">
        <Navbar navlink={navlinkMap} pathname={pathname} isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex flex-col gap-y-7 flex-auto px-5  md:px-20 py-10">
          {activeNavlink && (
            <div className="flex justify-between items-center">
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
        </div>
      </div>
    </>
  );
}
