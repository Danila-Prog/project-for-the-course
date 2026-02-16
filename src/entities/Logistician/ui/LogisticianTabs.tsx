import { Tab, Tabs } from "@/shared";
import { CurrentTabLogistician } from "../lib/types";

export const LogisticianTabs = ({
  currentTab,
}: {
  currentTab: CurrentTabLogistician;
}) => {
  return (
    <Tabs>
      <Tab
        href={"?tabLogistician=allDrivers"}
        className={currentTab === "allDrivers" ? "bg-slate-100" : ""}
      >
        Все водители
      </Tab>

      <Tab
        href={"?tabLogistician=activeDrivers"}
        className={currentTab === "activeDrivers" ? "bg-slate-100" : ""}
      >
        Активные водители
      </Tab>

      <Tab
        href={"?tabLogistician=historyDrivers"}
        className={currentTab === "historyDrivers" ? "bg-slate-100" : ""}
      >
        История водителей
      </Tab>
    </Tabs>
  );
};
