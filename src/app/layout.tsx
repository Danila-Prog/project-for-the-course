import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans, Roboto_Mono } from "next/font/google";
import clsx from "clsx";
export const metadata: Metadata = {
  title: "Курсач",

  description:
    "Курсовой проект на тему оптимизация маршрутов для грузоперевозки",
};
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dmsans",
});

const inter = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={clsx(dmSans.variable, inter.variable)}>
        {children}
        <div id="modals"></div>
      </body>
    </html>
  );
}
