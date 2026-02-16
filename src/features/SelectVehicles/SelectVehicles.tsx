import Select, { SingleValue } from "react-select";
import { useSelectVehicles, VehicleOption } from "./model/useSelectVehicles";
import { VehicleOptionCard } from "./ui/VehicleOptionCard";
import { StateSetter } from "@/shared/types";

interface Props {
  value: number;
  setter: StateSetter<number>;
}
export const SelectVehicles = ({ value, setter }: Props) => {
  const { options } = useSelectVehicles();
  return (
    <Select<VehicleOption, false>
      options={options}
      isClearable
      placeholder="Выберите автомобиль"
      value={options.find((o) => Number(o.value) === value) ?? null}
      onChange={(option: SingleValue<VehicleOption>) =>
        setter(Number(option?.value) ?? "")
      }
      components={{
        Option: VehicleOptionCard,
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
