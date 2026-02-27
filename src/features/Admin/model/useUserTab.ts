"use client";

import { User } from "@/entities";
import { useAsync } from "@/shared/api/useAsync";
import { useMutation } from "@/shared/api/useMutation";
import { useDI } from "@/shared/lib";
import { useState } from "react";

export const useUserTab = (searchInput?: string, currentUserId?: number) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { userService } = useDI();

  const { mutate, isSuccess: isSuccessDeleteUser } = useMutation((id: number) =>
    userService.deleteUser(id),
  );

  const { mutate: updateUser, isSuccess: isSuccessUpdateUser } = useMutation(
    ({ id, updates }: { id: number; updates: Omit<User, "userId"> }) =>
      userService.updateUser(id, updates),
  );

  const { data } = useAsync(
    () => userService.getUsers(),
    [isSuccessDeleteUser, isSuccessUpdateUser],
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
    setSelectedUserId(id);
    setIsOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
    setSelectedUserId(null);
  };

  const deleteUser = () => {
    if (selectedUserId) {
      mutate(selectedUserId);
    }
  };

  return {
    deleteUser,
    filteredUsers,
    openDeleteModal,
    closeDeleteModal,
    isOpenDeleteModal,
    findUserById,
    updateUser,
  };
};
