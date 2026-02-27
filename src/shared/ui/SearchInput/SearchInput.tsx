import { UiInput } from "@/shared";
import { ComponentProps } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

type TSearchInput = ComponentProps<"input">;

export default function SearchInput({ ...inputProps }: TSearchInput) {
  return (
    <UiInput
      type="text"
      name="search"
      additionalStyle="mb-4 py-[9px] pl-[15px] pr-[23px]"
      borderColor="lightGrey"
      isRounded
      isPadding={false}
      sizeInput="lg"
      leftIcon={<FaMagnifyingGlass className="mr-[12px]" />}
      {...inputProps}
    />
  );
}
