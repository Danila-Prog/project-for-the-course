"use client";

import useUserLogistician from "./model/useUserLogistician";
import { SearchInput } from "@/features/SearchInput";
import FiltersResearchUsers from "./ui/FiltersResearchUsers";
import DriversFilterTabs from "./ui/DriverFilterTabs";
import useRenderForm from "./model/useRenderForm";
import useRenderDriver from "./model/useRenderDriver";

export default function UserLogistician() {
  const { activeDriver, handleActiveDriver } = useUserLogistician();

  const {
    formOrder,
    formEditingOrder,
    deleteOrder,
    setSelectedDriverId,
    toggleFormOrder,
    toggleFormEditingOrder,
    toggleFormDeleteOrder,
  } = useRenderForm();

  const {
    companyFilteredDrivers,
    renderDriverCard,
    handleFiltersChange,
    filters,
  } = useRenderDriver(
    activeDriver,
    setSelectedDriverId,
    toggleFormOrder,
    toggleFormEditingOrder,
    toggleFormDeleteOrder
  );

  return (
    <div className="flex mt-[20px] mb-[30px]">
      <FiltersResearchUsers
        filters={filters}
        handleFiltersChange={handleFiltersChange}
      />
      <main className="bg-white w-[71%] px-[40px] pb-[40px] rounded-[10px]">
        <DriversFilterTabs handleActiveDriver={handleActiveDriver} />

        <SearchInput value={filters.search} onChange={handleFiltersChange} />

        <div className="grid gap-[25px]">
          {companyFilteredDrivers.map(renderDriverCard)}
        </div>
      </main>

      {formOrder}

      {formEditingOrder}

      {deleteOrder}
    </div>
  );
}
