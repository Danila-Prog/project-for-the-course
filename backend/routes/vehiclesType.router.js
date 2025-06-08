import { Router } from "express";
import { VehiclesTypeController } from "../controller/vehiclesType.controller.js";

const router = Router();
const vehiclesTypeController = new VehiclesTypeController();

router.get("/vehiclesType", vehiclesTypeController.getVehiclesType);

export default router;
