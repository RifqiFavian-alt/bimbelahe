"use client";
import React from "react";
import { api } from "@/lib/api";
import { User } from "@/types/users";
import { Table } from "@/components/table";
import { SearchBar } from "@/components/search-bar";
import { useEffect, useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { tableMap } from "./table-map";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/pagination";
import axios from "axios";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { MobileTable } from "@/components/mobile-table";

function Users() {
  const router = useRouter();
  const isMobile = useIsMobile(1024);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
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

  const getUsers = useCallback(async () => {
    try {
      const params = searchParams.toString();
      const { data } = await api.get(`/api/users/read?${params}`);
      if (!data.success) throw new Error(data.message);
      setUsers(data.data.users);
      setPagination({ current: data.data.pagination.currentPage, total: data.data.pagination.totalPages });
    } catch (error) {
      if (axios.isAxiosError(error)) console.error(error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <div className="users__container h-screen flex flex-col gap-y-4 justify-between">
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between items-center">
          <div className="w-8/12 lg:w-5/12">
            <SearchBar action={handleSearch} />
          </div>
          <div className="text-xl bg-[#7E60BF] text-white rounded-xl p-2 cursor-pointer" onClick={() => router.push("/dashboard/user/create")}>
            <IoMdAdd />
          </div>
        </div>
        {isMobile ? (
          <MobileTable loading={loading} data={users ? users : []} columns={tableMap.columns} actions={(row: User) => tableMap.actions(row, getUsers)} />
        ) : (
          <Table loading={loading} data={users ? users : []} columns={tableMap.columns} actions={(row: User) => tableMap.actions(row, getUsers)} />
        )}
      </div>
      <Pagination currentPage={pagination.current} totalPages={pagination.total} onPageChange={handlePagination} />
    </div>
  );
}

export default Users;
