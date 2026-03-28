import { db } from "../db.js";

export class HistoryRouteController {
  async getHistoryRoutes(req, res) {
    const routes = await db.query("SELECT * FROM public.history_routes");

    res.json(routes.rows);
  }

  async createRouteForHistory(req, res) {
    const { driverId, routeId, carId, userId } = req.body;

    try {
      const { rows } = await db.query(
        "INSERT INTO public.history_routes (id_driver, id_route, id_car, id_user) VALUES ($1, $2, $3, $4) RETURNING *",
        [driverId, routeId, carId, userId],
      );

      res.status(201).json(rows[0]);
    } catch (error) {
      console.error("Error creating route:", error);
      res.status(500).json({ message: "Failed to create route" });
    }
  }
}
