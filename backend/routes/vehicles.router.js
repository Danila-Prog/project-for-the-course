import { Router } from "express";
import { VehiclesController } from "../controller/vehicles.controller.js";

const router = Router();
const vehiclesController = new VehiclesController();

router.get("/vehicles", vehiclesController.getVehicles);

export default router;
