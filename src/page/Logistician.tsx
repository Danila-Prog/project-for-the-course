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
  sortBy: "",
  sortOrder: "asc",
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
    e:
      | ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { target: { name: string; value: string } },
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="flex flex-col gap-5 flex-1 min-w-0 bg-white px-6 py-3 sm:px-8 sm:py-5 lg:px-10 lg:py-7 rounded-xl">
      <FilterDrivers
        filters={filters}
        handleFiltersChange={handleFiltersChange}
        currentTab={currentTab}
      />

      <LogisticianListCard filters={filters} currentTab={currentTab} />
    </main>
  );
};
