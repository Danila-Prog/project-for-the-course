import clsx from "clsx";
import { ComponentProps, Fragment, ReactElement } from "react";

interface IUiInput extends ComponentProps<"input"> {
  borderColor?: "none" | "lightGrey";
  isRounded?: boolean;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  additionalStyle?: string;
  handleClickRightIcon?: () => void;
  label?: string;
  idInput?: string;
}

export default function UiInput({
  borderColor = "none",
  additionalStyle,
  isRounded = true,
  rightIcon,
  handleClickRightIcon,
  label,
  idInput,
  leftIcon,
  ...inputProps
}: IUiInput) {
  const bordersColor = {
    none: "",
    lightGrey:
      "border-2 border-primary-grey/40 focus-within:border-secondary-green",
  }[borderColor];

  const Component = label ? "div" : Fragment;

  return (
    <Component className={label ? "w-full" : undefined}>
      <div
        className={clsx(
          bordersColor,
          isRounded ? "rounded-xl" : "",
          additionalStyle,
          "relative flex justify-between items-center px-3.5 py-1.5 min-[1750px]:px-5 min-[1750px]:py-3",
        )}
      >
        {leftIcon && <div className="flex-shrink-0">{leftIcon}</div>}

        <div className="relative flex-1 min-w-0">
          <input
            className="peer font-medium w-full pr-[8px] bg-transparent text-xs sm:text-sm min-[1750px]:text-lg placeholder-transparent"
            {...inputProps}
            id={idInput}
            placeholder=" "
          />

          {label && (
            <label
              htmlFor={idInput}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-primary-gray text-[0.65rem] sm:text-xs min-[1750px]:text-base transition-all duration-300 pointer-events-none peer-focus-within:top-0 peer-focus-within:-left-1 peer-focus-within:-translate-y-full peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-full peer-focus-within:bg-white peer-focus-within:px-1 peer-focus-within:rounded-md peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded-md peer-[&:not(:placeholder-shown)]:-left-1 peer-focus-within:[&:not(:placeholder-shown)]:top-0 peer-[:-webkit-autofill]:top-0 peer-[:-webkit-autofill]:-translate-y-full peer-[:-webkit-autofill]:-left-1 peer-[:-webkit-autofill]:bg-white peer-[:-webkit-autofill]:px-1 peer-[:-webkit-autofill]:rounded-md"
            >
              {label}
            </label>
          )}
        </div>

        {rightIcon && (
          <button
            type="button"
            onClick={handleClickRightIcon}
            className="flex-shrink-0"
          >
            {rightIcon}
          </button>
        )}
      </div>
    </Component>
  );
}
