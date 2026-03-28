"use client";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ComponentProps, PropsWithChildren } from "react";

export const Tabs = ({ children }: PropsWithChildren) => {
  return (
    <ul className="flex items-center gap-4 ml-auto bg-primary-white px-2 py-1 rounded-3xl">
      {children}
    </ul>
  );
};

export const Tab = ({
  children,
  href,
  className,
}: PropsWithChildren & Pick<ComponentProps<"a">, "href" | "className">) => {
  const params = useSearchParams();
  const tabKey = href?.split("=")[0].slice(1) ?? "";
  const tabValue = href?.split("=")[1];

  const isActive = tabValue === params.get(tabKey);
  return (
    <li role="tab">
      <Link
        href={href ?? ""}
        className={clsx(
          "block w-full font-medium px-3 py-2 transition-colors duration-500 cursor-pointer text-xs rounded-3xl",
          isActive ? "bg-white" : "text-primary-gray",
          className,
        )}
      >
        {children}
      </Link>
    </li>
  );
};
