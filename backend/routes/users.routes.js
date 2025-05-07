const Router = require("express");
const router = new Router();
const userController = require("../controller/users.controller");

router.get("/users", userController.getUser);
router.post("/users", userController.createUser);

module.exports = router;
