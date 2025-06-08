import { Router } from "express";
import { DriversController } from "../controller/drivers.controller.js";

const router = Router();
const driversController = new DriversController();

router.get("/drivers", driversController.getDrivers);
router.patch("/drivers", driversController.changingStatus);

export default router;
