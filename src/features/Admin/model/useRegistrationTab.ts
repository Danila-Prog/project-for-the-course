"use client";

import { RegistrationFormData } from "@/features/Admin/lib/types";
import { useMutation } from "@/shared/api/useMutation";
import { useDI } from "@/shared/lib";

export const useRegistrationTab = (
  formData: RegistrationFormData,
  experienceYears?: number,
) => {
  const { userService, driverService } = useDI();

  const { mutate: createUser } = useMutation(() =>
    userService.createUser({ ...formData, role_id: Number(formData.roleId) }),
  );

  const { mutate: createDriver } = useMutation((userId: number) =>
    driverService.createDriver({
      userId,
      experienceYears: experienceYears ?? 0,
    }),
  );

  const create = async () => {
    const user = await createUser();

    if (formData.roleId === 1 && user?.userId) {
      await createDriver(user.userId);
    }
  };

  return create;
};
