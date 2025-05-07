import Image from "next/image";
import trucking from "/public/icons/trucking.jpg";
import Link from "next/link";

export function Main() {
  return (
    <main className="relative h-[420px] my-20 w-full ">
      <Image
        src={trucking}
        alt=""
        className="absolute -z-10 h-[420px] rounded-3xl brightness-[55%] object-cover"
      />
      <h1 className="text-[60px] px-7 pt-7 mb-[29px] font-bold text-white">
        Маршрутизатор грузоперевозок
      </h1>

      <p className="text-[18px] px-7 mb-5 w-[45%] font-medium text-white">
        Данный маршрутизатор эффективно подберёд наилучший маршрут для ваших
        заказов из точки А в точку Б
      </p>
      <Link
        href="/auth"
        className="w-[320px] h-[60px] mx-7 flex justify-center items-center font-medium bg-button-grey text-white transition hover:bg-[#464646] rounded-[16px] text-[21px]"
      >
        Начать пользоваться
      </Link>
    </main>
  );
}
