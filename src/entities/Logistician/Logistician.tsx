"use client";

import { ChangeEvent, useState } from "react";
import { SearchInput } from "@/features/SearchInput";
import FiltersResearchUsers from "./ui/FiltersResearchUsers";
import useRenderForm from "./model/useRenderForm";
import { useSearchParams } from "next/navigation";
import { LogisticianTabs } from "./ui/LogisticianTabs";
import { LogisticianListCard } from "./ui/LogisticianListCard";
import { FILTERS } from "./lib/consts";
import { CurrentTabLogistician } from "./lib/types";

export const Logistician = () => {
  const [isDeleteOrder, setIsDeleteOrder] = useState<boolean>(false);
  const [isEditOrder, setIsEditOrder] = useState(false);

  const [filters, setFilters] = useState(FILTERS);

  const searchParams = useSearchParams();
  const currentTab = (searchParams?.get("tabLogistician") ??
    "allDrivers") as CurrentTabLogistician;

  const toggleIsDeleteOrder = () => {
    setIsDeleteOrder((curr) => !curr);
  };

  const toggleIsEditOrder = () => {
    setIsEditOrder((curr) => !curr);
  };

  const {
    formOrder,
    formEditingOrder,
    deleteOrder,
    setSelectedDriverId,
    toggleFormDeleteOrder,
    toggleFormEditingOrder,
    toggleFormOrder,
  } = useRenderForm(toggleIsDeleteOrder, toggleIsEditOrder);

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

        <FiltersResearchUsers
          filters={filters}
          handleFiltersChange={handleFiltersChange}
          currentTab={currentTab}
        />
      </section>

      <main className="bg-white w-[71%] px-[40px] pt-[30px] pb-[40px] rounded-[10px]">
        <SearchInput
          value={filters.search}
          onChange={handleFiltersChange}
          placeholder={`Введите фио ${currentTab === "activeDrivers" ? "или номерной знак" : ""}`}
        />

        <LogisticianListCard
          filters={filters}
          isDeleteOrder={isDeleteOrder}
          isEditOrder={isEditOrder}
          currentTab={currentTab}
          setSelectedDriverId={setSelectedDriverId}
          onFormDeleteOrder={toggleFormDeleteOrder}
          onFormEditingOrder={toggleFormEditingOrder}
          onFormOrder={toggleFormOrder}
        />
      </main>

      {formOrder}

      {formEditingOrder}

      {deleteOrder}
    </div>
  );
};
