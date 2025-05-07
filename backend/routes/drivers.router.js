const Router = require("express");
const router = new Router();
const driversController = require("../controller/drivers.controller");

router.get("/drivers", driversController.getDrivers);
router.patch("/drivers", driversController.changingStatus);
module.exports = router;
