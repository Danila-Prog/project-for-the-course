import { useAsync } from "@/shared/api/useAsync";
import { useDI } from "@/shared/lib/di";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SignInField = "login" | "password";

export const useSignIn = () => {
  const [formData, setFormData] = useState({ login: "", password: "" });

  const router = useRouter();

  const { driverService, userService } = useDI();

  const { data: users } = useAsync(() => userService.getUsers());
  const { data: drivers } = useAsync(() => driverService.getDrivers());

  const signIn = () => {
    const user = users?.find(
      (u) => u.username === formData.login && u.password === formData.password,
    );

    if (!user) {
      return "invalid-credentials";
    }

    const driver = driverService.findDriveById(drivers ?? [], user.userId);

    localStorage.setItem("userId", String(user.userId));
    localStorage.setItem("username", user.username);
    localStorage.setItem("roleId", String(user.roleId));
    localStorage.setItem("name", user.name);
    localStorage.setItem("surname", user.surname);
    localStorage.setItem("driverId", String(driver?.driverId));

    router.push("/account");
  };

  const updateForm = (field: SignInField, value: string) => {
    setFormData((curr) => ({
      ...curr,
      [field]: value,
    }));
  };

  return { formData, signIn, updateForm };
};
