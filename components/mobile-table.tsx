"use client";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Column<T> = {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
};

type ActionButton<T> = {
  label: string | React.ReactNode;
  onClick: (item: T) => void;
  variant?: "default" | "destructive" | "outline" | "secondary";
  className?: string;
};

type DynamicTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  options?: ((row: T) => ActionButton<T>[]) | ActionButton<T>[];
  actions?: ((row: T) => ActionButton<T>[]) | ActionButton<T>[];
  loading?: boolean;
};

function MobileTable<T extends { id: string | number }>({ data, columns, actions = [], options = [], loading = false }: DynamicTableProps<T>) {
  const [activeDataId, setActiveDataId] = useState<string | number>();
  return (
    <div className="table-mobile-container w-full">
      <div className="data-container flex">
        {loading ? (
          <div className="text-center py-4 text-[#433878] font-semibold w-full">Loading...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-4 text-[#433878] font-semibold w-full">No data available.</div>
        ) : (
          <div className="flex flex-col w-full gap-y-4 box-border">
            {data.map((item) => {
              const rowOptions = typeof options === "function" ? options(item) : options;
              const rowActions = typeof actions === "function" ? actions(item) : actions;
              return (
                <div key={item.id} className="flex flex-col gap-y-3 w-full">
                  <div className={`flex w-full  ${activeDataId === item.id ? "max-h-[500px]" : "max-h-8"} overflow-hidden transition-[max-height] duration-300 justify-between`}>
                    <div className="flex gap-x-2">
                      <button className="rounded-full bg-[#E6E0F3] p-1 self-start" onClick={() => setActiveDataId(activeDataId === item.id ? undefined : item.id)}>
                        <MdOutlineKeyboardArrowDown className={`text-xl ${activeDataId === item.id ? "rotate-180" : ""}`} />
                      </button>
                      <div className="data-content flex flex-col gap-y-4 mt-1">
                        <div className="flex flex-col gap-y-1">
                          {columns.map((column) => (
                            <div className="data flex text-[#433878] text-sm gap-x-1" key={String(column.key)}>
                              <span className="font-semibold">{column.label}</span>
                              <span>{column.render ? column.render(item) : (item[column.key] as React.ReactNode)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex ">
                          {options.length > 0 && (
                            <div className="options flex gap-x-3">
                              {rowOptions.map((option, index) => (
                                <button key={index} className={option.className} onClick={() => option.onClick(item)}>
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex  self-start">
                      {actions.length > 0 && (
                        <div className="actions flex ">
                          {rowActions.map((action, index) => (
                            <button key={index} className={action.className} onClick={() => action.onClick(item)}>
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="line w-full h-1 rounded-full bg-[#eeebf4]"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export { MobileTable };
