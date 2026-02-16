"use client";

import { useEffect, useState } from "react";
import { Header } from "@/widgets/Header";
import { Admin, Driver, Logistician } from "../../entities";

export default function AccountPage() {
  const [roleId, setRoleId] = useState<string | null>(null);

  useEffect(() => {
    setRoleId(localStorage.getItem("roleId") ?? "");
  }, []);

  return (
    <div className="w-[75%] mx-auto">
      <Header />

      {Number(roleId) === 1 && <Driver />}
      {Number(roleId) === 2 && <Logistician />}
      {Number(roleId) === 3 && <Admin />}
    </div>
  );
}
