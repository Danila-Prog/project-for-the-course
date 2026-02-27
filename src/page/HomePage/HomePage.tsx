import { Footer } from "@/page/HomePage/ui/Footer";
import { Main } from "@/page/HomePage/ui/Main";
import { Header } from "@/widgets/Header";

export default function HomePage() {
  return (
    <div className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[75%] mx-auto min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow flex items-center justify-center">
        <Main />
      </div>

      <Footer />
    </div>
  );
}
