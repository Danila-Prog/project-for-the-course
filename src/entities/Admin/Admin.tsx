import { AdminCurrentTab } from "./ui/AdminCurrentTab";
import { AdminTabs } from "./ui/AdminTabs";

export const Admin = () => {
  return (
    <div className="flex justify-between">
      <AdminTabs />

      <AdminCurrentTab />
    </div>
  );
};
