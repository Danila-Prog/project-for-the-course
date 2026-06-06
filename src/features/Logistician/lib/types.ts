export interface Filters {
  experienceFrom: string;
  experienceBefore: string;
  capacityFrom: string;
  capacityBefore: string;
  typeCar: string;
  search: string;
}

export type CurrentTabLogistician =
  | "allDrivers"
  | "activeDrivers"
  | "historyDrivers";
