import { Router } from "express";
import { DriverController } from "../controller/drivers.controller.js";
import { profilePhotoUpload } from "../multier.js";

const router = Router();
const driversController = new DriverController();

router.get("/drivers", driversController.getDrivers);
router.get("/drivers/:id", driversController.getDriverById);
router.patch("/drivers", driversController.updateDriver);
router.patch(
  "/drivers/:id",
  profilePhotoUpload,
  driversController.uploadProfilePhoto,
);
export default router;
