import { Router } from "express";
import { UserController } from "../controller/users.controller.js";

const router = Router();
const userController = new UserController();

router.get("/users", userController.getUser);
router.post("/users", userController.createUser);

export default router;
