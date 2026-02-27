import { UiInput, SelectTypeCar } from "@/shared";
import { CurrentTabLogistician, Filters } from "../lib/types";
import { ChangeEvent } from "react";

interface IFiltersResearchUsers {
  filters: Filters;
  handleFiltersChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  currentTab: CurrentTabLogistician;
}

export const FilterDrivers = ({
  filters,
  handleFiltersChange,
  currentTab,
}: IFiltersResearchUsers) => {
  return (
    <aside className="bg-white mr-[30px] rounded-[10px] px-[23px] pt-[15px] pb-[40px] grid gap-[25px] h-full">
      <h2 className="text-center mx-auto font-bold">
        Фильтры поиска сотрудника
      </h2>

      {currentTab !== "allDrivers" && (
        <>
          <div>
            <p className="font-bold text-[15px] mb-[12px]">Тип автомобиля</p>

            <SelectTypeCar
              value={filters.typeCar}
              onChange={handleFiltersChange}
            />
          </div>

          <div>
            <p className="font-bold text-[15px] mb-[12px]">Грузоподъёмность</p>

            <div className="flex">
              <UiInput
                type="number"
                placeholder="От"
                sizeInput="sm"
                isPadding
                borderColor="lightGrey"
                isRounded
                additionalStyle="mr-[10px]"
                value={filters.capacityFrom}
                name="capacityFrom"
                onChange={handleFiltersChange}
              />

              <UiInput
                type="number"
                placeholder="До"
                sizeInput="sm"
                isPadding
                borderColor="lightGrey"
                isRounded
                value={filters.capacityBefore}
                name="capacityBefore"
                onChange={handleFiltersChange}
              />
            </div>
          </div>
        </>
      )}

      <div>
        <p className="font-bold text-[15px] mb-[12px]">Стаж водителя</p>

        <div className="flex">
          <UiInput
            type="number"
            placeholder="От"
            sizeInput="sm"
            isPadding={true}
            borderColor="lightGrey"
            isRounded={true}
            additionalStyle="mr-[10px]"
            value={filters.experienceFrom}
            name="experienceFrom"
            onChange={handleFiltersChange}
          />

          <UiInput
            type="number"
            placeholder="До"
            sizeInput="sm"
            isPadding={true}
            borderColor="lightGrey"
            isRounded={true}
            value={filters.experienceBefore}
            name="experienceBefore"
            onChange={handleFiltersChange}
          />
        </div>
      </div>
    </aside>
  );
};
