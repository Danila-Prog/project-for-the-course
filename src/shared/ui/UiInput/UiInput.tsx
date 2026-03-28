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
    lightGrey:
      "border-2 border-primary-grey/40 focus-within:border-secondary-green",
  }[borderColor];

  const sizesLabel = {
    sm: "text-xs",
    md: "text-base",
  }[sizeLabel];

  return (
    <>
      {label && (
        <label
          htmlFor={idInput}
          className={clsx("mb-2 text-primary-gray", sizesLabel)}
        >
          {label}
        </label>
      )}

      <div
        className={clsx(
          bordersColor,
          sizesInput,
          isRounded ? "rounded-2xl" : "",
          isPadding ? "px-3.5 py-1.5" : "",
          additionalStyle,
          "flex justify-between items-center",
        )}
      >
        {leftIcon && <div>{leftIcon}</div>}

        <input
          className="font-medium w-full pr-[8px] bg-transparent "
          {...inputProps}
          id={idInput}
        />

        {rightIcon && (
          <button type="button" onClick={handleClickRightIcon}>
            {rightIcon}
          </button>
        )}
      </div>
    </>
  );
}
