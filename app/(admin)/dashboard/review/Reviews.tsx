"use client";

import { Filter } from "@/components/filter";
import { SearchBar } from "@/components/search-bar";
import { Table } from "@/components/table";
import { tableMap } from "./table-map";
import { useCallback, useEffect, useRef, useState } from "react";
import { VscSettings } from "react-icons/vsc";
import { ReviewTable } from "@/types/review";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import axios from "axios";
import { Pagination } from "@/components/pagination";
import { useRouter } from "next/navigation";
import { MobileTable } from "@/components/mobile-table";
import { useIsMobile } from "@/hooks/use-is-mobile";

function Reviews() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile(1024);
  const dialog = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<ReviewTable[]>([]);
  const [pagination, setPagination] = useState<{ current: number; total: number }>({ current: 1, total: 1 });

  const filter = [
    {
      inputName: "STATUS",
      inputType: "radio",
      inputValue: ["Semua", "Ditampilkan"],
    },
  ];

  function handlePagination(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/dashboard/questionnaires?${params.toString()}`);
  }

  function handleFilter(formData: FormData) {
    const isFeatured = formData.get("STATUS") === "Ditampilkan" ? true : false;
    const params = new URLSearchParams(searchParams.toString());
    params.set("isFeatured", isFeatured.toString());
    params.set("page", "1");
    router.push(`/dashboard/review?${params.toString()}`);
  }

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("name", value);
    params.set("page", "1");
    router.push(`/dashboard/review?${params.toString()}`);
  }

  const getReviews = useCallback(async () => {
    try {
      const params = searchParams.toString();
      const { data } = await api.get(`/api/questionnaires/read?${params}`);
      if (!data.success) throw new Error(data.message);
      setReviews(data.data.questionnaires);
      setPagination({ current: data.data.pagination.currentPage, total: data.data.pagination.totalPages });
    } catch (err) {
      if (axios.isAxiosError(err)) console.error(err.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);
  return (
    <div className="payment_container h-screen flex flex-col gap-y-4 justify-between">
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between items-center">
          <div className="w-8/12 lg:w-5/12">
            <SearchBar action={handleSearch} />
          </div>
          <VscSettings className="text-[#433878] text-3xl cursor-pointer" onClick={() => dialog.current?.showModal()} />
        </div>
        <Filter ref={dialog} action={handleFilter} filterData={filter} />
        {isMobile ? (
          <MobileTable
            loading={loading}
            data={reviews ? reviews : []}
            actions={(row: ReviewTable) => tableMap.actions(row, getReviews)}
            columns={tableMap.columns}
            options={(row: ReviewTable) => tableMap.options(row, getReviews)}
          />
        ) : (
          <Table
            loading={loading}
            data={reviews ? reviews : []}
            actions={(row: ReviewTable) => tableMap.actions(row, getReviews)}
            columns={tableMap.columns}
            options={(row: ReviewTable) => tableMap.options(row, getReviews)}
          />
        )}
      </div>

      <Pagination currentPage={pagination.current} totalPages={pagination.total} onPageChange={handlePagination} />
    </div>
  );
}

export default Reviews;
