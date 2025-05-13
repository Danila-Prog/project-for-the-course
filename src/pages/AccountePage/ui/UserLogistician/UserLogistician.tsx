"use client";
import { CardUser } from "@/entities/CardUser";
import useUserLogistician from "./model/useUserLogistician";
import mockImage from "/public/icons/mockImage.webp";
import { SearchInput } from "@/features/SearchInput";
import FiltersResearchUsers from "./ui/FiltersResearchUsers";
import DriversFulterTabs from "./ui/DriverFilterTabs";

export default function UserLogistician() {
  const {
    filters,
    handleFiltersChange,
    // activeDrive,
    // allDriverFilter,
    // activeDriverFilter,
    // handleCloseModalFormOrder,
    // handleCloseModalFormEditingOrder,
    // handleCloseModalDeleteOrder,
    formOrder,
    formEditingOrder,
    deleteOrder,
    companyDrivers,
  } = useUserLogistician();

  return (
    <div className="flex mt-[20px] mb-[30px]">
      <FiltersResearchUsers />
      <main className="bg-white w-[71%] px-[40px] pb-[40px] rounded-[10px]">
        <DriversFulterTabs />

        <SearchInput value={filters.search} onChange={handleFiltersChange} />

        <div className="grid gap-[25px]">
          {companyDrivers.map((user) => (
            <CardUser
              key={user.user_id}
              nameDriver={`${user.name} ${user.surname}`}
              imageSrc={mockImage}
            />
          ))}
        </div>
      </main>

      {formOrder}

      {formEditingOrder}

      {deleteOrder}
    </div>
  );
}
