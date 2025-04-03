import clsx from "clsx";
import Link from "next/link";
import { ReactElement } from "react";

interface IRouteButton {
  path: string;
  textButton: string | ReactElement;
  sizeButton: "sm" | "md" | "lg" | "full";
  sizesText?: string;
  className?: string;
  rounded?: string;
}
export default function RouteButton({
  path,
  textButton,
  sizeButton,
  sizesText = "text-[21px]",
  className,
  rounded = "rounded-[16px]",
}: IRouteButton) {
  const sizesButton = {
    sm: "w-[140px] h-[40px]",
    md: "w-48 h-[52px]",
    lg: "w-[320px] h-[60px]",
    full: "w-full",
  }[sizeButton];
  return (
    <Link
      href={path}
      className={clsx(
        sizesButton,
        sizesText,
        className,
        rounded,
        "flex justify-center items-center font-medium bg-button-grey text-white transition hover:bg-[#464646]"
      )}
    >
      {textButton}
    </Link>
  );
}
