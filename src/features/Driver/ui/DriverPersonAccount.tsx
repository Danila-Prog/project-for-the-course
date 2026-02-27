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
      <article className="w-full bg-white px-[20px] pt-[15px] pb-[20px] rounded-[16px] flex gap-5 mb-8">
        <Image
          src={driver?.photoUrl ?? avatar_users}
          alt="Driver avatar"
          width={176}
          height={176}
          className="w-44 h-44 rounded-xl"
        />

        <div className="flex flex-col gap-1">
          <h1 className="text-[25px] font-bold">
            Водитель: {user?.name} {user?.surname}
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
            sizeButton="lg"
            textButton="Редактировать фото"
            sizesText="text-base !h-[50px] px-[16px] mt-auto bg-orange-700 transition hover:bg-orange-800"
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
