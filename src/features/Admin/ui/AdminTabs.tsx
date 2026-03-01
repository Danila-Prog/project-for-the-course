"use client";

import { Tab, Tabs } from "@/shared";
import { useSearchParams } from "next/navigation";

export const AdminTabs = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get("tabAdmin") ?? "users";

  return (
    <Tabs>
      <Tab
        href="?tabAdmin=users"
        className={currentTab === "users" ? "bg-slate-100" : ""}
      >
        Пользователи
      </Tab>
      <Tab
        href="?tabAdmin=register"
        className={currentTab === "register" ? "bg-slate-100" : ""}
      >
        Регистрация
      </Tab>
    </Tabs>
  );
};
