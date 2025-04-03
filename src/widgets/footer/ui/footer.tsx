import { PiCarProfileBold } from "react-icons/pi";

export const FooterHome = () => {
  return (
    <footer className="flex items-center justify-between bg-black mb-[5px] p-[28px] rounded-[12px]">
      <PiCarProfileBold className="w-8 h-8" color="white" />
      <h1 className="text-white text-[25px] font-semibold">
        Мы рады, что вы выбираете нас!
      </h1>
    </footer>
  );
};
