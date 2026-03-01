"use client";

import { Header } from "@/widgets/Header";
import { Admin } from "../Admin";
import { Logistician } from "../Logistician";
import { Driver } from "../Driver";
import { RouteItem, InjectRouteProvider } from "@/features";
import { useAuth } from "@/shared/lib";

export default function AccountPage() {
  const { user } = useAuth();
  if (!user) return;

  const roleId = user.roleId;

  return (
    <div className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[75%] mx-auto">
      <Header />

      {roleId === 1 && (
        <InjectRouteProvider RouteItem={RouteItem} >
          <Driver />
        </InjectRouteProvider>
      )}

      {roleId === 2 && <Logistician />}
      {roleId === 3 && <Admin />}
    </div>
  );
}
