export interface Filters {
  search: string;
  experienceFrom: string;
  experienceBefore: string;
  capacityFrom: string;
  capacityBefore: string;
  typeCar: string;
}

export type CurrentTabLogistician =
  | "allDrivers"
  | "activeDrivers"
  | "historyDrivers";
