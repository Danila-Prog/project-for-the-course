import Image from "next/image";
import trucking from "/public/icons/trucking.jpg";
import Link from "next/link";

export function Main() {
  return (
    <main className="relative h-[340px] md:h-[420px] w-full">
      <Image
        src={trucking}
        alt=""
        className="absolute -z-10 h-[340px] md:h-[420px] rounded-3xl brightness-[55%] object-cover"
      />

      <h1 className="text-3xl ml-3 py-5 md:text-5xl md:ml-7 md:py-7 font-bold text-white">
        Маршрутизатор грузоперевозок
      </h1>

      <p className="ml-3 text-sm md:text-lg md:ml-7 mb-7 w-[90%] sm:w-[60%] min-[870px]:w-[55%] xl:w-[45%] font-medium text-white">
        Данный маршрутизатор эффективно подберёт наилучший маршрут для ваших
        заказов из точки А в точку Б
      </p>

      <Link
        href="/auth"
        className="ml-3 px-4 py-2 md:px-8 md:py-3 md:text-xl md:ml-7 w-fit flex justify-center items-center font-medium bg-button-grey text-white transition hover:bg-[#464646] rounded-[16px] "
      >
        Начать пользоваться
      </Link>
    </main>
  );
}
