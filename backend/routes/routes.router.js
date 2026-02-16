import { Router } from "express";
import { RoutesController } from "../controller/routes.controller.js";
import { confirmRoutePhotoUpload } from "../multier.js";

const router = Router();
const routesController = new RoutesController();

router.get("/routes", routesController.getRoutes);
router.get("/routes/:id", routesController.getRouteByDriverId);
router.delete("/routes/:id", routesController.deleteRoutes);
router.post("/routes", routesController.createRoutes);
router.patch("/routes", routesController.updateRoutes);
router.patch(
  "/routes/:id",
  confirmRoutePhotoUpload,
  //   driversController.uploadProfilePhoto,
);

export default router;
