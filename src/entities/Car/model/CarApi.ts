import { httpClient } from "@/shared/api/httpClient";
import { CarDTO, CarRepository, CarTypeDTO } from "./types";

export class CarApi implements CarRepository {
  private readonly ENDPOINT_CAR = "car";

  public getCar() {
    return httpClient.get<CarDTO[]>(this.ENDPOINT_CAR);
  }

  public getCarType() {
    return httpClient.get<CarTypeDTO[]>(`${this.ENDPOINT_CAR}/carType`);
  }
}
