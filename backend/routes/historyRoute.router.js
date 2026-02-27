import Router from "express";
import { HistoryRouteController } from "../controller/historyRoute.controller.js";

const router = Router();

const historyRoutes = new HistoryRouteController();

router.post("/history-routes", historyRoutes.createRouteForHistory);
router.get("/history-routes", historyRoutes.getHistoryRoutes);

export default router;
