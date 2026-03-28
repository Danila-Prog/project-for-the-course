import Image from "next/image";
import trucking from "/public/icons/trucking.png";
import Link from "next/link";

export function Main() {
  return (
    <main className="relative w-full h-full">
      <h1 className="text-3xl md:text-9xl font-bold text-accent-black mb-4">
        Грузоперевозки
      </h1>

      <Image
        src={trucking}
        alt="Грузовик на дороге"
        className="absolute w-[800px] top-20 left-1/2 -translate-x-1/2 pointer-events-none"
      />

      <footer className="mt-[230px]">
        <p className="text-sm md:text-base mx-auto max-w-[700px] text-accent-black mb-6 ">
          Данный маршрутизатор эффективно подберёт наилучший маршрут для ваших
          заказов из точки А в точку Б
        </p>

        <Link
          href="/auth"
          className="inline-flex items-center justify-center px-6 py-3 md:px-6 md:py-2.5 text-lg font-medium bg-accent-green text-white rounded-md transition hover:scale-105"
        >
          Начать пользоваться
        </Link>
      </footer>
    </main>
  );
}
