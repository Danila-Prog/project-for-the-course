"use client";

import clsx from "clsx";
import { useState } from "react";
import AsyncSelect from "react-select/async";
import useFetchAddress from "./model/useFetchAddress";

type TSelectedOption = {
  value: string;
  data: { id: number };
};

interface IInputDropDown {
  idInputDropDown?: string;
  selectedOption?: string;
  setSelectedOption: (val: string) => void;
  label?: string;
  classNameContainer?: string;
}

export default function InputDropDown({
  classNameContainer,
  idInputDropDown,
  selectedOption,
  setSelectedOption,
  label,
}: IInputDropDown) {
  const [isFocused, setIsFocused] = useState(false);
  const fetchAddress = useFetchAddress(setSelectedOption);

  const isFloating = isFocused || !!selectedOption;

  const select = (
    <AsyncSelect
      inputId={idInputDropDown}
      cacheOptions
      isClearable
      value={selectedOption ? { value: selectedOption, data: { id: 0 } } : null}
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
      loadOptions={fetchAddress}
      getOptionLabel={(option) => option.value}
      getOptionValue={(option: TSelectedOption) =>
        option.value && String(option.value)
      }
      onChange={(val) => setSelectedOption(val?.value ?? "")}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder=""
    />
  );

  return (
    <div className={clsx("relative", classNameContainer)}>
      {select}

      <label
        htmlFor={idInputDropDown}
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
}
