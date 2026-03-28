import { UiInput } from "@/shared";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ComponentProps, useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

type TSearchInput = ComponentProps<"input">;

export default function SearchInput({ ...inputProps }: TSearchInput) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("search") ?? "");

  const currentTab = searchParams?.get("tabLogistician") ?? "allDrivers";

  useEffect(() => {
    const id = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

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
      value={value}
      onChange={(e) => setValue(e.target.value)}
      additionalStyle="w-full mx-10 py-2 pl-4 pr-5"
      borderColor="lightGrey"
      isRounded
      isPadding={false}
      leftIcon={<FaMagnifyingGlass className="mr-3" />}
      placeholder={`Поиск по ФИО ${currentTab !== "allDrivers" ? "или номерной знак" : ""}`}
      {...inputProps}
    />
  );
}
