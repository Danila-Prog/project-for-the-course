"use client";

import { useEffect, useState } from "react";
import SignIn from "./ui/SignIn";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export function AuthPage() {
  const [shouldRender, setShouldRender] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("userId");

    if (id) {
      router.replace("/account");
    } else {
      setShouldRender(true);
    }
  }, [router]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="flex">
      <main className="bg-[#212123] flex  w-[50%] h-[100vh] text-white">
        <div className="m-auto w-[80%] grid gap-5">
          <Link
            href={"/"}
            className="bg-[#262524] w-[50px] h-[50px] rounded-full flex"
          >
            <FaArrowLeft className="m-auto" />
          </Link>
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
      </main>

      <section className="rounded-[12px] m-auto bg-white w-[25%] h-full px-9 py-7">
        <h1 className="text-[1.75rem] font-bold mb-[20px]">Войти</h1>

        <SignIn />
      </section>
    </div>
  );
}
