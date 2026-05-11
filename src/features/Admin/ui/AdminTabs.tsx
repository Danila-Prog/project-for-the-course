import { Tab, Tabs } from "@/shared";
import { BurgerMenu } from "@/shared/ui/BurgerMenu/BurgerMenu";
import { ReactElement } from "react";

interface Props {
  isShow: boolean;
  onClose: () => void;
  buttonLogOut: ReactElement;
}

const tabs = [
  {
    label: "Пользователи",
    href: "?tabAdmin=users",
  },
  {
    label: "Регистрация",
    href: "?tabAdmin=register",
  },
];

export const AdminTabs = ({ isShow, onClose, buttonLogOut }: Props) => {
  return (
    <>
      <BurgerMenu isShow={isShow} onClose={onClose}>
        <>
          {tabs.map((tab, i) => (
            <Tab key={i} href={tab.href}>
              {tab.label}
            </Tab>
          ))}

          {buttonLogOut}
        </>
      </BurgerMenu>

      <div className="hidden lg:block">
        <Tabs>
          {tabs.map((tab, i) => (
            <Tab key={i} href={tab.href}>
              {tab.label}
            </Tab>
          ))}
        </Tabs>
      </div>
    </>
  );
};
