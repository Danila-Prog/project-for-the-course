import clsx from "clsx";
import { ComponentProps, ReactElement } from "react";

interface IUiButton extends ComponentProps<"button"> {
  textButton: string | ReactElement;
  sizeButton: "sm" | "md" | "lg" | "full";
  sizesText?: string;
  className?: string;
  rounded?: string;
  handleClick?: () => void;
}
export default function UiButton({
  textButton,
  sizeButton,
  sizesText = "text-[21px]",
  className,
  rounded = "rounded-[16px]",
  handleClick,
  ...buttonProps
}: IUiButton) {
  const sizesButton = {
    sm: "w-[140px] h-[40px]",
    md: "w-48 h-[52px]",
    lg: "w-[320px] h-[60px]",
    full: "w-full",
  }[sizeButton];

  return (
    <button
      onClick={handleClick}
      className={clsx(
        sizesButton,
        sizesText,
        className,
        rounded,
        "flex justify-center items-center font-medium bg-button-grey text-white transition hover:bg-[#464646] disabled:opacity-70"
      )}
      {...buttonProps}
    >
      {textButton}
    </button>
  );
}
