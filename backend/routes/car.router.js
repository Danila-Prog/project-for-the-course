import { Router } from "express";
import { CarController } from "../controller/car.controller.js";

const router = Router();
const carController = new CarController();

router.get("/car", carController.getCar);

export default router;
