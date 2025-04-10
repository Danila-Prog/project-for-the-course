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
    <div className="flex">
      <div className="bg-[#212123] flex  w-[50%] h-[100vh] text-white">
        <div className="m-auto w-[80%] grid gap-5">
          <h2 className="font-bold text-[3rem] leading-tight">
            Добро пожаловать в мир эффективных грузоперевозок!
          </h2>
          <p className="text-[#a0a4a9] text-[1.125rem] font-roboto">
            — Здесь начинается ваш путь к оптимизации маршрутов. Давайте сделаем
            это вместе!
          </p>
          <p className="text-[#a0a4a9] text-[1.125rem] font-roboto">
            — Присоединяйтесь к тысячам компаний, которые уже используют нашу
            платформу для повышения эффективности своих грузоперевозок.
          </p>
        </div>
      </div>

      <form className="rounded-[12px] m-auto bg-white w-[25%] h-full px-9 py-7">
        <div className="flex justify-between items-center mb-[20px]">
          <h1 className="text-[1.75rem] font-bold">
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
    </div>
  );
}
