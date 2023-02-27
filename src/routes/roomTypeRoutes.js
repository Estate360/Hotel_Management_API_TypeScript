"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roomTypeController_1 = require("../controllers/roomTypeController");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.use(authController_1.protect, (0, authController_1.restrictTo)("admin"));
router.get("/rooms-types", roomTypeController_1.findAllRoomTypes);
router.post("/rooms-types", roomTypeController_1.createRoomType);
router
    .route("/room-type/:id")
    .get(roomTypeController_1.findOneRoomType)
    .patch(roomTypeController_1.updateRoomType)
    .delete(roomTypeController_1.deleteRoomType);
exports.default = router;
