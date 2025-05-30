"use client";

import { Student } from "@/types/student";
import { RiEditFill, RiDeleteBin6Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { DeleteModal } from "@/components/delete-modal";

const tableMap: {
  columns: { key: keyof Omit<Student, "id">; label: string; render?: (item: Omit<Student, "id">) => React.ReactNode }[];
  actions: (
    row: Student,
    refresh: () => Promise<void>
  ) => {
    label: React.ReactNode;
    onClick: (row: Student) => void;
    className?: string;
  }[];
  options: (
    row: Student,
    refresh: () => Promise<void>
  ) => {
    label: React.ReactNode;
    onClick: (row: Student) => void;
    className?: string;
  }[];
} = {
  columns: [
    { key: "name", label: "Nama" },
    { key: "phone", label: "No Telepon" },
    { key: "email", label: "Email" },
  ],
  actions: (row, refresh) => {
    return [
      {
        label: <RiEditFill />,
        onClick: () => {
          redirect(`/dashboard/student/${row.id}`);
        },
        className: "lg:bg-[#E6E0F3] text-[#7E60BF] rounded-2xl lg:px-3 lg:py-3 text-sm",
      },
      {
        label: <RiDeleteBin6Fill />,
        onClick: () => {
          const toastId = "delete-confirmation";
          toast.remove(toastId);
          toast.custom(
            () => <DeleteModal url="api/students/delete" message={`Apakah anda yakin ingin menghapus ${row.name} dengan email ${row.email}?`} toastId={toastId} deletedId={row.id} refresh={refresh} />,
            { id: toastId, duration: Infinity }
          );
        },
        className: "text-[#D9D9D9] rounded-2xl px-3 py-2 text-xl hover:text-[#E94343]",
      },
    ];
  },
  options: (row) => {
    return [
      {
        label: "Lihat Pembayaran",
        onClick: () => {
          redirect(`/dashboard/payment?studentId=${row.id}`);
        },
        className: "bg-[#E6E0F3] text-xs font-semibold text-[#7E60BF] px-4 py-2 rounded-full",
      },
    ];
  },
};

export { tableMap };
