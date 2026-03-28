type Roles = "Водитель" | "Логист" | "Админ";

type DefaultSearchParamsByRole =
  | "tab=personAccount"
  | "tabLogistician=allDrivers"
  | "tabAdmin=users";

export const roles: Record<number, Roles> = {
  1: "Водитель",
  2: "Логист",
  3: "Админ",
};

export const defaultSearchParamsByRole: Record<
  number,
  DefaultSearchParamsByRole
> = {
  1: "tab=personAccount",
  2: "tabLogistician=allDrivers",
  3: "tabAdmin=users",
};
