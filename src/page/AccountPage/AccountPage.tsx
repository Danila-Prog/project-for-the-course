"use client";

import { Header } from "@/widgets/header";
import UserLogistician from "./ui/UserLogistician/UserLogistician";
import { useEffect, useState } from "react";
import UserDriver from "./ui/UserDriver";

export default function AccountPage() {
  const [roleId, setRoleId] = useState<string | null>(null);

  useEffect(() => {
    setRoleId(localStorage.getItem("roleId") ?? "");
  }, []);
  return (
    <div className="w-[75%] mx-auto">
      <Header />
      {Number(roleId) === 1 && <UserDriver />}
      {Number(roleId) === 2 && <UserLogistician />}
    </div>
  );
}
