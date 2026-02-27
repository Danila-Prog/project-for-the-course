import { db } from "../db.js";

export class RoutesController {
  async getRoutes(req, res) {
    const routes = await db.query("SELECT * FROM public.routes");

    res.json(routes.rows);
  }

  async getRouteByDriverId(req, res) {
    const driverId = req.params.id;

    const route = await db.query(
      "SELECT * FROM public.routes WHERE driver_id = $1 AND id_status_route = 1",
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

  async updateRoute(req, res) {
    const { routeId, updates } = req.body;

    const allowedFields = [
      "driver_id",
      "start_point",
      "end_point",
      "date_start",
      "date_end",
      "id_status_route",
    ];

    const keys = Object.keys(updates).filter(
      (key) => allowedFields.includes(key) && updates[key] !== undefined,
    );

    if (keys.length === 0) {
      return res.status(400).json({ message: "Нет данных для обновления" });
    }

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const values = keys.map((key) => updates[key]);

    const query = `
      UPDATE public.routes
      SET ${setClause}
      WHERE route_id = $${keys.length + 1}
      RETURNING *
    `;

    try {
      const updatedDriver = await db.query(query, [...values, routeId]);

      if (updatedDriver.rows.length > 0) {
        res.json(updatedDriver.rows[0]);
      } else {
        res.status(404).json({ message: "Маршрута с таким ID не найден." });
      }
    } catch (error) {
      console.error("Ошибка при обновлении водителя в БД:", error);
      res
        .status(500)
        .json({ message: "Произошла ошибка сервера при обновлении водителя." });
    }
  }

  async deleteRoutes(req, res) {
    const routeId = req.params.id;
    console.log(routeId);
    const deleteRoutes = await db.query(
      "DELETE FROM public.routes WHERE route_id = $1",
      [routeId],
    );

    res.json(deleteRoutes.rows[0]);
  }

  async uploadConfirmationPhoto(req, res) {
    if (!req.file) {
      return res.status(400).json({ message: "Файл не загружен." });
    }

    const routeId = req.params.id;
    const serverBaseUrl = req.protocol + "://" + req.get("host");
    const photoUrl = `${serverBaseUrl}/uploads/${req.file.filename}`;

    try {
      await db.query(
        "UPDATE routes SET confirmation_photo = $1 WHERE route_id = $2",
        [photoUrl, routeId],
      );

      res
        .status(200)
        .json({ message: "Фотография успешно загружена.", photoUrl: photoUrl });
    } catch (error) {
      console.error("Ошибка при обновлении фото профиля:", error);
    }
  }
}

// module.exports = new RoutesController();
