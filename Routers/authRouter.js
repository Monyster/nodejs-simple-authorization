const Router = require("express");
const router = new Router();
const controller = require("../Controllers/authController");
const { check } = require("express-validator");
const authMiddleware = require("../Middlewares/authMiddleware");
const roleMiddleware = require("../Middlewares/roleMiddleware");

router.post(
  "/registration",
  [
    check("username", "Field username cant be empty").notEmpty(),
    check("password", "Password >4 and <16").isLength({ min: 4, max: 16 }),
  ],
  controller.registration
);

router.post(
  "/login",
  [check("username", "Field username cant be empty").notEmpty()],
  controller.login
);

router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);

module.exports = router;
