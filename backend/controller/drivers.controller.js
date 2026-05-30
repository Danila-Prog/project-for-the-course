import { db } from "../db.js";

export class DriverController {
  static #DEFAULT_STATUS_DRIVER_ID = 1;

  async getDrivers(req, res) {
    const drivers = await db.query("SELECT * FROM public.drivers");

    res.json(drivers.rows);
  }

  async getDriverById(req, res) {
    const driver = await db.query(
      "SELECT * FROM public.drivers WHERE driver_id = $1",
      [req.params.id],
    );

    res.json(driver.rows);
  }

  async getDriverByUserId(req, res) {
    const driver = await db.query(
      "SELECT * FROM public.drivers WHERE user_id = $1",
      [req.params.id],
    );

    res.json(driver.rows);
  }

  async createDriver(req, res) {
    try {
      const { userId, experienceYears } = req.body;

      if (!userId || !Number.isFinite(experienceYears) || experienceYears < 0) {
        return res
          .status(400)
          .json({ error: "Invalid userId or experienceYears" });
      }

      const { rows } = await db.query(
        `INSERT INTO public.drivers 
             (user_id, experience_years, car_id, status_driver_id, photo_url) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING *`,
        [
          userId,
          experienceYears,
          null,
          DriverController.#DEFAULT_STATUS_DRIVER_ID,
          null,
        ],
      );

      return res.status(201).json(rows[0]);
    } catch (error) {
      if (error.code === "23503") {
        return res.status(409).json({ error: "User not found" });
      }
      console.error("createDriver error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateDriver(req, res) {
    const { driver_id, updates } = req.body;

    const allowedFields = ["status_driver_id", "car_id", "experience_years"];

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
      UPDATE public.drivers
      SET ${setClause}
      WHERE driver_id = $${keys.length + 1}
      RETURNING *
    `;

    try {
      const updatedDriver = await db.query(query, [...values, driver_id]);

      if (updatedDriver.rows.length > 0) {
        res.json(updatedDriver.rows[0]); // Возвращаем обновленный объект
      } else {
        // Если driver_id не найден, rows будет пуст
        res.status(404).json({ message: "Водитель с таким ID не найден." });
      }
    } catch (error) {
      console.error("Ошибка при обновлении водителя в БД:", error);
      // Всегда возвращаем JSON-ответ при ошибке
      res
        .status(500)
        .json({ message: "Произошла ошибка сервера при обновлении водителя." });
    }
  }

  async uploadProfilePhoto(req, res) {
    if (!req.file) {
      return res.status(400).json({ message: "Файл не загружен." });
    }

    const driverId = req.params.id;
    const serverBaseUrl = req.protocol + "://" + req.get("host");
    const photoUrl = `${serverBaseUrl}/uploads/${req.file.filename}`;

    try {
      await db.query("UPDATE drivers SET photo_url = $1 WHERE driver_id = $2", [
        photoUrl,
        driverId,
      ]);

      res
        .status(200)
        .json({ message: "Фотография успешно загружена.", photoUrl: photoUrl });
    } catch (error) {
      console.error("Ошибка при обновлении фото профиля:", error);
    }
  }
}
