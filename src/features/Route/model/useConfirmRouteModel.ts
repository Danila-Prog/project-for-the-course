"use client";

import { useRouteDI } from "@/features/Driver";
import { useMutation } from "@/shared/api/useMutation";
import { useAuth, useDI } from "@/shared/lib";

export const useConfirmRoute = () => {
  const { routeService } = useDI();
  const { setIsUpdateRoute } = useRouteDI();
  const { user } = useAuth();

  const confirmRoute = useMutation((formData: FormData) =>
    routeService.confirmRoute(formData, user?.userId ?? 0),
  );

  const handleSubmitConfirmRoute = async (selectedFile: File) => {
    const formData = new FormData();
    formData.append("confirmPhoto", selectedFile);
    await confirmRoute.mutate(formData);
    setIsUpdateRoute(true);
  };

  return { handleSubmitConfirmRoute };
};
