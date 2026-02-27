import { User } from "@/entities";
import { AccountPage } from "@/page/AccountPage";
import { verifyJWT } from "@/shared/lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Account() {
  const token = cookies().get("accessToken")?.value;

  const user = token ? verifyJWT<Omit<User, "password">>(token) : null;

  if (!user) redirect("/");

  return <AccountPage />;
}
