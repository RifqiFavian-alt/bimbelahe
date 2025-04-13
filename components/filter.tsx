"use client";
import React, { ForwardedRef, forwardRef } from "react";
import { useForwardRef } from "@/hooks/use-forward-ref";
import { IoClose } from "react-icons/io5";

type filterProps = {
  action: (formData: FormData) => void;
  filterData: {
    inputName: string;
    inputType: string;
    inputValue: string[];
  }[];
};

const Filter = forwardRef(function Filter({ action, filterData }: filterProps, refDialog: ForwardedRef<HTMLDialogElement>) {
  const dialogElement = useForwardRef<HTMLDialogElement>(refDialog);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    action(formData);
    dialogElement.current?.close();
  };

  return (
    <dialog ref={dialogElement} className="w-full max-w-lg max-h-full px-6 py-6 pb-10 relative outline-none rounded-md">
      <IoClose className="absolute top-5 cursor-pointer right-5 text-xl bg-[#B2A0DA] bg-opacity-40 rounded-full p-1 text-[#433878]" onClick={() => dialogElement.current?.close()} />
      <span className="font-semibold text-xl text-[#433878]">Filter</span>
      <form onSubmit={handleSubmit}>
        {filterData.map((filter, i) => (
          <div className="flex flex-col mt-5 gap-y-4" key={i}>
            <span className="text-[#8A82AC]">{filter.inputName}</span>
            <div className="flex gap-x-5">
              {filter.inputType === "select" ? (
                <select name={filter.inputName} className="border p-2 rounded-md">
                  {filter.inputValue.map((value, i) => (
                    <option key={i} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              ) : (
                filter.inputValue.map((value, i) => (
                  <div key={i} className="flex gap-x-1">
                    <input type={filter.inputType} name={filter.inputName} id={value} value={value} className="outline-none" />
                    <label htmlFor={value}>{value}</label>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}

        <div className="flex gap-x-5 mt-6 justify-end items-center">
          <button type="submit" className="bg-[#7E60BF] text-white px-5 py-2 rounded-md">
            Simpan
          </button>
          <button type="button" className="bg-[#E6E0F3] text-[#433878] px-5 py-2 rounded-md" onClick={() => dialogElement.current?.close()}>
            Batal
          </button>
        </div>
      </form>
    </dialog>
  );
});

export { Filter };
