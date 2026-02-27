"use client";

import { ChangeEvent, useState } from "react";
import { SearchInput } from "@/shared/ui/SearchInput";
import { useSearchParams } from "next/navigation";
import {
  CurrentTabLogistician,
  FilterDrivers,
  LogisticianListCard,
  LogisticianTabs,
  Filters,
} from "@/features/Logistician";

export const FILTERS: Filters = {
  search: "",
  experienceFrom: "",
  experienceBefore: "",
  capacityFrom: "",
  capacityBefore: "",
  typeCar: "",
} as const;

export const Logistician = () => {
  const [filters, setFilters] = useState(FILTERS);

  const searchParams = useSearchParams();

  const currentTab = (searchParams?.get("tabLogistician") ??
    "allDrivers") as CurrentTabLogistician;

  const handleFiltersChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex mt-[20px] mb-[30px]">
      <section className="h-full flex flex-col gap-5">
        <LogisticianTabs currentTab={currentTab} />

        <FilterDrivers
          filters={filters}
          handleFiltersChange={handleFiltersChange}
          currentTab={currentTab}
        />
      </section>

      <main className="bg-white w-[71%] px-[40px] pt-[30px] pb-[40px] rounded-[10px]">
        <SearchInput
          value={filters.search}
          onChange={handleFiltersChange}
          placeholder={`Введите фио ${currentTab !== "allDrivers" ? "или номерной знак" : ""}`}
        />

        <LogisticianListCard filters={filters} currentTab={currentTab} />
      </main>
    </div>
  );
};
