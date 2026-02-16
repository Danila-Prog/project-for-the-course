"use client";

import { PasswordInput, UiInput } from "@/shared";
import { UiButton } from "@/shared";
import { useSignIn } from "../model/useSignIn";
import { useState } from "react";

export default function SignIn() {
  const [hasAuthError, setHasAuthError] = useState(false);
  const { formData, updateForm, signIn } = useSignIn();

  const disabled = !formData.login || !formData.password;

  const handleSubmit = () => {
    const result = signIn();

    if (result === "invalid-credentials") {
      setHasAuthError(true);
    }
  };

  return (
    <section>
      <div className="flex flex-col gap-[15px] mb-[30px]">
        <UiInput
          idInput="login"
          label="Логин"
          value={formData.login}
          borderColor="lightGrey"
          onChange={(e) => {
            updateForm("login", e.target.value);
            setHasAuthError(false);
          }}
          placeholder="Введите логин"
        />

        <PasswordInput
          idInput="password"
          label="Пароль"
          placeholder="Введите пароль"
          value={formData.password}
          onChange={(e) => {
            updateForm("password", e.target.value);
            setHasAuthError(false);
          }}
        />

        {hasAuthError && (
          <span className="text-[14px] text-rose-500 font-bold">
            Не верный логин или пароль
          </span>
        )}
      </div>

      <UiButton
        type="button"
        disabled={disabled}
        onClick={handleSubmit}
        sizeButton="full"
        textButton="Войти"
        sizesText="text-[16px]"
        className="h-[43px]"
        rounded="rounded-[10px]"
      />
    </section>
  );
}
