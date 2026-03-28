import { components, OptionProps } from "react-select";
import { CarOption } from "../model/useSelectCar";
import { declensionWord } from "@/shared/lib";

export const CarOptionCard = (props: OptionProps<CarOption>) => {
  const { data } = props.data;

  return (
    <components.Option {...props}>
      <div className="flex flex-col gap-1 text-xs">
        <span className="font-semibold text-sm">{data.name}</span>
        <span>Тип: {data.type}</span>
        <span>
          Грузоподъёмность: {data?.weight}{" "}
          {declensionWord(Number(data?.weight), ["тонна", "тонны", "тонн"])}
        </span>
      </div>
    </components.Option>
  );
};
