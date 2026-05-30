"use client";

import { User } from "@/entities";
import { useAsync } from "@/shared/api/useAsync";
import { useMutation } from "@/shared/api/useMutation";
import { useDI } from "@/shared/lib";
import { useState } from "react";

export const useUserTab = (searchInput?: string, currentUserId?: number) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [findUser, setFindUser] = useState<User | null>(null);

  const { userService, driverService } = useDI();

  const { mutate, isSuccess: isSuccessDeleteUser } = useMutation((id: number) =>
    userService.deleteUser(id),
  );

  const { mutate: updateUser, isSuccess: isSuccessUpdateUser } = useMutation(
    ({
      id,
      updates,
    }: {
      id: number;
      updates: Omit<User, "userId" | "password"> & {
        password?: string;
      };
    }) => userService.updateUser(id, updates),
  );

  const { data } = useAsync(
    () => userService.getUsers(),
    [isSuccessDeleteUser, isSuccessUpdateUser],
  );

  const { data: dataDriver } = useAsync(
    () =>
      findUser?.userId
        ? driverService.getDriverByUserId(findUser.userId)
        : Promise.resolve(undefined),
    [findUser?.userId],
  );

  const { mutate: updateDriver } = useMutation((experienceYears: number) =>
    driverService.updateDriver(
      dataDriver?.driverId ?? 0,
      experienceYears ? { experience_years: experienceYears } : {},
    ),
  );

  const findUserById = (id: number) => userService.findUserById(data ?? [], id);

  const filteredUsers = data
    ? [
        ...userService.filteredUsers(
          data,
          searchInput ?? "",
          currentUserId ?? 0,
        ),
      ].reverse()
    : [];

  const openDeleteModal = (id: number) => {
    setFindUser(findUserById(id));
    setIsOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
    setFindUser(null);
  };

  const deleteUser = () => {
    if (findUser?.userId) {
      mutate(findUser?.userId);
    }
  };

  return {
    currentExperienceYears: dataDriver?.experienceYears ?? 0,
    deleteUser,
    findUser,
    setFindUser,
    filteredUsers,
    openDeleteModal,
    closeDeleteModal,
    isOpenDeleteModal,
    findUserById,
    updateUser,
    updateDriver,
  };
};
