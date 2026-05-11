import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { raleway } from "./fonts";
import { AuthCtxProvider, verifyJWT, YandexMapsProvider } from "@/shared/lib";
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
      <body className={clsx(raleway.variable, "bg-primary-white font-raleway")}>
        <AuthCtxProvider user={user}>
          <YandexMapsProvider>{children}</YandexMapsProvider>
        </AuthCtxProvider>
        <div id="modals"></div>
      </body>
    </html>
  );
}
