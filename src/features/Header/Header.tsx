"use client";

import { Logo, roles, SearchInput, UiButton } from "@/shared";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/shared/lib";
import { httpClient } from "@/shared/api/httpClient";
import { AdminTabs, LogisticianTabs } from "@/features";
import { FC, ReactElement, useState } from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";

const navigationTabsByRole: Record<
  (typeof roles)[keyof typeof roles],
  FC<{ isShow: boolean; onClose: () => void; buttonLogOut: ReactElement }>
> = {
  Логист: LogisticianTabs,
  Админ: AdminTabs,
  Водитель: () => null,
};

export function Header() {
  const [isShowBurgerMenu, setIsShowBurgerMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const searchParams = useSearchParams();

  const currentTab = searchParams?.get("tabAdmin");

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

  const NavigationTab = user ? navigationTabsByRole[roles[user?.roleId]] : null;

  return (
    <header
      className={clsx(
        pathname !== "/" && "mb-8",
        "flex items-center justify-between mt-3 md:mt-5 bg-white px-3 md:px-5 py-2 min-[1750px]:px-7 min-[1750px]:py-3 rounded-lg md:rounded-xl",
      )}
    >
      <Logo viewBreakpointText="hidden sm:block" />

      {user?.roleId && user?.roleId !== 1 && currentTab !== "register" && (
        <SearchInput
          searchGet={user.roleId === 2 ? "tabLogistician" : "tabAdmin"}
        />
      )}

      {NavigationTab && (
        <NavigationTab
          isShow={isShowBurgerMenu}
          onClose={() => setIsShowBurgerMenu(false)}
          buttonLogOut={
            <UiButton
              textButton="Выйти"
              sizesText="text-xs md:text-base min-[1750px]:text-xl"
              onClick={handleExit}
              className="w-full max-w-[200px] py-1.5 bg-primary-gray text-white mt-6"
            />
          }
        />
      )}

      <button onClick={() => setIsShowBurgerMenu(true)} className="lg:hidden">
        <RxHamburgerMenu />
      </button>

      {!!user ? (
        <div className="hidden lg:flex gap-2.5 items-center">
          <UiButton
            textButton="Выйти"
            sizesText="text-xs md:text-sm xl:text-base min-[1750px]:text-xl"
            onClick={handleExit}
            className="px-4 md:px-5 py-1.5 min-[1750px]:px-7 min-[1750px]:py-2 ml-2 xl:ml-8 bg-primary-gray text-white"
          />
        </div>
      ) : (
        <Link
          href="/auth"
          className="px-4 md:px-5 py-1.5 min-[1750px]:px-7 min-[1750px]:py-2 text-xs md:text-base min-[1750px]:text-xl flex justify-center items-center font-medium bg-accent-green transition text-white rounded-lg md:rounded-xl hover:scale-105"
        >
          Войти
        </Link>
      )}
    </header>
  );
}
