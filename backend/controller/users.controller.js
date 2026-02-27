import { db } from "../db.js";

export class UserController {
  async getUser(req, res) {
    const users = await db.query("SELECT * FROM public.users");

    res.json(users.rows);
  }
  async getUserById(req, res) {
    const { id } = req.params;

    const user = await db.query(
      "SELECT * FROM public.users WHERE user_id = $1",
      [id],
    );

    res.json(user.rows[0]);
  }

  async createUser(req, res) {
    const { surname, name, username, password, roleId, email } = req.body;

    const newUser = await db.query(
      `INSERT INTO public.users 
       (username, password, role_id, name, surname, email) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [username, password, roleId, name, surname, email],
    );
    res.json(newUser.rows[0]);
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { updates } = req.body;

    const modifyUpdates = {
      ...updates,
      role_id: updates.roleId,
    };

    const allowedFields = [
      "surname",
      "name",
      "username",
      "password",
      "role_id",
      "email",
    ];

    const keys = Object.keys(modifyUpdates).filter(
      (key) => allowedFields.includes(key) && modifyUpdates[key] !== undefined,
    );

    if (keys.length === 0) {
      return res.status(400).json({ message: "Нет данных для обновления" });
    }

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const values = keys.map((key) => modifyUpdates[key]);

    const query = `
      UPDATE public.users
      SET ${setClause}
      WHERE user_id = $${keys.length + 1}
      RETURNING *
    `;
    try {
      const updatedUser = await db.query(query, [...values, id]);
      res.json(updatedUser.rows[0]);
    } catch (error) {
      console.error("Ошибка при обновлении пользователя:", error);
      res
        .status(500)
        .json({ message: "Ошибка сервера при обновлении пользователя" });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      // Проверяем, является ли пользователь водителем
      const driver = await db.query(
        "SELECT driver_id FROM public.drivers WHERE user_id = $1",
        [id],
      );

      if (driver.rows.length > 0) {
        // Если пользователь - водитель, сначала удаляем запись водителя
        await db.query("DELETE FROM public.drivers WHERE user_id = $1", [id]);
      }

      // Теперь удаляем пользователя
      const deletedUser = await db.query(
        `DELETE FROM public.users WHERE user_id = $1 RETURNING *`,
        [id],
      );

      if (deletedUser.rows.length === 0) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      res.json(deletedUser.rows[0]);
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
      res
        .status(500)
        .json({ message: "Ошибка сервера при удалении пользователя" });
    }
  }
}
