import React from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { api } from "@/lib/api";
import axios from "axios";

type deleteModalProps = {
  message: string;
  toastId: string;
  deletedId: string;
  url: string;
  refresh: () => Promise<void>;
};

function DeleteModal({ message, toastId, deletedId, url, refresh }: deleteModalProps) {
  return (
    <div className="flex w-[100vw] absolute h-[100vh] justify-center items-center after:h-[100vh] after:w-[100vw] after:bg-[#000000] after:opacity-10 after:absolute">
      <div className={` z-50 max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col`}>
        <div className="flex flex-col justify-center items-center p-10 gap-y-4">
          <Image className="h-10 w-10 rounded-full" src={"/icons/warning_icon.jpg"} alt="" width={70} height={70} />
          <p className="text-sm text-[#433878] text-center">{message}</p>
        </div>

        <div className="flex border-t border-gray-200">
          <button onClick={() => toast.remove(toastId)} className="w-full p-4 text-sm font-medium text-[#7E60BF] hover:text-[#433878] focus:outline-none">
            Batalkan
          </button>
          <button
            onClick={async () => {
              try {
                const { data } = await api.delete(url, {
                  data: { id: deletedId },
                });
                if (!data.success) throw new Error(data.message);

                toast.remove(toastId);
                toast.success("Berhasil menghapus user", { id: "delete-success", style: { borderRadius: "50px", zIndex: 100, marginTop: "15px" }, duration: 100 });
                await refresh();
              } catch (err) {
                if (axios.isAxiosError(err)) {
                  toast.error(err.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.", { id: "delete-error", style: { borderRadius: "50px", zIndex: 100, marginTop: "15px" } });
                }
              }
            }}
            className="w-full p-4 text-sm font-medium text-red-600 hover:text-red-800 focus:outline-none"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export { DeleteModal };
