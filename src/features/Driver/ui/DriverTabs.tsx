"use client"
import { Tab, Tabs } from "@/shared";
import { useSearchParams } from "next/navigation";

export const DriverTabs = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get("tab") ?? "personAccount";

  return (
    <Tabs>
      <Tab
        href={"?tab=personAccount"}
        className={currentTab === "personAccount" ? "bg-slate-100" : ""}
      >
        Личный кабинет
      </Tab>

      <Tab
        href={"?tab=routes"}
        className={currentTab === "routes" ? "bg-slate-100" : ""}
      >
        Маршруты
      </Tab>
    </Tabs>
  );
};
