"use client";
import React, { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import { useForwardRef } from "@/hooks/use-forward-ref";
import { IoClose } from "react-icons/io5";
import { CustomCheckboxGroup } from "./custom-checkbox-group";

type filterProps = {
  action: (formData: FormData, selectedValues?: string[]) => void;
  selectedValues?: string[];
  filterData: {
    inputName: string;
    inputType: string;
    inputValue: string[];
  }[];
};

const Filter = forwardRef(function Filter({ action, filterData, selectedValues = [] }: filterProps, refDialog: ForwardedRef<HTMLDialogElement>) {
  const dialogElement = useForwardRef<HTMLDialogElement>(refDialog);
  const [selectedValuesArr, setSelectedValuesArr] = useState<string[]>(selectedValues);

  const prevValuesRef = useRef<string[]>([]);

  useEffect(() => {
    const prev = prevValuesRef.current;
    const next = selectedValues;

    const areArraysEqual = next.length === prev.length && next.every((val) => prev.includes(val));

    if (!areArraysEqual) {
      setSelectedValuesArr(next);
      prevValuesRef.current = next;
    }
  }, [selectedValues]);

  const handleCheckboxChange = (value: string) => {
    setSelectedValuesArr((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    action(formData, selectedValuesArr);
    dialogElement.current?.close();
  };

  return (
    <dialog ref={dialogElement} className="w-full max-w-lg max-h-full px-6 py-6 pb-10 relative outline-none rounded-md">
      <IoClose className="absolute top-5 cursor-pointer right-5 text-xl bg-[#B2A0DA] bg-opacity-40 rounded-full p-1 text-[#433878]" onClick={() => dialogElement.current?.close()} />
      <span className="font-semibold text-xl text-[#433878]">Filter</span>

      <form onSubmit={handleSubmit}>
        {filterData.map((filter, i) => (
          <div className="flex flex-col mt-5 gap-y-4" key={i}>
            <span className="text-[#8A82AC] capitalize">{filter.inputName}</span>
            <div className="flex gap-x-5 flex-wrap">
              {filter.inputType === "checkbox" ? (
                <CustomCheckboxGroup name={filter.inputName} values={filter.inputValue} selectedValues={selectedValuesArr} checkboxAction={handleCheckboxChange} />
              ) : (
                filter.inputValue.map((value, i) => (
                  <div key={i} className="flex gap-x-1">
                    <input type={filter.inputType} name={filter.inputName} id={value + filter.inputName} value={value} className="outline-none" />
                    <label htmlFor={value + filter.inputName}>{value}</label>
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
