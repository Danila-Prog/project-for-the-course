"use client";

import { UiInput } from "@/shared";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ComponentProps, useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

type TSearchInput = ComponentProps<"input"> & {
  searchGet: string;
};

const placeholder: Record<string, string> = {
  allDrivers: "Поиск по ФИО",
  activeDrivers: "Поиск по ФИО или номерному знаку",
  historyDrivers: "Поиск по ФИО или номерному знаку",
  users: "Поиск по ФИО или username",
};

export default function SearchInput({
  searchGet,
  ...inputProps
}: TSearchInput) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("search") ?? "");

  const currentTab = searchParams?.get(searchGet) ?? "allDrivers";

  useEffect(() => {
    setValue(searchParams.get("search") ?? "");
  }, [searchParams]);

  useEffect(() => {
    const id = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const searchFromUrl = params.get("search") ?? "";

      if (value.trim() === searchFromUrl) return;

      if (value.trim()) {
        params.set("search", value.trim());
      } else {
        params.delete("search");
      }

      router.replace(`${pathname}?${params.toString()}`);
    }, 400);

    return () => clearTimeout(id);
  }, [value, router, pathname, searchParams]);

  return (
    <UiInput
      type="text"
      name="search"
      id={currentTab}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      additionalStyle="mx-2 xl:mx-4 min-[1750px]:mx-10"
      borderColor="lightGrey"
      isRounded
      label={placeholder[currentTab]}
      leftIcon={
        <FaMagnifyingGlass className="mr-2 w-[16px] h-[16px] min-[1750px]:w-[25px] min-[1750px]:h-[25px]" />
      }
      {...inputProps}
    />
  );
}
