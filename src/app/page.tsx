import { HomePage } from "@/page/HomePage";
import { verifyJWT } from "@/shared/lib";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { User } from "@/entities";

export default function Home() {
  const token = cookies().get("accessToken")?.value;
  const user = token ? verifyJWT<Omit<User, "password">>(token) : null;

  if (user) {
    redirect("/account");
  }

  return <HomePage />;
}
