const Router = require("express");
const router = new Router();
const vehiclesTypeController = require("../controller/vehiclesType.controller");

router.get("/vehiclesType", vehiclesTypeController.getVehiclesType);

module.exports = router;
