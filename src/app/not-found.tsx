import Image from "next/image";
import not_found from "/public/icons/404.png";

export default function NotFound() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#212123] px-[40px] py-[30px] rounded-[20px]">
      <h1 className="text-[32px] text-white mb-[30px]">
        Страница не найдена((
      </h1>
      <Image src={not_found} alt="image not found" className="w-full" />
    </div>
  );
}
