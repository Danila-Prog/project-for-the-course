import { AdminTabs, AdminFabric } from "../features";

export const Admin = () => {
  return (
    <div className="flex flex-col min826:flex-row min826:justify-between gap-5">
      <AdminTabs />

      <AdminFabric />
    </div>
  );
};
