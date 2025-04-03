import { ICardUser } from "@/entities/CardUser/CardUser";

interface IFilters {
  search: string;
  experienceFrom: string;
  experienceBefore: string;
  status: string;
  typeCar: string;
}
export const filterUsers = (users: ICardUser[], filters: IFilters) => {
  return users.filter((user) => {
    const userExperience = Number(user.experience.replace(/\D/g, ""));
    const onlyTypeCar = user.typeCar.split(" ")[0];

    const { search, experienceFrom, experienceBefore, status, typeCar } =
      filters;

    const matchsUser =
      (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
      (user.numberCar &&
        user.numberCar.toLowerCase().includes(search.toLowerCase()));

    const matchesExperience =
      (experienceFrom ? userExperience >= Number(experienceFrom) : true) &&
      (experienceBefore ? userExperience <= Number(experienceBefore) : true);

    const matchesStatus =
      (status === "available" && user.status === "Доступен") ||
      (status === "busy" && user.status === "Занят") ||
      !status;

    const matchesTypeCar =
      (typeCar === "passenger" && onlyTypeCar === "Легковой") ||
      (typeCar === "truck" && onlyTypeCar === "Грузовой") ||
      !typeCar;

    return matchsUser && matchesExperience && matchesStatus && matchesTypeCar;
  });
};
