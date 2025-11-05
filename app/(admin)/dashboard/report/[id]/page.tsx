"use client";
import { api } from "@/lib/api";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Student } from "@/types/student";
import { Payment } from "@/types/payments";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { MobileTable } from "@/components/mobile-table";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { Table } from "@/components/table";
import { tableMap } from "./table-map";
import { Pagination } from "@/components/pagination";

type studentReport = Omit<Student, "payments" | "updatedAt">;
type studentPaymentReport = Omit<Payment, "studentId">;

function ReportDetail() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const isMobile = useIsMobile(1024);
  const searchParams = useSearchParams();
  const [student, setStudent] = useState<studentReport>();
  const [studentPayment, setStudentPayment] = useState<studentPaymentReport[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<{ current: number; total: number }>({ current: 1, total: 1 });

  function handlePagination(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/dashboard/payment?${params.toString()}`);
  }

  useEffect(() => {
    async function getStudentReport() {
      try {
        const { data } = await api.get(`/api/students/read?studentId=${id}`);
        const fetchedStudent = data.data.students[0];
        if (!data.success) throw new Error(data.message);
        setStudent(fetchedStudent);
      } catch (error) {
        if (axios.isAxiosError(error)) console.error(error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
      }
    }
    getStudentReport();
  }, [id]);

  const getPayments = useCallback(async () => {
    try {
      const params = searchParams.toString();
      const { data } = await api.get(`/api/payments/read?studentId=${id}&${params}`);
      if (!data.success) throw new Error(data.message);
      setStudentPayment(data.data.payments);
      setPagination({ current: data.data.pagination.currentPage, total: data.data.pagination.totalPages });
    } catch (err) {
      if (axios.isAxiosError(err)) console.error(err.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, [searchParams, id]);

  useEffect(() => {
    getPayments();
  }, [getPayments]);
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-[#433878] text-base font-semibold">Laporan</span>
          <span className="text-[#433878] text-2xl font-bold">Siswa</span>
        </div>
        <button className="px-2 py-2 rounded-xl text-xl bg-[#7E60BF] text-white" onClick={() => router.push("/dashboard/report")}>
          <IoArrowBack />
        </button>
      </div>
      <div className="student-identity__container flex gap-x-8">
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-2">
            <span className="text-[#433878] text-xl font-semibold">Nama</span>
            <span className="text-[#433878] text-base">{student?.name}</span>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-[#433878] text-xl font-semibold">Email</span>
            <span className="text-[#433878] text-base">{student?.email}</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-2">
            <span className="text-[#433878] text-xl font-semibold">Alamat</span>
            <span className="text-[#433878] text-base">{student?.address}</span>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-[#433878] text-xl font-semibold">Tempat, Tanggal Lahir</span>
            <span className="text-[#433878] text-base">{student?.birthday}</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-2">
            <span className="text-[#433878] text-xl font-semibold">Tanggal Daftar</span>
            <span className="text-[#433878] text-base">{student?.createdAt.split("T")[0]}</span>
          </div>
        </div>
      </div>
      <div className="program-chosen__container flex flex-wrap gap-x-3">
        {student?.programs.map((program) => (
          <div key={program.id} className="bg-[#E6E0F3] text-xs font-semibold text-[#7E60BF] px-4 py-2 rounded-full">
            {program.name}
          </div>
        ))}
      </div>
      {isMobile ? (
        <MobileTable loading={loading} data={studentPayment ? studentPayment : []} columns={tableMap.columns} />
      ) : (
        <Table loading={loading} data={studentPayment ? studentPayment : []} columns={tableMap.columns} />
      )}
      <Suspense>
        <Pagination currentPage={pagination.current} totalPages={pagination.total} onPageChange={handlePagination} />
      </Suspense>
    </div>
  );
}

export default ReportDetail;
