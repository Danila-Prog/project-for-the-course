export interface IUsersDto extends Pick<ICompaniesDto, "company_id"> {
  username: string;
  password: string;
  user_id: number;
  role_id: number;
  name: string;
  surname: string;
}

export interface ICompaniesDto {
  company_id: number;
  company_name: string;
}

export interface IVehiclesDto {
  number_car: string;
  vehicles_id: number;
  vehicles_type_id: number;
  vehicles_capacity: string;
  name_vehicles: string;
}

export interface IVehiclesTypeDto
  extends Pick<IVehiclesDto, "vehicles_type_id"> {
  vehicles_type: string;
}
export interface IDriverDto
  extends Pick<IUsersDto, "user_id">,
    Pick<IVehiclesDto, "vehicles_id"> {
  driver_id: number;
  experience_years: string;
  status_driver_id: number;
}

export interface IRoutesDto extends Pick<IDriverDto, "driver_id"> {
  route_id: number;
  start_point: string;
  end_point: string;
}
