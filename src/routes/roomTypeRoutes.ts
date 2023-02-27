import { Router } from "express";
import {
  createRoomType,
  deleteRoomType,
  findAllRoomTypes,
  findOneRoomType,
  updateRoomType,
} from "../controllers/roomTypeController";
import { protect, restrictTo } from "../controllers/authController";

const router: Router = Router();

router.use(protect, restrictTo("admin"));
router.get("/rooms-types", findAllRoomTypes);
router.post("/rooms-types", createRoomType);
router
  .route("/room-type/:id")
  .get(findOneRoomType)
  .patch(updateRoomType)
  .delete(deleteRoomType);

export default router;
