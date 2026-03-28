"use client";

import Select, { SingleValue } from "react-select";
import { useSelectCar, CarOption } from "./model/useSelectCar";
import { CarOptionCard } from "./ui/CarOptionCard";

interface Props {
  value: number;
  setter: (val: number) => void;
  isDisabled: boolean;
  weight: number;
}
export const SelectCar = ({ value, setter, isDisabled, weight }: Props) => {
  const { options } = useSelectCar(weight);

  return (
    <Select<CarOption, false>
      options={options}
      isClearable
      placeholder="Выберите автомобиль"
      isDisabled={isDisabled}
      value={options.find((o) => Number(o.value) === value) ?? null}
      onChange={(option: SingleValue<CarOption>) =>
        setter(option ? Number(option.value) : 0)
      }
      components={{
        Option: CarOptionCard,
      }}
      styles={{
        control: (styles) => ({
          ...styles,
          border: "2px solid #d6d6d6",
          borderRadius: "10px",
          boxShadow: "none",
          ":hover": {
            border: "2px solid #d6d6d6",
          },
          fontSize: "16px",
        }),
      }}
    />
  );
};
