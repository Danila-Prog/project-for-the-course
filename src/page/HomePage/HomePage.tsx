"use client";

import { FooterHome } from "@/page/HomePage/ui/Footer";
import { ConnectionBlock } from "./ui/ConnectionBlock";
import { Main } from "@/page/HomePage/ui/Main";
import { Header } from "@/widgets/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [shouldRender, setShouldRender] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("userId");

    if (id) {
      router.replace("/account");
    } else {
      setShouldRender(true);
    }
  }, [router]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="w-[75%] mx-auto">
      <Header />
      <Main />
      <ConnectionBlock />
      <FooterHome />
    </div>
  );
}
