import { UiInput } from "@/shared";
import { IFilters } from "../lib/types";
import { ChangeEvent } from "react";

interface IFiltersResearchUsers {
  filters: IFilters;
  handleFiltersChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export default function FiltersResearchUsers({
  filters,
  handleFiltersChange,
}: IFiltersResearchUsers) {
  return (
    <aside className="bg-white mr-[30px] rounded-[10px] px-[23px] pt-[15px] pb-[40px] grid gap-[25px] h-full">
      <h1 className="text-center mx-auto font-bold">
        Фильтры поиска сотрудника
      </h1>

      <div>
        <p className="font-bold text-[15px] mb-[12px]">Тип автомобиля</p>

        <select
          className="w-full h-[40px] px-[8px] text-[15px] rounded-[10px] border-2 border-[#d6d6d6] appearance-none"
          value={filters.typeCar}
          name="typeCar"
          onChange={handleFiltersChange}
        >
          <option value="">Тип автомобиля</option>
          <option value="passenger">Легковой</option>
          <option value="truck">Грузовой</option>
        </select>
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
}
