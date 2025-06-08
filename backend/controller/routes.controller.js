import { db } from "../db.js";
// const db = require("../db");

export class RoutesController {
  async getRoutes(req, res) {
    const routes = await db.query("SELECT * FROM public.routes");

    res.json(routes.rows);
  }
  async createRoutes(req, res) {
    const { driver_id, start_point, end_point } = req.body;
    const newRoute = await db.query(
      `INSERT INTO public.routes (driver_id, start_point, end_point) VALUES ($1, $2, $3) RETURNING *`,
      [driver_id, start_point, end_point]
    );
    res.json(newRoute.rows[0]);
  }
  async updateRoutes(req, res) {
    const { driver_id, start_point, end_point } = req.body;

    const updateRoute = await db.query(
      "UPDATE public.routes SET start_point = $2, end_point = $3 WHERE driver_id = $1 RETURNING *",
      [driver_id, start_point, end_point]
    );
    res.json(updateRoute.rows[0]);
  }

  async deleteRoutes(req, res) {
    const route_id = req.params.route_id;
    const deleteRoutes = await db.query(
      "DELETE FROM public.routes WHERE route_id = $1",
      [route_id]
    );
    res.json(deleteRoutes.rows[0]);
  }
}

// module.exports = new RoutesController();
