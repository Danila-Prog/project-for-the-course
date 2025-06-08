"use client";

import { FooterHome } from "@/page/HomePage/ui/Footer";
import { ConnectionBlock } from "./ui/ConnectionBlock";
import { Main } from "@/page/HomePage/ui/Main";
import { Header } from "@/widgets/Header";
import { useEffect, useState } from "react";
import { AccountPage } from "../AccountPage";

export function HomePage() {
  const [userId, setUserId] = useState<string | null>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("userId") ?? "");
    }
  }, []);

  return (
    <>
      {userId && <AccountPage />}

      {!userId && (
        <div className="w-[75%] mx-auto">
          <Header />
          <Main />
          <ConnectionBlock />
          <FooterHome />
        </div>
      )}
    </>
  );
}
