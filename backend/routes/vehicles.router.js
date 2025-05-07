const Router = require("express");
const router = new Router();
const vehiclesController = require("../controller/vehicles.controller");

router.get("/vehicles", vehiclesController.getVehicles);

module.exports = router;
