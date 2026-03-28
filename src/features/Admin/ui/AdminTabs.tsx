import { Tab, Tabs } from "@/shared";

export const AdminTabs = () => {
  return (
    <Tabs>
      <Tab href="?tabAdmin=users">Пользователи</Tab>
      <Tab href="?tabAdmin=register">Регистрация</Tab>
    </Tabs>
  );
};
