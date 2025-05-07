// import { IUser } from "@/pages/AccountePage/model/types";

// interface IFilters {
//   search: string;
//   experienceFrom: string;
//   experienceBefore: string;
//   capacityFrom: string;
//   capacityBefore: string;
//   typeCar: string;
// }

// export const filterUsers = (users: IUser[], filters: IFilters) => {
//   return users.filter((user) => {
//     const userExperience = Number(user.experience.replace(/[^\d.,]/g, ""));
//     const userCapacity = Number(user.capacity.replace(/[^\d.,]/g, ""));

//     const onlyTypeCar = user.typeCar.split(" ")[0];

//     const {
//       search,
//       experienceFrom,
//       experienceBefore,
//       capacityFrom,
//       capacityBefore,
//       typeCar,
//     } = filters;

//     const matchsUser =
//       (user.nameDriver &&
//         user.nameDriver.toLowerCase().includes(search.toLowerCase())) ||
//       (user.numberCar &&
//         user.numberCar.toLowerCase().includes(search.toLowerCase()));

//     const matchesExperience =
//       (experienceFrom ? userExperience >= Number(experienceFrom) : true) &&
//       (experienceBefore ? userExperience <= Number(experienceBefore) : true);

//     const matchCapacity =
//       (capacityFrom ? userCapacity >= Number(capacityFrom) : true) &&
//       (capacityBefore ? userCapacity <= Number(capacityBefore) : true);

//     const matchesTypeCar =
//       (typeCar === "passenger" && onlyTypeCar === "Легковой") ||
//       (typeCar === "truck" && onlyTypeCar === "Грузовой") ||
//       !typeCar;

//     return matchsUser && matchesExperience && matchesTypeCar && matchCapacity;
//   });
// };
