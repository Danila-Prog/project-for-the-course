"use client"

import { RegistrationFormData } from "@/features/Admin/lib/types";
import { useMutation } from "@/shared/api/useMutation";
import { useDI } from "@/shared/lib";

export const useRegistrationTab = (formData: RegistrationFormData) => {
  const { userService } = useDI();

  const { mutate: createUser } = useMutation(() =>
    userService.createUser({ ...formData, role_id: Number(formData.roleId) }),
  );

  return createUser;
};
