"use client";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ComponentProps, PropsWithChildren } from "react";

const fallbackTabValue: Record<string, string> = {
  tabLogistician: "allDrivers",
  tabAdmin: "users",
} as const;

export const Tabs = ({ children }: PropsWithChildren) => {
  return (
    <ul className="flex items-center gap-2 xl:gap-4 ml-auto bg-primary-white px-2 py-1 rounded-3xl">
      {children}
    </ul>
  );
};

export const Tab = ({
  children,
  href,
  className = "text-xs ",
}: PropsWithChildren & Pick<ComponentProps<"a">, "href" | "className">) => {
  const params = useSearchParams();
  const tabKey = href?.split("=")[0].slice(1) ?? "";
  const tabValue = href?.split("=")[1] ?? fallbackTabValue[tabKey];

  const isActive = tabValue === params.get(tabKey);

  return (
    <li role="tab" className="list-none">
      <Link
        href={href ?? ""}
        className={clsx(
          "block w-full font-medium px-3 py-2 transition-colors duration-500 cursor-pointer rounded-3xl text-nowrap",
          isActive ? "bg-white" : "text-primary-gray",
          className,
        )}
      >
        {children}
      </Link>
    </li>
  );
};
