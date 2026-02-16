import clsx from "clsx";
import Link from "next/link";
import { ComponentProps, PropsWithChildren } from "react";

export const Tabs = ({ children }: PropsWithChildren) => {
  return (
    <ul className="bg-white mr-[30px] rounded-[10px] py-[15px] flex flex-col gap-5 h-full flex-shrink-0">
      {children}
    </ul>
  );
};

export const Tab = ({
  children,
  href,
  className,
}: PropsWithChildren & Pick<ComponentProps<"a">, "href" | "className">) => {
  return (
    <li>
      <Link
        href={href ?? ""}
        className={clsx(
          "block w-full font-medium hover:bg-slate-50 px-[23px] py-1.5 transition-colors duration-500 cursor-pointer",
          className,
        )}
      >
        {children}
      </Link>
    </li>
  );
};
