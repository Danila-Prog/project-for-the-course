import { STATUS_DRIVER } from "@/shared/lib";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { ReactElement } from "react";

interface Props {
  imageSrc: StaticImageData | string;
  nameDriver: string;
  status: (typeof STATUS_DRIVER)[keyof typeof STATUS_DRIVER];
  experience: string;
  buttons?: ReactElement;
  infoRoute?: ReactElement;
  confirmPhoto?: ReactElement;
  menu?: ReactElement;
}

const styleStatusDriver = {
  Доступен: "text-secondary-green",
  Назначенный: "text-orange-600",
  Активный: "text-red-700",
  Выполнен: "text-secondary-green",
};

export const CardDriver = ({
  imageSrc,
  nameDriver,
  status,
  experience,
  buttons,
  menu,
  infoRoute,
  confirmPhoto,
}: Props) => {
  return (
    <article className="shadow-card rounded-xl p-5 h-full">
      <main className="flex flex-col lg:flex-row gap-5">
        <div className="flex flex-shrink-0 justify-between lg:block">
          <Image
            src={imageSrc}
            alt="Driver photo"
            width={128}
            height={128}
            className="w-32 h-32 rounded-xl"
          />

          <div className="lg:hidden">{menu}</div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-2xl font-bold text-accent-black">{nameDriver}</h2>

          <p className="text-sm text-accent-black">
            Статуc:{" "}
            <span className={clsx(styleStatusDriver[status], "font-medium")}>
              {status}
            </span>
          </p>

          <p className="text-sm text-accent-black">
            Стаж:{" "}
            <span className="font-medium text-accent-black">{experience}</span>
          </p>

          {buttons}
        </div>

        <div className="hidden lg:block">{menu}</div>
      </main>

      {infoRoute}

      {confirmPhoto}
    </article>
  );
};
