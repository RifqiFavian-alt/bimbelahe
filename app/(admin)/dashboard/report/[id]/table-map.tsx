import { Payment } from "@/types/payments";

const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
type studentPaymentReport = Omit<Payment, "studentId">;

const tableMap: {
  columns: { key: keyof studentPaymentReport; label: string; render?: (item: studentPaymentReport) => React.ReactNode }[];
} = {
  columns: [
    { key: "month", label: "Bulan", render: (item) => monthNames[item.month - 1] || "Tidak valid" },
    { key: "year", label: "Tahun" },
    { key: "isPaid", label: "Status", render: (item) => (item.isPaid ? "Lunas" : "Belum Lunas") },
    { key: "updatedAt", label: "Tanggal Pembayaran", render: (item) => new Date(item.updatedAt).toLocaleDateString() },
  ],
};

export { tableMap };
