const Router = require("express");
const router = new Router();
const routesController = require("../controller/routes.controller");

router.get("/routes", routesController.getRoutes);
router.delete("/routes/:route_id", routesController.deleteRoutes);
router.post("/routes", routesController.createRoutes);
router.patch("/routes", routesController.updateRoutes);
module.exports = router;
