import { db } from "../db.js";

export class CarController {
  async getCar(req, res) {
    const car = await db.query("SELECT * FROM public.car");

    res.json(car.rows);
  }
}
