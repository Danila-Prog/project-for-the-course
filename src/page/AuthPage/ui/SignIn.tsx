"use client";

import { Logo, PasswordInput, UiInput } from "@/shared";
import { UiButton } from "@/shared";
import { useSignIn } from "../model/useSignIn";
import { FormEvent, useState } from "react";

export default function SignIn() {
  const [hasAuthError, setHasAuthError] = useState(false);
  const { formData, updateForm, signIn } = useSignIn();

  const disabled = !formData.login || !formData.password;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await signIn();

    if (result === "invalid-credentials") {
      setHasAuthError(true);
    }
  };

  return (
    <section className="w-full min-[460px]:w-[80%] min-[734px]:w-[65%] min-[910px]:w-[50%] lg:w-[85%] lg:max-w-[600px] min-[1750px]:max-w-[730px] bg-white lg:px-12 lg:py-14 min-[460px]:rounded-xl lg:rounded-2xl px-5 py-7">
      <Logo className="mb-6 lg:mb-12 justify-center" />

      <h1 className="text-4xl lg:text-5xl min-[1750px]:text-6xl font-bold mb-5 text-accent-black text-center">
        Войти
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
        autoComplete="on"
      >
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
          <span className="text-xs lg:text-sm min-[1750px]:text-base text-rose-500 font-medium">
            Неверный логин или пароль
          </span>
        )}

        <UiButton
          disabled={disabled}
          sizeButton="full"
          textButton="Войти"
          sizesText="text-sm lg:text-lg min-[1750px]:text-2xl"
          rounded="rounded-xl"
          className="py-2.5 min-[1750px]:py-3.5 bg-accent-green text-primary-white hover:scale-[1.02] transition mt-4"
        />
      </form>
    </section>
  );
}
