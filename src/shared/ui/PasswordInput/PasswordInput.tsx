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
      sizeInput="lg"
      borderColor="lightGrey"
      idInput={idInput}
      label={label}
      rightIcon={
        isShow ? (
          <BsEyeSlashFill color="#212123" />
        ) : (
          <IoEyeSharp color="#212123" />
        )
      }
      handleClickRightIcon={handleShowPassword}
      {...passwordInputProps}
    />
  );
}
