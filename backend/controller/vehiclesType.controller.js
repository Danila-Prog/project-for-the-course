import { db } from "../db.js";
// const db = require("../db");

export class VehiclesTypeController {
  async getVehiclesType(req, res) {
    const vehiclesType = await db.query("SELECT * FROM public.vehicles_type");

    res.json(vehiclesType.rows);
  }
}

// module.exports = new VehiclesTypeController();
