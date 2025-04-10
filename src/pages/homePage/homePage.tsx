import { FooterHome } from "@/widgets/footer";
import { ConnectingBlock } from "./ui/connectiongBlock";
import { Main } from "@/widgets/main";
import { Header } from "@/widgets/header";

export function HomePage() {
  return (
    <div className="w-[75%] mx-auto">
      <Header />
      <Main />
      <ConnectingBlock />
      <FooterHome />
    </div>
  );
}
