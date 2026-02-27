import clsx from "clsx";
import { ComponentProps, ReactElement } from "react";

const sizesButton = {
  lg: "w-[320px] h-[60px]",
  full: "w-full",
};

interface IUiButton extends ComponentProps<"button"> {
  textButton: string | ReactElement;
  sizeButton?: "lg" | "full";
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
  return (
    <button
      onClick={handleClick}
      className={clsx(
        sizeButton && sizesButton[sizeButton],
        sizesText,
        className,
        rounded,
        "flex justify-center items-center font-medium bg-button-grey text-white transition hover:bg-[#464646] disabled:opacity-70",
      )}
      {...buttonProps}
    >
      {textButton}
    </button>
  );
}
