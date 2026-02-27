import { AdminTabs, AdminFabric } from "../features";

export const Admin = () => {
  return (
    <div className="flex justify-between">
      <AdminTabs />

      <AdminFabric />
    </div>
  );
};
