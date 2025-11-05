"use client";

import { User } from "@/types/users";
import { RiEditFill, RiDeleteBin6Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { DeleteModal } from "@/components/delete-modal";

const tableMap: {
  columns: { key: keyof Omit<User, "id">; label: string; render?: (item: Omit<User, "id">) => React.ReactNode }[];
  actions: (
    row: User,
    refresh: () => Promise<void>
  ) => {
    label: React.ReactNode;
    onClick: (row: User) => void;
    className?: string;
  }[];
} = {
  columns: [
    { key: "name", label: "Nama" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role", render: (item) => (item.role === "ADMIN" ? "Admin" : "Moderator") },
  ],
  actions: (row, refresh) => {
    return [
      {
        label: <RiEditFill />,
        onClick: () => {
          redirect(`/dashboard/user/${row.id}`);
        },
        className: "lg:bg-[#E6E0F3] text-[#7E60BF] rounded-2xl lg:px-3 lg:py-3 text-sm",
      },
      {
        label: <RiDeleteBin6Fill />,
        onClick: () => {
          const toastId = "delete-confirmation";
          toast.remove(toastId);
          toast.custom(
            () => <DeleteModal url="api/users/delete" message={`Apakah anda yakin ingin menghapus ${row.name} dengan role ${row.role}?`} toastId={toastId} deletedId={row.id} refresh={refresh} />,
            { id: toastId, duration: Infinity }
          );
        },
        className: "text-[#D9D9D9] rounded-2xl px-3 py-2 text-xl hover:text-[#E94343]",
      },
    ];
  },
};

export { tableMap };
