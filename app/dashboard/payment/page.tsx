"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Payment } from "@/types/payments";
import { useEffect, useState } from "react";
import api from "@/lib/api";

type rawPayment = {
  success: boolean;
  message: string;
  data: {
    payments: Payment[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalPayments: number;
    };
  };
};

function Payments() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const year = searchParams.get("year") ? parseInt(searchParams.get("year")!, 10) : undefined;
  const id = searchParams.get("id") || undefined;

  const fetchPayments = async (page: number, year?: number, id?: string) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ page: page.toString(), limit: "10" });
      if (year) params.append("year", year.toString());
      if (id) params.append("id", id);

      const response: Response = await api.get(`/api/payments/read?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch payments");

      const data: rawPayment = await response.json();
      setPayments(data.data.payments);
      setTotalPages(data.data.pagination.totalPages);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan, silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(currentPage, year, id);
  }, [currentPage, year, id]);

  return (
    <div className="payment_container">
      <div>Payments</div>
    </div>
  );
}

export default Payments;
