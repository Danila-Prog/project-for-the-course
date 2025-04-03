import Image from "next/image";
import trucking from "/public/icons/trucking.jpg";
import { RouteButton } from "@/shared";

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
      <RouteButton
        path="/auth"
        sizeButton="lg"
        textButton="Начать пользоваться"
        className="mx-7"
      />
    </main>
  );
}
