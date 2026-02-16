import { useSearchParams } from "next/navigation";
import { UsersTab } from "./UsersTab/UsersTab";
import { RegistrationTab } from "./RegistrationTab/RegistrationTab";

const tabs: Record<string, () => JSX.Element> = {
  users: UsersTab,
  register: RegistrationTab,
};

export const AdminCurrentTab = () => {
  const searchParams = useSearchParams();

  const CurrentComponent = tabs[searchParams.get("tabAdmin") ?? "users"];

  return <CurrentComponent />;
};
