import { Tab, Tabs } from "@/shared";

export const DriverTabs = () => {
  return (
    <Tabs>
      <Tab href={"?tab=personAccount"}>Личный кабинет</Tab>

      <Tab href={"?tab=routes"}>Маршруты</Tab>
    </Tabs>
  );
};
