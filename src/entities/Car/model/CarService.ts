import { Car, CarRepository } from "./types";
import { CarModel } from "./CarModel";

export class CarService {
  constructor(private readonly repository: CarRepository) {}

  async getCars() {
    const [{ data }, { data: carsType }] = await Promise.all([
      this.repository.getCar(),
      this.repository.getCarType(),
    ]);

    const normalizeCarsType = CarModel.mapDTOToCarsType(carsType);

    return CarModel.mapDTOToCars(data).map((car) => ({
      ...car,
      carType: normalizeCarsType.find(
        (carType) => car.carTypeId === carType.carTypeId,
      )?.carType,
    }));
  }

  findCarById(car: Car[], driverCarId: number) {
    return CarModel.findCarById(car, driverCarId);
  }
}
