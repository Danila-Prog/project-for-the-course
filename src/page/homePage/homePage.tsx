"use client";
import { FooterHome } from "@/widgets/footer";
import { ConnectingBlock } from "./ui/connectiongBlock";
import { Main } from "@/widgets/main";
import { Header } from "@/widgets/header";
import { useEffect, useState } from "react";
import { AccountPage } from "../AccountePage";

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
          <ConnectingBlock />
          <FooterHome />
        </div>
      )}
    </>
  );
}
