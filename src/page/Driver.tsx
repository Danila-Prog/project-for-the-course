import { DriverPersonAccount } from "@/features/Driver/ui/DriverPersonAccount";
import { DriverRoutes } from "@/features/Driver/ui/DriverRoutes";
import { useAsync } from "@/shared/api/useAsync";
import { useAuth, useDI } from "@/shared/lib";

export const Driver = () => {
  const { user } = useAuth();
  const { driverService } = useDI();

  const { data: driver } = useAsync(() =>
    driverService.getDriverByUserId(user?.userId ?? 0),
  );

  return (
    <div className="flex flex-col min826:flex-row min826:justify-between max-min826:gap-5">
      <div className="flex-1 min-w-0 flex flex-col lg:flex-row gap-4 xl:gap-8 justify-between">
        <DriverPersonAccount
          driverId={driver?.driverId ?? 0}
          userId={user?.userId ?? 0}
        />

        <DriverRoutes driverId={driver?.driverId ?? 0} />
      </div>
    </div>
  );
};
