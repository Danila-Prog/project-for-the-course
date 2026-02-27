import { PiCarProfileBold } from "react-icons/pi";

export const Footer = () => {
  return (
    <footer className="flex items-center justify-between bg-black py-2 px-3 rounded-xl w-full mt-auto mb-2">
      <PiCarProfileBold className="w-6 h-6 sm:w-8 sm:h-8" color="white" />

      <h2 className="text-white text-right w-[87%] text-base sm:text-xl xl:text-2xl font-semibold">
        Мы рады, что вы выбираете нас!
      </h2>
    </footer>
  );
};
