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
    <aside className="flex gap-5 h-full flex-shrink-0 flex-wrap justify-center">
      {currentTab !== "allDrivers" && (
        <>
          <fieldset className="max-w-[400px]">
            <legend className="font-medium text-sm min-[1700px]:text-base mb-3">
              Грузоподъёмность авто
            </legend>

            <div className="flex justify-between gap-2.5">
              <UiInput
                type="number"
                borderColor="lightGrey"
                id="capacityFrom"
                value={filters.capacityFrom}
                name="capacityFrom"
                onChange={handleFiltersChange}
                label="От"
              />

              <UiInput
                type="number"
                borderColor="lightGrey"
                value={filters.capacityBefore}
                id="capacityBefore"
                name="capacityBefore"
                onChange={handleFiltersChange}
                label="До"
              />
            </div>
          </fieldset>
        </>
      )}

      <fieldset className="max-w-[400px]">
        <legend className="font-medium text-sm mb-3 min-[1700px]:text-base">
          Стаж
        </legend>

        <div className="flex justify-between gap-2.5">
          <UiInput
            type="number"
            borderColor="lightGrey"
            isRounded
            value={filters.experienceFrom}
            name="experienceFrom"
            onChange={handleFiltersChange}
            label="От"
          />

          <UiInput
            type="number"
            placeholder="До"
            borderColor="lightGrey"
            isRounded={true}
            value={filters.experienceBefore}
            name="experienceBefore"
            onChange={handleFiltersChange}
            label="До"
          />
        </div>
      </fieldset>
    </aside>
  );
};
