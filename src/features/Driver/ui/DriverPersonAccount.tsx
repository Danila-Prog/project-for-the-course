"use client";

import { useState } from "react";
import { declensionWord, useDI } from "@/shared/lib";
import Image from "next/image";
import { UiButton } from "@/shared";
import DriverPersonFormEditing from "./DriverPersonFormEditing";
import avatar_users from "/public/icons/avatar_users.webp";
import { useAsync } from "@/shared/api/useAsync";

interface Props {
  userId: number;
  driverId: number;
}

export const DriverPersonAccount = ({ driverId, userId }: Props) => {
  const [isOpenDriverPersonFormEditing, setIsOpenDriverPersonFormEditing] =
    useState<boolean>(false);

  const [isEditPhoto, setIsEditPhoto] = useState(false);

  const { driverService, userService } = useDI();

  const { data: driver } = useAsync(
    () => driverService.getDriverById(driverId),
    [driverId, isEditPhoto],
  );

  const { data: user } = useAsync(
    () => userService.getUserById(Number(userId)),
    [userId],
  );

  if (!driver || !user) return;

  const handleOpenDriverPersonEditingPerson = () => {
    setIsOpenDriverPersonFormEditing((curr) => !curr);
  };
  const toggleIsEditPhoto = () => {
    setIsEditPhoto((curr) => !curr);
  };

  return (
    <>
      <article className="w-full md:w-fit h-fit bg-white py-5 px-6 sm:px-8 rounded-2xl flex flex-col min-[563px]:flex-row items-center gap-5">
        <Image
          src={driver?.photoUrl ?? avatar_users}
          alt="Driver avatar"
          width={176}
          height={176}
          className="w-44 h-44 rounded-xl aspect-square flex flex-shrink-0"
        />

        <div className="flex flex-col gap-1.5 w-full md:w-fit">
          <h1 className="text-xl sm:text-2xl font-bold">
            {user?.name} {user?.surname}
          </h1>

          <span className="block text-sm sm:text-base">
            Username: {user?.username}
          </span>

          <span className="text-sm sm:text-base">
            Ваш стаж: {driver?.experienceYears}{" "}
            {declensionWord(Number(driver?.experienceYears), [
              "год",
              "года",
              "лет",
            ])}
          </span>

          <UiButton
            textButton="Редактировать фото"
            sizesText="text-sm sm:text-base"
            className="py-2 px-4 mt-4 bg-primary-gray text-white "
            onClick={handleOpenDriverPersonEditingPerson}
          />
        </div>
      </article>

      <DriverPersonFormEditing
        isOpen={isOpenDriverPersonFormEditing}
        onClose={handleOpenDriverPersonEditingPerson}
        driverId={driverId}
        toggleIsEditPhoto={toggleIsEditPhoto}
      />
    </>
  );
};
