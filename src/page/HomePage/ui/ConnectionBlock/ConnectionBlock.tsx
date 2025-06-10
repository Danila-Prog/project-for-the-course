import Image from "next/image";
import laptop_img from "/public/icons/mackBook.png";
import Link from "next/link";

export function ConnectionBlock() {
  return (
    <section className="bg-white flex items-center justify-between mb-20 p-7 rounded-3xl">
      <div>
        <h2 className="text-2xl mb-3">Подключаемся?</h2>
        <p className="text-sm w-10/12 mb-7">
          Чтобы воспользоваться сервисов, понадобится кабинет на сайте. Создайте
          его, и можно начать смотреть проложенные маршруты.
        </p>

        <Link
          href="/auth"
          className="w-48 h-[52px] flex justify-center items-center font-medium bg-button-grey text-white transition hover:bg-[#464646] rounded-[16px] text-[21px]"
        >
          Создать кабинет
        </Link>
      </div>
      <div>
        <Image src={laptop_img} alt={""} className="w-[1000px] h-[353px]" />
      </div>
    </section>
  );
}
