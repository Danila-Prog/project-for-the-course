"use client";

import { PiCarProfileBold } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa6";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { UiButton } from "@/shared";
import { useRouter } from "next/navigation";

export function Header() {
  const [getUserName, setGetUserName] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setGetUserName(localStorage.getItem("username"));
    }
  }, []);

  const IconComponent = ({ children }: { children: ReactNode }) =>
    !!getUserName ? <div>{children}</div> : <Link href="/">{children}</Link>;

  const handleExit = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <header className="flex justify-between my-1 py-2 px-3 bg-white rounded-xl">
      <IconComponent>
        <PiCarProfileBold className="w-8 h-8" />
      </IconComponent>

      {!!getUserName ? (
        <div className="flex gap-[10px] items-center">
          <span className="font-extrabold ">Пользователь: {getUserName}</span>
          <UiButton
            sizeButton="sm"
            textButton="Выйти"
            sizesText="text-[18px]"
            onClick={handleExit}
          />
        </div>
      ) : (
        <Link
          href="/auth"
          className="w-[140px] h-[40px] text-[18px] flex justify-center items-center font-medium bg-button-grey text-white transition hover:bg-[#464646] rounded-[16px]"
        >
          <FaRegUser className="mr-1" />
          Войти
        </Link>
      )}
    </header>
  );
}
