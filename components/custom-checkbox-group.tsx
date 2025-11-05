"use client";
import React from "react";

type CustomCheckboxGroupProps = {
  name: string;
  values: string[];
  selectedValues?: string[];
  checkboxAction: (value: string) => void;
};

export const CustomCheckboxGroup = ({ name, values, selectedValues = [], checkboxAction }: CustomCheckboxGroupProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {values.map((value) => {
        const isSelected = selectedValues.includes(value);
        return (
          <label key={value} className="flex items-center gap-2 cursor-pointer select-none px-4 py-2">
            <input type="checkbox" name={name} value={value} defaultChecked={isSelected} className="hidden" onClick={() => checkboxAction(value)} />
            <span className="w-5 h-5 border-2 border-[#E6E0F3] bg-[#E6E0F3] rounded-full flex items-center justify-center">
              <span className={`w-2.5 h-2.5 bg-[#433878] rounded-full transform transition-transform duration-300 ${isSelected ? "scale-100" : "scale-0"}`} />
            </span>
            {value}
          </label>
        );
      })}
    </div>
  );
};
