import { Router } from "express";
import { CarTypeController } from "../controller/carType.controller.js";

const router = Router();
const carTypeController = new CarTypeController();

router.get("/carType", carTypeController.getCarType);

export default router;
