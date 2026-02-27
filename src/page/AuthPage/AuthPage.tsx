import SignIn from "./ui/SignIn";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export function AuthPage() {
  return (
    <div className="flex">
      <main className="hidden bg-[#212123] md:flex w-[50%] h-[100vh] text-white">
        <div className="m-auto w-[90%] xl:w-[80%] grid gap-5">
          <Link
            href={"/"}
            className="bg-[#262524] w-10 h-10 xl:w-12 xl:h-12 rounded-full flex"
          >
            <FaArrowLeft className="m-auto" />
          </Link>

          <h2 className="font-bold text-3xl lg:text-4xl xl:text-5xl xl:leading-tight">
            Добро пожаловать в мир эффективных грузоперевозок!
          </h2>

          <p className="text-[#a0a4a9] text-sm lg:text-base xl:text-lg font-roboto">
            — Здесь начинается ваш путь к оптимизации маршрутов. Давайте сделаем
            это вместе!
          </p>

          <p className="text-[#a0a4a9] text-sm lg:text-base  xl:text-lg font-roboto">
            — Присоединяйтесь к тысячам компаний, которые уже используют нашу
            платформу для повышения эффективности своих грузоперевозок.
          </p>
        </div>
      </main>

      <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:transform-none md:static rounded-xl m-auto bg-white w-[95%] sm:w-[500px] md:w-[45%] lg:w-[35%] xl:w-[25%] lg:h-full px-7 py-4 lg:px-9 lg:py-7">
        <h1 className="text-[1.75rem] font-bold mb-[20px]">Войти</h1>

        <SignIn />
      </section>
    </div>
  );
}
