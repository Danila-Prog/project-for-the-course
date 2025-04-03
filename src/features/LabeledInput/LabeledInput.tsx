import { UiInput } from "@/shared";
import clsx from "clsx";
import { HTMLInputTypeAttribute } from "react";

interface ILabeledInput {
  label: string;
  typeInput?: HTMLInputTypeAttribute;
  sizeLabel?: "sm" | "md";
  idInput: string;
  placeholder: string;
}
export default function LabeledInput({
  label,
  typeInput = "text",
  sizeLabel = "sm",
  placeholder,
  idInput,
}: ILabeledInput) {
  const sizesLabel = {
    sm: "text-[15px]",
    md: "text-[17px]",
  }[sizeLabel];

  return (
    <div>
      <label
        htmlFor={idInput}
        className={clsx("font-medium mb-[5px]", sizesLabel)}
      >
        {label}
      </label>

      <UiInput
        type={typeInput}
        id={idInput}
        sizeInput="lg"
        borderColor="lightGrey"
        isRounded
        isPadding
        placeholder={placeholder}
      />
    </div>
  );
}
