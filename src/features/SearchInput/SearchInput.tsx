import { UiInput } from "@/shared";
import { ComponentProps } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

type TSearchInput = {} & ComponentProps<"input">;

export default function SearchInput({ value, onChange }: TSearchInput) {
  return (
    <UiInput
      type="text"
      value={value}
      name="search"
      onChange={onChange}
      additionalStyle="mb-[16px] py-[9px] pl-[15px] pr-[23px]"
      borderColor="lightGrey"
      isRounded
      isPadding={false}
      sizeInput="lg"
      leftIcon={<FaMagnifyingGlass className="mr-[12px]" />}
      placeholder="Введите фио или номерной знак"
    />
  );
}
