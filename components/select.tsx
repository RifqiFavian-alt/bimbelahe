import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import { FaExclamationCircle } from "react-icons/fa";

type Option = {
  label: string;
  value: string;
};

interface SelectProps {
  value?: string | number;
  onChange: (value: string | number) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
}

export function Select({ value, onChange, options, error, placeholder = "Pilih opsi" }: SelectProps) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-fit md:min-w-52" ref={selectRef}>
      <div className="flex flex-col bg-[#E6E0F3]  rounded-xl py-2 px-4 gap-y-1">
        <span className="text-xs text-[#7E60BF]">{placeholder}</span>
        <div className=" flex justify-between items-center w-full font-bold text-sm text-[#7E60BF] cursor-pointer" onClick={() => setOpen(!open)}>
          <span>{options.find((opt) => opt.value == value)?.label || `Pilih ${placeholder}`}</span>
          <IoChevronDown className="text-[#7E60BF] transition-transform duration-200" style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }} />
        </div>
        {error && (
          <span className="text-red-500 text-xs flex gap-x-1 items-center">
            <FaExclamationCircle />
            {error}
          </span>
        )}
      </div>
      {open && (
        <ul className="absolute w-full bg-white rounded-xl shadow-lg mt-2 py-1 z-10">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                const parsedValue = isNaN(Number(option.value)) ? option.value : Number(option.value);
                onChange(parsedValue);
                setOpen(false);
              }}
              className={`cursor-pointer px-4 py-2 text-[#7E60BF] hover:bg-[#E6E0F3] transition-all text-sm ${value === option.value ? "font-bold" : ""}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
