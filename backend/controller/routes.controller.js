import { db } from "../db.js";

export class RoutesController {
  async getRoutes(req, res) {
    const routes = await db.query("SELECT * FROM public.routes");

    res.json(routes.rows);
  }

  async getRouteByDriverId(req, res) {
    const driverId = req.params.id;

    const route = await db.query(
      "SELECT * FROM public.routes WHERE driver_id = $1",
      [driverId],
    );

    res.json(route.rows);
  }

  async createRoutes(req, res) {
    const { driver_id, start_point, end_point, date_start, date_end } =
      req.body;

    const newRoute = await db.query(
      `INSERT INTO public.routes (driver_id, start_point, end_point, date_start, date_end, id_status_route) VALUES ($1, $2, $3, $4, $5, 1) RETURNING *`,
      [driver_id, start_point, end_point, date_start, date_end],
    );
    res.json(newRoute.rows[0]);
  }

  async updateRoutes(req, res) {
    const { driver_id, start_point, end_point, date_start, date_end } =
      req.body;

    const updateRoute = await db.query(
      "UPDATE public.routes SET start_point = $2, end_point = $3, date_start = $4, date_end = $5 WHERE driver_id = $1 RETURNING *",
      [driver_id, start_point, end_point, date_start, date_end],
    );
    
    res.json(updateRoute.rows[0]);
  }

  async deleteRoutes(req, res) {
    const route_id = req.params.route_id;
    const deleteRoutes = await db.query(
      "DELETE FROM public.routes WHERE route_id = $1",
      [route_id],
    );
    res.json(deleteRoutes.rows[0]);
  }
}

// module.exports = new RoutesController();
