"use client";

import { PiCarProfileBold } from "react-icons/pi";
import Link from "next/link";
import { UiButton } from "@/shared";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/shared/lib";
import { httpClient } from "@/shared/api/httpClient";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const handleExit = async () => {
    await httpClient.post(
      "logout",
      {},
      {
        credentials: "include",
      },
    );

    router.refresh();
  };

  return (
    <header
      className={clsx(
        pathname !== "/" && "mb-4",
        "flex items-center justify-between mt-2 py-2 px-3 bg-white rounded-xl",
      )}
    >
      <PiCarProfileBold className="w-8 h-8 xl:w-10 xl:h-10" />

      {!!user ? (
        <div className="flex gap-2.5 items-center">
          <UiButton
            textButton="Выйти"
            sizesText="text-base lg:text-lg"
            onClick={handleExit}
            className="px-6 py-1 lg:px-8 lg:py-2"
          />
        </div>
      ) : (
        <Link
          href="/auth"
          className="px-6 py-1 lg:px-8 lg:py-2 text-base lg:text-lg flex justify-center items-center font-medium bg-button-grey text-white transition hover:bg-[#464646] rounded-xl"
        >
          Войти
        </Link>
      )}
    </header>
  );
}
