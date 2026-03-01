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
      <article className="w-full bg-white py-5 pb-7 px-5 md:px-10 rounded-xl flex min-[650px]:flex-row min826:flex-col lg:flex-row flex-col gap-5 mb-8">
        <Image
          src={driver?.photoUrl ?? avatar_users}
          alt="Driver avatar"
          width={176}
          height={176}
          className="w-44 h-44 rounded-xl aspect-square flex flex-shrink-0"
        />

        <div className="flex flex-col gap-1.5">
          <h1 className="text-[25px] font-bold">
            {user?.name} {user?.surname}
          </h1>

          <span className="block">Username: {user?.username}</span>

          <span>
            Ваш стаж: {driver?.experienceYears}{" "}
            {declensionWord(Number(driver?.experienceYears), [
              "год",
              "года",
              "лет",
            ])}
          </span>

          <UiButton
            textButton="Редактировать фото"
            sizesText="text-base py-2 max-w-[320px] px-4 mt-auto bg-orange-700 transition hover:bg-orange-800 !mt-auto"
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
