"use client";
import { SearchBar } from "@/components/search-bar";
import { VscSettings } from "react-icons/vsc";
import { Filter } from "@/components/filter";
import { Payment, PaymentTable } from "@/types/payments";
import { Table } from "@/components/table";
import { api } from "@/lib/api";
import { tableMap } from "./table-map";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@/components/pagination";
import axios from "axios";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { MobileTable } from "@/components/mobile-table";
import { Suspense } from "react";

function Payments() {
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const isMobile = useIsMobile(1024);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [payments, setPayments] = useState<Payment[]>();
  const [pagination, setPagination] = useState<{ current: number; total: number }>({ current: 1, total: 1 });
  const [paymentsYear, setPaymentsYear] = useState<string[]>([]);

  const filter = [
    {
      inputName: "TAHUN",
      inputType: "radio",
      inputValue: paymentsYear,
    },
    {
      inputName: "DATA",
      inputType: "radio",
      inputValue: ["Semua", "Tanpa Identitas"],
    },
  ];

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("name", value);
    params.set("page", "1");
    router.push(`/dashboard/payment?${params.toString()}`);
  }

  function handleFilter(formData: FormData) {
    const year = formData.get("TAHUN") as string;
    const orphan = formData.get("DATA") as string;
    const params = new URLSearchParams(searchParams.toString());

    if (year === "Semua") {
      params.delete("year");
    } else {
      params.set("year", year);
    }

    if (orphan === "Semua") {
      params.delete("orphaned");
    } else if (orphan === "Tanpa Identitas") {
      params.set("orphaned", "true");
    }

    params.set("page", "1");
    router.push(`/dashboard/payment?${params.toString()}`);
  }

  function handlePagination(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/dashboard/payment?${params.toString()}`);
  }

  const getPayments = useCallback(async () => {
    try {
      const params = searchParams.toString();
      const { data } = await api.get(`/api/payments/read?${params}`);
      if (!data.success) throw new Error(data.message);
      setPayments(data.data.payments);
      setPagination({ current: data.data.pagination.currentPage, total: data.data.pagination.totalPages });

      const uniqueYears = Array.from(new Set(data.data.payments.map((payment: Payment) => String(payment.year)))) as string[];
      setPaymentsYear(["Semua", ...uniqueYears]);
    } catch (err) {
      if (axios.isAxiosError(err)) console.error(err.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    getPayments();
  }, [getPayments]);

  return (
    <div className="payment_container h-screen flex flex-col gap-y-4 justify-between">
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between items-center">
          <div className="w-8/12 lg:w-5/12">
            <Suspense>
              <SearchBar action={handleSearch} />
            </Suspense>
          </div>
          <VscSettings className="text-[#433878] text-3xl cursor-pointer" onClick={() => dialog.current?.showModal()} />
        </div>
        <Suspense>
          <Filter ref={dialog} action={handleFilter} filterData={filter} />
        </Suspense>
        {isMobile ? (
          <MobileTable
            loading={loading}
            data={payments ? payments : []}
            actions={(row: PaymentTable) => tableMap.actions(row, getPayments)}
            columns={tableMap.columns}
            options={(row: PaymentTable) => tableMap.options(row, getPayments)}
          />
        ) : (
          <Table
            loading={loading}
            data={payments ? payments : []}
            actions={(row: PaymentTable) => tableMap.actions(row, getPayments)}
            columns={tableMap.columns}
            options={(row: PaymentTable) => tableMap.options(row, getPayments)}
          />
        )}
      </div>
      <Suspense>
        <Pagination currentPage={pagination.current} totalPages={pagination.total} onPageChange={handlePagination} />
      </Suspense>
    </div>
  );
}

export default Payments;
