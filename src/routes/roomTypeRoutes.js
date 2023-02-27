"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roomTypeController_1 = require("../controllers/roomTypeController");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.get("/room-types", authController_1.protect, (0, authController_1.restrictTo)("admin"), roomTypeController_1.findAllRoomTypes);
router.post("/rooms-types", authController_1.protect, (0, authController_1.restrictTo)("admin"), roomTypeController_1.createRoomType);
exports.default = router;
