import Image from "next/image";
import trucking from "/public/icons/trucking.png";
import Link from "next/link";

export function Main() {
  return (
    <main className="relative w-full h-full">
      <h1
        className="font-bold text-accent-black 
      mb-4"
        style={{
          fontSize: "clamp(1.5rem, 7vw + 1rem, 12rem)",
        }}
      >
        Грузоперевозки
      </h1>

      <Image
        src={trucking}
        alt="Грузовик"
        priority
        className="absolute w-[85%] max-w-[450px] md:max-w-[800px] md:w-[65%] lg:w-[60%] min-[1750px]:max-w-[930px] top-8 min-[522px]:top-10 sm:top-11 md:top-12 min-[920px]:top-14 min-[1200px]:top-16 xl:top-20 min-[1750px]:top-24 left-1/2 -translate-x-1/2 pointer-events-none aspect-auto"
      />

      <section className="mt-[100px] min-[521px]:mt-[140px] min-[920px]:mt-[160px] lg:mt-[180px] xl:mt-[230px]">
        <p className="text-[0.65rem] min-[521px]:max-w-[450px] md:text-xs lg:text-sm lg:max-w-[600px] xl:text-base min-[1750px]:text-lg mx-auto xl:max-w-[700px] min-[1750px]:max-w-[750px] text-primary-gray mb-6">
          Маршрутизатор эффективно подберёт наилучший маршрут для ваших заказов
          из точки А в точку Б
        </p>

        <Link
          href="/auth"
          className="inline-flex items-center justify-center text-xs px-4 py-2.5 lg:px-6 lg:py-3 md:text-sm lg:text-base xl:text-lg min-[1750px]:text-xl font-medium bg-accent-green text-white rounded-xl transition hover:scale-105"
        >
          Начать пользоваться
        </Link>
      </section>
    </main>
  );
}
