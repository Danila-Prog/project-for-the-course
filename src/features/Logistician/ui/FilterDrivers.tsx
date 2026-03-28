import { UiInput } from "@/shared";
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
    <aside className="bg-white rounded-lg py-4 px-5 flex flex-col gap-5 h-full flex-shrink-0">
      {currentTab !== "allDrivers" && (
        <>
          <fieldset>
            <legend className="font-medium text-[16px] mb-1">
              Грузоподъёмность
            </legend>

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
          </fieldset>
        </>
      )}

      <fieldset>
        <legend className="font-medium text-[16px] mb-1 ">Стаж</legend>

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
      </fieldset>
    </aside>
  );
};
