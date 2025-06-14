import { db } from "../db.js";

export class CompaniesController {
  async getCompanies(req, res) {
    const companies = await db.query("SELECT * FROM public.companies");

    res.json(companies.rows);
  }
}

// module.exports = new CompaniesController();
