import Image from "next/image";
import not_found from "/public/icons/404.png";
import Link from "next/link";

export const dynamic = "force-static";

export default function NotFound() {
  return (
    <div className="w-[95%] md:w-full max-w-[700px] xl:max-w-[1000px] min-[1700px]:max-w-[1500px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Image
        width={1000}
        height={600}
        src={not_found}
        alt="image not found"
        className="w-full max-w-[700px] xl:max-w-[1000px] min-[1700px]:max-w-[1500px]"
      />

      <main className="text-center flex flex-col gap-2 min-[1700px]:gap-5 mb-6 mt-3 min-[1700px]:mb-8 min-[1700px]:mt-5">
        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl min-[1700px]:text-6xl text-secondary-green font-medium">
          Кажется мы попали не туда...
        </h1>

        <p className="text-primary-gray text-xs md:text-sm lg:text-base min-[1700px]:text-2xl">
          Давай вернёмся на главную, чтобы продолжить
        </p>
      </main>

      <Link
        href={"/"}
        className="block py-2 min-[1700px]:py-3 w-fit px-8 lg:px-12 min-[1700px]:px-16 text-center mx-auto bg-accent-green text-sm lg:text-base min-[1700px]:text-2xl rounded-xl text-white"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
