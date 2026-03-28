"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CurrentTabLogistician,
  FilterDrivers,
  LogisticianListCard,
  Filters,
} from "@/features/Logistician";

export const FILTERS: Filters = {
  experienceFrom: "",
  experienceBefore: "",
  capacityFrom: "",
  capacityBefore: "",
  typeCar: "",
} as const;

export const Logistician = () => {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState(() => ({
    search: searchParams.get("search") ?? "",
    ...FILTERS,
  }));

  useEffect(() => {
    const urlSearch = searchParams.get("search") ?? "";
    setFilters((prev) =>
      prev.search === urlSearch ? prev : { ...prev, search: urlSearch },
    );
  }, [searchParams]);

  const currentTab = (searchParams?.get("tabLogistician") ??
    "allDrivers") as CurrentTabLogistician;

  const handleFiltersChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col min826:flex-row min826:justify-between max-min826:gap-5">
      <section className="h-full flex flex-col gap-5 md:mr-6">
        <FilterDrivers
          filters={filters}
          handleFiltersChange={handleFiltersChange}
          currentTab={currentTab}
        />
      </section>

      <main className="flex-1 min-w-0 bg-white px-[40px] pt-[30px] pb-[40px] rounded-lg">
        <LogisticianListCard filters={filters} currentTab={currentTab} />
      </main>
    </div>
  );
};
