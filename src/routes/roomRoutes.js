"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const roomController_1 = require("../controllers/roomController");
const router = (0, express_1.Router)();
router
    .route("/rooms")
    .get(roomController_1.findAllRooms)
    .post(authController_1.protect, (0, authController_1.restrictTo)("admin"), roomController_1.createRoom);
router.use(authController_1.protect);
router
    .route("/room/:id")
    .get(roomController_1.findOneRoom)
    .patch((0, authController_1.restrictTo)("admin"), roomController_1.updateRoom)
    .delete((0, authController_1.restrictTo)("admin"), roomController_1.deleteRoom);
exports.default = router;
