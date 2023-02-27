import { Router } from "express";

import {
  login,
  protect,
  register,
  restrictTo,
} from "../controllers/authController";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from "../controllers/userController";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);

router.route("/").get(protect, getAllUsers).post(createUser);
router.use(protect);
router
  .route("/:id")
  .get(getOneUser)
  .patch(updateUser)

  .delete(restrictTo("admin"), deleteUser);

export default router;
