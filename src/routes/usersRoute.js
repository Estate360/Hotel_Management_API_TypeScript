"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post("/register", authController_1.register);
router.post("/login", authController_1.login);
router.route("/").get(authController_1.protect, userController_1.getAllUsers).post(userController_1.createUser);
router.use(authController_1.protect);
router
    .route("/:id")
    .get(userController_1.getOneUser)
    .patch(userController_1.updateUser)
    .delete((0, authController_1.restrictTo)("admin"), userController_1.deleteUser);
exports.default = router;
