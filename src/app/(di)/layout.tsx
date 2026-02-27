import { InjectorProvider } from "@/shared/lib";

export default function DILayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <InjectorProvider>{children}</InjectorProvider>
    </section>
  );
}
