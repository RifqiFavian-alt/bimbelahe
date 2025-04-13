"use client";

import React, { useCallback, useEffect, useState } from "react";
import { SearchBar } from "@/components/search-bar";
import { useSearchParams, useRouter } from "next/navigation";
import { IoMdAdd } from "react-icons/io";
import { Table } from "@/components/table";
import { Pagination } from "@/components/pagination";
import { Student } from "@/types/student";
import axios from "axios";
import { api } from "@/lib/api";
import { tableMap } from "./table-map";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { MobileTable } from "@/components/mobile-table";

function Students() {
  const searchParams = useSearchParams();
  const isMobile = useIsMobile(1024);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [pagination, setPagination] = useState<{ current: number; total: number }>({ current: 1, total: 1 });

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("name", value);
    params.set("page", "1");
    router.push(`/dashboard/user?${params.toString()}`);
  }

  function handlePagination(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/dashboard/payment?${params.toString()}`);
  }

  const getStudents = useCallback(async () => {
    try {
      const params = searchParams.toString();
      const { data } = await api.get(`/api/students/read?${params}`);
      if (!data.success) throw new Error(data.message);
      setStudents(data.data.students);
      setPagination({ current: data.data.pagination.currentPage, total: data.data.pagination.totalPages });
    } catch (error) {
      if (axios.isAxiosError(error)) console.error(error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  return (
    <div className="users__container h-screen flex flex-col gap-y-4 justify-between">
      <div className="flex flex-col gap-y-8 md:gap-y-4">
        <div className="flex justify-between items-center">
          <div className="w-8/12 lg:w-5/12">
            <SearchBar action={handleSearch} />
          </div>
          <div className="text-xl bg-[#7E60BF] text-white rounded-xl p-2 cursor-pointer" onClick={() => router.push("/dashboard/student/create")}>
            <IoMdAdd />
          </div>
        </div>
        {isMobile ? (
          <MobileTable
            data={students ? students : []}
            columns={tableMap.columns}
            actions={(row: Student) => tableMap.actions(row, getStudents)}
            options={(row: Student) => tableMap.options(row, getStudents)}
          />
        ) : (
          <Table
            loading={loading}
            data={students ? students : []}
            columns={tableMap.columns}
            actions={(row: Student) => tableMap.actions(row, getStudents)}
            options={(row: Student) => tableMap.options(row, getStudents)}
          />
        )}
      </div>
      <Pagination currentPage={pagination.current} totalPages={pagination.total} onPageChange={handlePagination} />
    </div>
  );
}

export default Students;
