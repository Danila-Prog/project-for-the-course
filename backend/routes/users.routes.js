import { Router } from "express";
import { UserController } from "../controller/users.controller.js";

const router = Router();
const userController = new UserController();

router.get("/users", userController.getUser);
router.post("/users", userController.createUser);
router.get("/users/:id", userController.getUserById);
router.delete("/users/:id", userController.deleteUser);
router.patch("/users/:id", userController.updateUser);

export default router;
