import { DriverTabs, DriverFabric } from "@/features/Driver";

export const Driver = () => {
  return (
    <div className="flex flex-col min826:flex-row min826:justify-between max-min826:gap-5">
      <DriverTabs />

      <div className="flex-1 min-w-0">
        <DriverFabric />
      </div>
    </div>
  );
};
