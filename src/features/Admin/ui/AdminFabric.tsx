"use client";

import { useSearchParams } from "next/navigation";
import { UsersTab } from "./UsersTab";
import { RegistrationTab } from "./RegistrationTab";

const tabs: Record<string, () => JSX.Element> = {
  users: UsersTab,
  register: RegistrationTab,
};

export const AdminFabric = () => {
  const searchParams = useSearchParams();

  const CurrentComponent = tabs[searchParams.get("tabAdmin") ?? "users"];

  return <CurrentComponent />;
};
