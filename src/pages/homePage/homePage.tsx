import { FooterHome } from "@/widgets/footer";
import { ConnectingBlock } from "./ui/connectiongBlock";
import { Main } from "@/widgets/main";
import { Header } from "@/widgets/header";

export function HomePage() {
  return (
    <>
      <Header />
      <Main />
      <ConnectingBlock />
      <FooterHome />
    </>
  );
}
