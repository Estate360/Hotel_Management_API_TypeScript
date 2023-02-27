import { Router } from "express";

import { protect, restrictTo } from "../controllers/authController";
import {
  findAllRooms,
  createRoom,
  findOneRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController";

const router: Router = Router();

router
  .route("/rooms")
  .get(findAllRooms)
  .post(protect, restrictTo("admin"), createRoom);

router.use(protect);
router
  .route("/room/:id")
  .get(findOneRoom)
  .patch(restrictTo("admin"), updateRoom)
  .delete(restrictTo("admin"), deleteRoom);

export default router;
