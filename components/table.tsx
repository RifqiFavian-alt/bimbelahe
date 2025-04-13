"use client";
import React, { useState } from "react";

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

function Table<T extends { id: string | number }>({ data, columns, actions = [], options = [], loading = false }: DynamicTableProps<T>) {
  const [selectedRowId, setSelectedRowId] = useState<string | number | null>(null);

  const handleSelectRow = (id: string | number) => {
    setSelectedRowId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <table className="min-w-full border-spacing-y-2">
        <thead>
          <tr>
            <th className="px-4 py-2 text-center font-bold text-base text-[#433878]"></th>
            {columns.map((column) => (
              <th key={String(column.key)} className="px-4 py-2 text-center font-bold text-base text-[#433878]">
                {column.label}
              </th>
            ))}
            {options.length > 0 && <th className="px-4 py-2 text-center font-bold text-base text-[#433878]">Opsi</th>}
            {actions.length > 0 && <th className="px-4 py-2 text-center font-bold text-base text-[#433878]"></th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 2} className="text-center py-4 text-[#433878] font-semibold">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 2} className="text-center py-4 text-[#433878] font-semibold">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((item) => {
              const rowOptions = typeof options === "function" ? options(item) : options;
              const rowActions = typeof actions === "function" ? actions(item) : actions;
              return (
                <tr key={item.id} className={`text-center hover:bg-gray-100 cursor-pointer`} onClick={() => handleSelectRow(item.id)}>
                  <td className="px-4 py-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={selectedRowId === item.id} readOnly className="hidden" />
                      <span className={`w-5 h-5 border-2 border-[#E6E0F3] bg-[#E6E0F3] rounded-full flex items-center justify-center `}>
                        <span className={`w-2.5 h-2.5 bg-[#433878] rounded-full transition-transform ${selectedRowId === item.id ? "scale-100" : "scale-0"}`}></span>
                      </span>
                    </label>
                  </td>

                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-4 py-2 text-sm text-[#433878]">
                      {column.render ? column.render(item) : (item[column.key] as React.ReactNode)}
                    </td>
                  ))}

                  {options.length > 0 && (
                    <td className="px-4 py-2 flex flex-wrap justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {rowOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            option.onClick(item);
                            setSelectedRowId(item.id);
                          }}
                          className={option.className}
                        >
                          {option.label}
                        </button>
                      ))}
                    </td>
                  )}

                  {actions.length > 0 && (
                    <td className="py-1" onClick={(e) => e.stopPropagation()}>
                      {rowActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            action.onClick(item);
                            setSelectedRowId(item.id);
                          }}
                          className={action.className}
                        >
                          {action.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export { Table };
