import { PiCarProfileBold } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa6";
import Link from "next/link";
import { RouteButton } from "@/shared";

export function Header() {
  return (
    <header className="flex justify-between my-1 py-2 px-2.5 bg-white rounded-xl">
      <Link href="/">
        <PiCarProfileBold className="w-8 h-8" />
      </Link>

      <RouteButton
        path="/auth"
        sizeButton="sm"
        sizesText="text-[18px]"
        textButton={
          <>
            <FaRegUser className="mr-1" />
            Войти
          </>
        }
      />
    </header>
  );
}
