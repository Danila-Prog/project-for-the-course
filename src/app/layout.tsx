import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { dmSans, montserrat } from "./fonts";
import { AuthCtxProvider, verifyJWT } from "@/shared/lib";
import { cookies } from "next/headers";
import { User } from "@/entities";

export const metadata: Metadata = {
  title: "Маршрутизатор",

  description:
    "Маршрутизатор — сайт, который позволяет оптимизировать маршруты для грузоперевозок",

  icons: { icon: "/icons/trucking.jpg" },

  keywords:
    "маршруты, сайт, оптимизация маршрутов, оптимизация, грузоперевозки",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("accessToken")?.value;
  const user = token ? verifyJWT<Omit<User, "password">>(token) : null;

  return (
    <html lang="ru">
      <body className={clsx(dmSans.variable, montserrat.variable)}>
        <AuthCtxProvider user={user}>{children}</AuthCtxProvider>
        <div id="modals"></div>
      </body>
    </html>
  );
}
