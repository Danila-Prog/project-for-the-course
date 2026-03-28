import { CardDriver, Driver, User } from "@/entities";
import { declensionWord, STATUS_DRIVER } from "@/shared/lib";
import { StateSetter } from "@/shared/types";
import avatar_users from "/public/icons/avatar_users.webp";

interface Props {
  user: User;
  driver: Driver;
  toggleFormOrder: () => void;
  setSelectedDriverId: StateSetter<number | null>;
  setSelectedUserId: StateSetter<number | null>;
}
export const CardAllDrivers = ({
  user,
  driver,
  toggleFormOrder,
  setSelectedDriverId,
  setSelectedUserId,
}: Props) => {
  return (
    <CardDriver
      nameDriver={`${user.name} ${user.surname}`}
      imageSrc={driver.photoUrl ?? avatar_users}
      status={STATUS_DRIVER[driver.statusDriverId]}
      experience={`${driver.experienceYears} ${declensionWord(
        Number(driver.experienceYears),
        ["год", "года", "лет"],
      )}`}
      buttons={
        <button
          className="px-4 py-1.5 rounded-xl bg-accent-green transition hover:hover:scale-[1.02] text-primary-white text-base mt-5"
          onClick={() => {
            toggleFormOrder();
            setSelectedDriverId(driver.driverId);
            setSelectedUserId(driver.userId);
          }}
        >
          Дать заказ
        </button>
      }
    />
  );
};
