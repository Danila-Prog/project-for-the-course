"use client";

import clsx from "clsx";
import { useState } from "react";
import Select, { SingleValue } from "react-select";
import { useSelectCar, CarOption } from "./model/useSelectCar";
import { CarOptionCard } from "./ui/CarOptionCard";

interface Props {
  value: number;
  setter: (val: number) => void;
  isDisabled: boolean;
  weight: number;
  label?: string;
  idSelect?: string;
}

export const SelectCar = ({
  value,
  setter,
  isDisabled,
  weight,
  label,
  idSelect,
}: Props) => {
  const { options } = useSelectCar(weight);
  const [isFocused, setIsFocused] = useState(false);

  const isFloating = isFocused || !!value;

  const select = (
    <Select<CarOption, false>
      inputId={idSelect}
      options={options}
      isClearable
      placeholder=""
      isDisabled={isDisabled}
      value={options.find((o) => Number(o.value) === value) ?? null}
      onChange={(option: SingleValue<CarOption>) =>
        setter(option ? Number(option.value) : 0)
      }
      components={{
        Option: CarOptionCard,
      }}
      className="text-xs sm:text-sm min-[1750px]:text-lg font-medium"
      styles={{
        control: (styles) => ({
          ...styles,
          border: "2px solid rgba(168, 168, 168, 0.4)",
          boxShadow: "none",
          borderRadius: "1rem",
          padding: "0.25rem 0.875rem",
          ":hover": {
            borderColor: "rgba(168, 168, 168, 0.4)",
          },
          ":focus-within": {
            borderColor: "#37897b",
          },
        }),
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );

  return (
    <div className="relative">
      {select}
      <label
        htmlFor={idSelect}
        className={clsx(
          "absolute left-3 text-primary-gray text-[0.65rem] sm:text-xs min-[1750px]:text-base transition-all duration-300 pointer-events-none",
          isFloating
            ? "top-2 -translate-y-full bg-white px-1 rounded-md"
            : "top-1/2 -translate-y-1/2",
        )}
      >
        {label}
      </label>
    </div>
  );
};
