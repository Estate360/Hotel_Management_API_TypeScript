import { Router } from "express";

import {
  createRoomType,
  findAllRoomTypes,
} from "../controllers/roomTypeController";
import { protect, restrictTo } from "../controllers/authController";

const router: Router = Router();

router.get("/room-types", protect, restrictTo("admin"), findAllRoomTypes);
router.post("/rooms-types", protect, restrictTo("admin"), createRoomType);

export default router;
