import { Tab, Tabs } from "@/shared";
import { BurgerMenu } from "@/shared/ui/BurgerMenu/BurgerMenu";
import { ReactElement } from "react";

interface Props {
  isShow: boolean;
  onClose: () => void;
  buttonLogOut: ReactElement;
}

const tabs = [
  { label: "Все", href: "?tabLogistician=allDrivers", value: "allDrivers" },
  {
    label: "Активные",
    href: "?tabLogistician=activeDrivers",
    value: "activeDrivers",
  },
  {
    label: "История",
    href: "?tabLogistician=historyDrivers",
    value: "historyDrivers",
  },
];

export const LogisticianTabs = ({ isShow, onClose, buttonLogOut }: Props) => {
  return (
    <>
      <BurgerMenu isShow={isShow} onClose={onClose}>
        <>
          {tabs.map((tab) => (
            <Tab key={tab.value} href={tab.href} className="text-base">
              {tab.label}
            </Tab>
          ))}
          {buttonLogOut}
        </>
      </BurgerMenu>

      <div className="hidden lg:block">
        <Tabs>
          {tabs.map((tab) => (
            <Tab key={tab.value} href={tab.href}>
              {tab.label}
            </Tab>
          ))}
        </Tabs>
      </div>
    </>
  );
};
