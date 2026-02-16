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
    const { surname, name, username, password, role_id, email } = req.body;

    const newUser = await db.query(
      `INSERT INTO public.users 
       (username, password, role_id, name, surname, email) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [username, password, role_id, name, surname, email],
    );
    res.json(newUser.rows[0]);
  }
  
  async updateUser(req, res) {
    const { id } = req.params;
    const { surname, name, username, password, role_id, email } = req.body;

    try {
      const updatedUser = await db.query(
        `UPDATE public.users 
         SET username = $1, password = $2, role_id = $3, name = $4, surname = $5, email = $6 
         WHERE user_id = $7 
         RETURNING *`,
        [username, password, role_id, name, surname, email, id],
      );
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
