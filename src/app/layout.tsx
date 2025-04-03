import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Курсач",

  description:
    "Курсовой проект на тему оптимизация маршрутов для грузоперевозки",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        {children}
        <div id="modals"></div>
      </body>
    </html>
  );
}
