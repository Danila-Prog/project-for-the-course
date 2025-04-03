"use client";

import { useState } from "react";
import Login from "./ui/Login";
import Registration from "./ui/Registration";

export default function AuthPage() {
  const [changeForm, setChangeForm] = useState("Войти");

  const handleChangeForm = () =>
    setChangeForm((prevChange) =>
      prevChange === "Войти" ? "Регистрация" : "Войти"
    );

  return (
    <form className="rounded-[12px] bg-white w-[25%] px-9 py-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <div className="flex justify-between items-center mb-[20px]">
        <h1 className="text-[1.75rem] font-medium">
          {changeForm === "Войти" ? "Войти" : "Регистрация"}
        </h1>

        <button
          type="button"
          className="text-[1rem] font-semibold text-[#9297A9]"
          onClick={handleChangeForm}
        >
          {changeForm === "Войти" ? "Регистрация" : "Войти"}
        </button>
      </div>

      {changeForm === "Войти" && <Login />}
      {changeForm === "Регистрация" && <Registration />}
    </form>
  );
}
