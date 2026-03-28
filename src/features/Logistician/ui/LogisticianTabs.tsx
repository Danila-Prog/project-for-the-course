import { Tab, Tabs } from "@/shared";

export const LogisticianTabs = () => {
  return (
    <Tabs>
      <Tab href={"?tabLogistician=allDrivers"}>Все</Tab>

      <Tab href={"?tabLogistician=activeDrivers"}>Активные</Tab>

      <Tab href={"?tabLogistician=historyDrivers"}>История</Tab>
    </Tabs>
  );
};
