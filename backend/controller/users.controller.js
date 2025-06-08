import { db } from "../db.js";

export class UserController {
  async getUser(req, res) {
    const users = await db.query("SELECT * FROM public.users");

    res.json(users.rows);
  }
  async createUser(req, res) {
    const { surname, name, userName, company_id, password, role_id } = req.body;
    const newUser = await db.query(
      `INSERT INTO public.users 
       (username, password, company_id, role_id, name, surname) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [userName, password, company_id, role_id, name, surname]
    );
    res.json(newUser.rows[0]);
  }
}
