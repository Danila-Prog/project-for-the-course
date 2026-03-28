import { InjectorProvider } from "@/shared/lib";

export default function DILayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <InjectorProvider>{children}</InjectorProvider>
    </>
  );
}
