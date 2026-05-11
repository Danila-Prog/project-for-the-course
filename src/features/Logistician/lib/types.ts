export interface Filters {
  experienceFrom: string;
  experienceBefore: string;
  capacityFrom: string;
  capacityBefore: string;
  typeCar: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export type CurrentTabLogistician =
  | "allDrivers"
  | "activeDrivers"
  | "historyDrivers";
