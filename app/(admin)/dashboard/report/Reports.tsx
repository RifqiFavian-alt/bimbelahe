// --- Reports.tsx ---
"use client";

import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { SearchBar } from "@/components/search-bar";
import { useSearchParams, useRouter } from "next/navigation";
import { Filter } from "@/components/filter";
import { IoMdAdd } from "react-icons/io";
import { Table } from "@/components/table";
import { Pagination } from "@/components/pagination";
import { Student } from "@/types/student";
import axios from "axios";
import { api } from "@/lib/api";
import { tableMap } from "./table-map";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { MobileTable } from "@/components/mobile-table";
import { VscSettings } from "react-icons/vsc";

interface Program {
  id: string;
  name: string;
}

type StudentReport = Pick<Student, "id" | "name" | "email" | "phone">;

function Reports() {
  const searchParams = useSearchParams();
  const isMobile = useIsMobile(1024);
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [students, setStudents] = useState<StudentReport[]>([]);
  const [pagination, setPagination] = useState<{ current: number; total: number }>({ current: 1, total: 1 });
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);

  const getStudents = useCallback(async () => {
    try {
      const params = searchParams.toString();
      const { data } = await api.get(`/api/students/read?${params}`);
      if (!data.success) throw new Error(data.message);
      const studentReportData: StudentReport[] = data.data.students.map((student: Student) => ({
        id: student.id,
        name: student.name,
        email: student.email,
        phone: student.phone,
      }));
      setStudents(studentReportData);
      setPagination({ current: data.data.pagination.currentPage, total: data.data.pagination.totalPages });
    } catch (error) {
      if (axios.isAxiosError(error)) console.error(error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchPrograms = async () => {
    try {
      const { data } = await api.get("/api/programs/read");
      setPrograms(data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) console.error(error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
    }
  };

  useEffect(() => {
    fetchPrograms();
    getStudents();
  }, [getStudents]);

  useEffect(() => {
    const selectedPrograms = searchParams.getAll("program") || [];
    setSelectedPrograms(selectedPrograms);
  }, [searchParams]);

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("name", value);
    params.set("page", "1");
    router.push(`/dashboard/report?${params.toString()}`);
  }

  function handlePagination(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/dashboard/report?${params.toString()}`);
  }

  function handleFilter(formData: FormData, selectedValues?: string[]) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("program"); // pastikan hapus dulu

    if (selectedValues && selectedValues.length > 0) {
      selectedValues.forEach((val) => params.append("program", val));
    }

    params.set("page", "1");
    router.push(`/dashboard/report?${params.toString()}`);
  }

  const filterData = [
    {
      inputName: "program",
      inputType: "checkbox",
      inputValue: programs.map((p) => p.name),
    },
  ];

  return (
    <div className="payment_container h-screen flex flex-col gap-y-4 justify-between">
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between items-center">
          <div className="w-8/12 lg:w-5/12">
            <Suspense>
              <SearchBar action={handleSearch} />
            </Suspense>
          </div>
          <div className="flex gap-x-4 items-center">
            <VscSettings className="text-[#433878] text-3xl cursor-pointer" onClick={() => dialog.current?.showModal()} />
            <div className="text-xl bg-[#7E60BF] text-white rounded-xl p-2 cursor-pointer" onClick={() => router.push("/dashboard/student/create")}>
              <IoMdAdd />
            </div>
          </div>
        </div>

        <Suspense>
          <Filter ref={dialog} action={handleFilter} filterData={filterData} selectedValues={selectedPrograms} />
        </Suspense>

        {isMobile ? (
          <MobileTable loading={loading} data={students || []} columns={tableMap.columns} options={(row: StudentReport) => tableMap.options(row, getStudents)} />
        ) : (
          <Table loading={loading} data={students || []} columns={tableMap.columns} options={(row: StudentReport) => tableMap.options(row, getStudents)} />
        )}
      </div>

      <Suspense>
        <Pagination currentPage={pagination.current} totalPages={pagination.total} onPageChange={handlePagination} />
      </Suspense>
    </div>
  );
}

export default Reports;
