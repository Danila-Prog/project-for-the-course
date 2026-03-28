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
    <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] bg-white px-12 py-14 rounded-2xl">
      <Logo className="mb-12 justify-center" />
      <h1 className="text-5xl font-bold mb-5 text-accent-black text-center">
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
          <span className="text-sm text-rose-500">
            Неверный логин или пароль
          </span>
        )}

        <UiButton
          disabled={disabled}
          sizeButton="full"
          textButton="Войти"
          sizesText="text-lg"
          rounded="rounded-xl"
          className="py-2.5 bg-accent-green text-primary-white hover:scale-[1.02] transition mt-4"
        />
      </form>
    </section>
  );
}
