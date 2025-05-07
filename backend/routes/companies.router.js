const Router = require("express");
const router = new Router();
const companiesController = require("../controller/companies.controller");

router.get("/companies", companiesController.getCompanies);

module.exports = router;
