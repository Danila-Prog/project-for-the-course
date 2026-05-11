"use client";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { UiInput } from "../UiInput";
import { ComponentProps, useState } from "react";

interface IPasswordInput extends ComponentProps<"input"> {
  idInput: string;
  label: string;
}

export default function PasswordInput({
  idInput,
  label,
  ...passwordInputProps
}: IPasswordInput) {
  const [isShow, setIsShow] = useState<boolean>(false);
  const handleShowPassword = () => setIsShow((prev) => !prev);

  return (
    <UiInput
      type={isShow ? "text" : "password"}
      borderColor="lightGrey"
      idInput={idInput}
      label={label}
      rightIcon={
        isShow ? (
          <BsEyeSlashFill
            color="#212123"
            className="min-[1750px]:w-[25px] min-[1750px]:h-[25px]"
          />
        ) : (
          <IoEyeSharp
            color="#212123"
            className="min-[1750px]:w-[25px] min-[1750px]:h-[25px]"
          />
        )
      }
      handleClickRightIcon={handleShowPassword}
      {...passwordInputProps}
    />
  );
}
