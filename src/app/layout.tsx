import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { dmSans, montserrat } from "./fonts";

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
  return (
    <html lang="ru">
      <body className={clsx(dmSans.variable, montserrat.variable)}>
        {children}
        <div id="modals"></div>
      </body>
    </html>
  );
}
