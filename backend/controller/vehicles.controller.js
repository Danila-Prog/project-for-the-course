import { db } from "../db.js";
// const db = require("../db");

export class VehiclesController {
  async getVehicles(req, res) {
    const vehicles = await db.query("SELECT * FROM public.vehicles");

    res.json(vehicles.rows);
  }
}

// module.exports = new VehiclesController();
