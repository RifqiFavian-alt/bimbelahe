import { Student } from "@/types/student";
import { redirect } from "next/navigation";

type ReportTable = Pick<Student, "id" | "name" | "email" | "phone">;

const tableMap: {
  columns: { key: keyof ReportTable; label: string; render?: (item: ReportTable) => React.ReactNode }[];
  options: (
    row: ReportTable,
    refresh: () => Promise<void>
  ) => {
    label: string;
    onClick: (row: ReportTable) => void;
    className?: string;
  }[];
} = {
  columns: [
    { key: "name", label: "Nama" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
  ],
  options: (row) => {
    return [
      {
        label: "Lihat Laporan",
        onClick: () => {
          redirect(`/dashboard/report/${row.id}`);
        },
        className: "bg-[#E6E0F3] text-xs font-semibold text-[#7E60BF] px-4 py-2 rounded-full",
      },
    ];
  },
};

export { tableMap };
