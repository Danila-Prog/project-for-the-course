"use client";

import Link from "next/link";
import { Logo, roles, SearchInput, UiButton } from "@/shared";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/shared/lib";
import { httpClient } from "@/shared/api/httpClient";
import { AdminTabs, DriverTabs, LogisticianTabs } from "@/features";

const navigationTabsByRole: Record<
  (typeof roles)[keyof typeof roles],
  () => JSX.Element
> = {
  Логист: LogisticianTabs,
  Админ: AdminTabs,
  Водитель: DriverTabs,
};

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

  const NavigationTab = user ? navigationTabsByRole[roles[user?.roleId]] : null;

  return (
    <header
      className={clsx(
        pathname !== "/" && "mb-8",
        "flex items-center justify-between mt-5 bg-white px-5 py-2 rounded-xl min-h-[73px]",
      )}
    >
      <Logo />

      {user?.roleId && <SearchInput />}

      {NavigationTab && <NavigationTab />}

      {!!user ? (
        <div className="flex gap-2.5 items-center">
          <UiButton
            textButton="Выйти"
            sizesText="text-base"
            onClick={handleExit}
            className="px-5 py-1.5 ml-8 bg-primary-gray text-white"
          />
        </div>
      ) : (
        <Link
          href="/auth"
          className="px-5 py-1.5 text-base flex justify-center items-center font-medium bg-accent-green transition text-white rounded-xl hover:scale-105"
        >
          Войти
        </Link>
      )}
    </header>
  );
}
