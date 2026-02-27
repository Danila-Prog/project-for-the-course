import { components, OptionProps } from "react-select";
import { VehicleOption } from "../model/useSelectVehicles";
import { declensionWord } from "@/shared/lib";

export const VehicleOptionCard = (props: OptionProps<VehicleOption>) => {
  const { data } = props.data;

  return (
    <components.Option {...props}>
      <div className="flex flex-col gap-1 text-xs">
        <span className="font-semibold text-sm">{data.name}</span>
        <span>Тип: {data.type}</span>
        <span>
          Грузоподъёмность: {data?.capacity}{" "}
          {declensionWord(Number(data?.capacity), ["тонна", "тонны", "тонн"])}
        </span>
      </div>
    </components.Option>
  );
};
