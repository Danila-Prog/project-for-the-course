import { Router } from "express";
import { CompaniesController } from "../controller/companies.controller.js";

const router = Router();

const companiesController = new CompaniesController();

router.get("/companies", companiesController.getCompanies);

export default router;
