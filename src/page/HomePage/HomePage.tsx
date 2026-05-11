import { Main } from "./ui/Main";
import { Header } from "@/features";

export default function HomePage() {
  return (
    <div className="w-[95%] mx-auto min-h-screen flex flex-col">
      <Header />

      <div className="my-auto text-center">
        <Main />
      </div>
    </div>
  );
}
