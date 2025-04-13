"use client";
import React from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-4 ">
      <button
        className={`px-2 py-2 rounded-full ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#7E60BF] text-white"}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IoArrowBack />
      </button>
      <span className="text-[#433878] font-semibold text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={`px-2 py-2 rounded-full ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-[#7E60BF] text-white"}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <IoArrowForward />
      </button>
    </div>
  );
}

export { Pagination };
