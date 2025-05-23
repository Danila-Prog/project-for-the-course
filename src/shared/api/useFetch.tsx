import {
  IUsersDto,
  ICompaniesDto,
  IDriverDto,
  IVehiclesDto,
  IRoutesDto,
  IVehiclesTypeDto,
} from "@/pages/AuthPage/model/types";
import { useQuery } from "./useQuery";

export function useFetch(userId?: string | null, companyId?: string | null) {
  const dataUsers = useQuery<IUsersDto>("api/users");

  const dataCompany = useQuery<ICompaniesDto>("api/companies");

  const dataDrivers = useQuery<IDriverDto>("api/drivers");

  const dataVehicles = useQuery<IVehiclesDto>("api/vehicles");

  const dataVehiclesType = useQuery<IVehiclesTypeDto>(
    "api/vehicles/vehiclesType"
  );

  const dataRoutes = useQuery<IRoutesDto>("api/routes");

  const drivers = dataDrivers.data.find(
    (driver) => driver.user_id === Number(userId)
  );

  const routes = dataRoutes.data.filter(
    (route) => route.driver_id === drivers?.driver_id
  );

  const vehicles = dataVehicles.data.find(
    (vehicles) => drivers?.vehicles_id === vehicles.vehicles_id
  );

  const vehiclesType = dataVehiclesType.data.find(
    (vehiclesType) =>
      vehiclesType.vehicles_type_id === vehicles?.vehicles_type_id
  );

  const company = dataCompany.data.find(
    (company) => company.company_id === Number(companyId)
  );

  return {
    dataUsers,
    dataDrivers,
    drivers,
    vehicles,
    vehiclesType,
    company,
    routes,
    dataCompany,
    dataVehicles,
    dataVehiclesType,
    dataRoutes,
  };
}
