import { DriverTabs, DriverFabric } from "@/features/Driver";

export const Driver = () => {
  return (
    <div className="flex justify-between w-full">
      <DriverTabs />

      <DriverFabric />
    </div>
  );
};
