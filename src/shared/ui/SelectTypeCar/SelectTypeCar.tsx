import { ComponentProps } from "react";

export const SelectTypeCar = ({
  value,
  onChange,
}: Pick<ComponentProps<"select">, "value" | "onChange">) => {
  return (
    <select
      className="w-full h-[40px] px-[8px] text-[15px] rounded-[10px] border-2 border-[#d6d6d6] appearance-none"
      value={value}
      name="typeCar"
      onChange={onChange}
    >
      <option value="">Выберите тип автомобиля</option>
      <option value="passenger">Легковой</option>
      <option value="truck">Грузовой</option>
    </select>
  );
};
