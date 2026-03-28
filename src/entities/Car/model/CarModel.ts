import { Car, CarDTO, CarTypeDTO } from "./types";

export class CarModel {
  public static findCarById(cars: Car[], driverCarId: number): Car | undefined {
    return cars.find((car) => driverCarId === car.carId);
  }

  public static mapDTOToCars(cars: CarDTO[]): Car[] {
    return cars.map((car) => ({
      carId: car.car_id,
      carTypeId: car.car_type_id,
      name: car.name,
      numberCar: car.number_car,
      weight: car.weight,
    }));
  }

  public static mapDTOToCarsType(
    carsType: CarTypeDTO[],
  ): Pick<Car, "carTypeId" | "carType">[] {
    return carsType.map((car) => ({
      carTypeId: car.car_type_id,
      carType: car.car_type,
    }));
  }
}
