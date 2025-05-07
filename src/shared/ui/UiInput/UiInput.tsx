import clsx from "clsx";
import { ComponentProps, ReactElement } from "react";

interface IUiInput extends ComponentProps<"input"> {
  sizeInput?: "sm" | "lg";
  borderColor?: "none" | "lightGrey";
  isRounded?: boolean;
  isPadding?: boolean;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  additionalStyle?: string;
  handleClickRightIcon?: () => void;
  label?: string;
  sizeLabel?: "sm" | "md";
  idInput?: string;
}

export default function UiInput({
  sizeInput = "lg",
  borderColor = "none",
  additionalStyle,
  isRounded = true,
  isPadding = true,
  rightIcon,
  handleClickRightIcon,
  sizeLabel = "sm",
  label,
  idInput,
  leftIcon,
  ...inputProps
}: IUiInput) {
  const sizesInput = {
    sm: "w-[8vw]",
    lg: "w-full",
  }[sizeInput];

  const bordersColor = {
    none: "",
    lightGrey: "border-2 border-[#d6d6d6]",
  }[borderColor];

  const sizesLabel = {
    sm: "text-[15px]",
    md: "text-[17px]",
  }[sizeLabel];

  return (
    <div>
      {label && (
        <label
          htmlFor={idInput}
          className={clsx("font-medium mb-[5px]", sizesLabel)}
        >
          {label}
        </label>
      )}

      <div
        className={clsx(
          bordersColor,
          sizesInput,
          isRounded ? "rounded-[10px]" : "",
          isPadding ? "px-[16px] py-[6px]" : "",
          additionalStyle,
          "flex justify-between"
        )}
      >
        {leftIcon && <div>{leftIcon}</div>}

        <input
          className="text-[15px] font-medium w-full pr-[8px]"
          {...inputProps}
          id={idInput}
        />

        {rightIcon && (
          <button type="button" onClick={handleClickRightIcon}>
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
}
