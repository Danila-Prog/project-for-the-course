import { User } from "@/entities";
import { AuthPage } from "@/page/AuthPage";
import { defaultSearchParamsByRole, verifyJWT } from "@/shared/lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Auth() {
  const token = cookies().get("accessToken")?.value;
  const user = token ? verifyJWT<Omit<User, "password">>(token) : null;

  if (user) redirect("/account?" + defaultSearchParamsByRole[user.roleId]);

  return <AuthPage />;
}
