import { ChangeEvent } from "react";
import { IoIosCheckmark } from "react-icons/io";

interface IUiCheckBox {
  idInput: string;
  value: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function UiCheckBox({
  idInput,
  value,
  onChange,
  checked,
}: IUiCheckBox) {
  return (
    <div className="w-5 h-5 min-[1750px]:w-7 min-[1750px]:h-7 relative">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        id={idInput}
        className="w-5 h-5 min-[1750px]:w-7 min-[1750px]:h-7 cursor-pointer appearance-none border border-secondary-green rounded-md hover:border-2 checked:bg-no-repeat checked:bg-center checked:border-2 "
      />

      {checked && (
        <IoIosCheckmark className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full h-full text-[#262524]" />
      )}
    </div>
  );
}
