import { Router } from "express";
import { RoutesController } from "../controller/routes.controller.js";

const router = Router();
const routesController = new RoutesController();

router.get("/routes", routesController.getRoutes);
router.delete("/routes/:route_id", routesController.deleteRoutes);
router.post("/routes", routesController.createRoutes);
router.patch("/routes", routesController.updateRoutes);

export default router;
