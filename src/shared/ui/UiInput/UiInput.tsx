import clsx from "clsx";
import { ComponentProps, ReactElement } from "react";

interface IUiInput extends ComponentProps<"input"> {
  sizeInput?: "sm" | "lg";
  borderColor?: "none" | "lightGrey";
  isRounded: boolean;
  isPadding: boolean;
  leftIcon?: ReactElement;
}
export default function UiInput({
  sizeInput = "lg",
  borderColor = "none",
  className,
  isRounded = true,
  isPadding = true,
  leftIcon,
  ...inputProps
}: IUiInput) {
  const sizesInput = {
    sm: "w-[8vw]",
    lg: "w-full",
  }[sizeInput];

  const borders_color = {
    none: "",
    lightGrey: "border-2 border-[#d6d6d6]",
  }[borderColor];

  return (
    <>
      {leftIcon && <div>{leftIcon}</div>}

      <input
        className={clsx(
          sizesInput,
          borders_color,
          className,
          isRounded ? "rounded-[10px]" : "",
          isPadding ? "px-[16px] py-[6px]" : "",
          "text-[15px] font-medium"
        )}
        {...inputProps}
      />
    </>
  );
}
