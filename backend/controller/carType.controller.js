import { db } from "../db.js";

export class CarTypeController {
  async getCarType(req, res) {
    const carType = await db.query("SELECT * FROM public.car_type");

    res.json(carType.rows);
  }
}
