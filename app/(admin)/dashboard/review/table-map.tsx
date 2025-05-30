import { DeleteModal } from "@/components/delete-modal";
import { ReviewTable } from "@/types/review";
import toast from "react-hot-toast";
import { RiDeleteBin6Fill, RiEditFill } from "react-icons/ri";
import { FaQuoteLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { api } from "@/lib/api";
import axios from "axios";
import { redirect } from "next/navigation";

const tableMap: {
  columns: { key: keyof ReviewTable; label: string; render?: (item: ReviewTable) => React.ReactNode }[];
  actions: (
    row: ReviewTable,
    refresh: () => Promise<void>
  ) => {
    label: React.ReactNode;
    onClick: (row: ReviewTable) => void;
    className?: string;
  }[];
  options: (
    row: ReviewTable,
    refresh: () => Promise<void>
  ) => {
    label: string;
    onClick: (row: ReviewTable) => void;
    className?: string;
  }[];
} = {
  columns: [
    { key: "name", label: "Nama" },
    { key: "email", label: "Email" },
  ],
  options: (row, refresh) => {
    return [
      {
        label: "Lihat Detail",
        onClick: () => {
          toast.custom(() => (
            <div className="flex w-[100vw] absolute h-[100vh] justify-center items-center after:h-[100vh] after:w-[100vw] after:bg-[#000000] after:opacity-10 after:absolute">
              <div className={` z-50 max-w-md w-full relative bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col p-8 gap-y-5`}>
                <IoClose className="absolute top-5 right-5 text-xl bg-[#B2A0DA] bg-opacity-40 rounded-full p-1 cursor-pointer text-[#433878]" onClick={() => toast.remove()} />
                <span className="flex flex-col gap-y-3 text-sm text-center text-[#433878]">
                  <FaQuoteLeft /> <i>{row.review}</i>
                </span>
                <span className="text-center font-semibold text-[#433878]">{row.name}</span>
              </div>
            </div>
          ));
        },
        className: "bg-[#E6E0F3] text-xs font-semibold text-[#7E60BF] px-4 py-2 rounded-full",
      },
      row.isFeatured
        ? {
            label: "Sembunyikan",
            onClick: async () => {
              try {
                const { data } = await api.patch(`/api/questionnaires/update`, { id: row.id, isFeatured: false });
                if (!data.success) throw new Error(data.message);
                toast.success("Review berhasil disembunyikan", {
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
            className: "bg-[#7E60BF] text-xs font-semibold text-[#FFFFFF] px-4 py-2 rounded-full",
          }
        : {
            label: "Tampilkan",
            onClick: async () => {
              try {
                const { data } = await api.patch(`/api/questionnaires/update`, { id: row.id, isFeatured: true });
                if (!data.success) throw new Error(data.message);
                toast.success("Review berhasil ditampilkan", {
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
                url="api/questionnaires/delete"
                message={`Apakah anda yakin ingin menghapus ${row.name} dengan email ${row.email}?`}
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
      {
        label: <RiEditFill />,
        onClick: () => {
          redirect(`/dashboard/review/${row.id}`);
        },
        className: "lg:bg-[#E6E0F3] text-[#7E60BF] rounded-2xl lg:px-3 lg:py-3 text-sm",
      },
    ];
  },
};

export { tableMap };
