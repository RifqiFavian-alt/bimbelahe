import { api } from "@/lib/api";
import { PaymentTable } from "@/types/payments";
import axios from "axios";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { DeleteModal } from "@/components/delete-modal";

const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const tableMap: {
  columns: { key: keyof PaymentTable; label: string; render?: (item: PaymentTable) => React.ReactNode }[];
  actions: (
    row: PaymentTable,
    refresh: () => Promise<void>
  ) => {
    label: React.ReactNode;
    onClick: (row: PaymentTable) => void;
    className?: string;
  }[];
  options: (
    row: PaymentTable,
    refresh: () => Promise<void>
  ) => {
    label: string;
    onClick: (row: PaymentTable) => void;
    className?: string;
  }[];
} = {
  columns: [
    { key: "studentName", label: "Nama", render: (item) => item.studentName || "Dihapus" },
    { key: "month", label: "Bulan", render: (item) => monthNames[item.month - 1] || "Tidak valid" },
    { key: "year", label: "Tahun" },
  ],
  actions: (row, refresh) => {
    return [
      {
        label: <RiDeleteBin6Fill />,
        onClick: () => {
          const toastId = "delete-confirmation";
          toast.remove(toastId);
          toast.custom(
            () => (
              <DeleteModal
                url="api/payments/delete"
                message={`Apakah anda yakin ingin menghapus pembayaran ${row.studentName} di bulan ${row.month}`}
                toastId={toastId}
                deletedId={row.id}
                refresh={refresh}
              />
            ),
            { id: toastId, duration: Infinity }
          );
        },
        className: "text-[#D9D9D9] rounded-2xl px-3 py-2 text-xl hover:text-[#E94343]",
      },
    ];
  },
  options: (row, refresh) => {
    return row.isPaid
      ? [
          {
            label: "Batal",
            onClick: async (row) => {
              try {
                const { data } = await api.patch(`/api/payments/update`, { paymentId: row.id, status: false });
                if (!data.success) throw new Error(data.message);
                toast.success("Pembayaran dibatalkan", {
                  style: {
                    borderRadius: "50px",
                    zIndex: 100,
                    marginTop: "15px",
                  },
                });
                await refresh();
              } catch (err) {
                if (axios.isAxiosError(err)) {
                  toast.error(err.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.", {
                    style: {
                      borderRadius: "50px",
                      zIndex: 100,
                      marginTop: "15px",
                    },
                  });
                }
              }
            },
            className: "bg-[#7E60BF] w-20 text-xs font-semibold text-[#FFFFFF] px-4 py-2 rounded-full",
          },
        ]
      : [
          {
            label: "Konfirmasi",
            onClick: async (row) => {
              try {
                const { data } = await api.patch(`/api/payments/update`, { paymentId: row.id, status: true });
                if (!data.success) throw new Error(data.message);
                toast.success("Pembayaran dikonfirmasi", {
                  style: {
                    borderRadius: "50px",
                    zIndex: 100,
                    marginTop: "15px",
                  },
                });
                await refresh();
              } catch (err) {
                if (axios.isAxiosError(err)) {
                  toast.error(err.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.", {
                    style: {
                      borderRadius: "50px",
                      zIndex: 100,
                      marginTop: "15px",
                    },
                  });
                }
              }
            },
            className: "bg-[#E6E0F3] text-xs font-semibold text-[#7E60BF] px-4 py-2 rounded-full",
          },
        ];
  },
};

export { tableMap };
