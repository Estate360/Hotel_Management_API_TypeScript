import { Router } from "express";

import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";
import {
  userRegistrationValidator,
  userLoginValidator,
} from "../middlewares/userValidator";

const router: Router = Router();

router.post("/register", userRegistrationValidator, authController.register);
router.post("/login", userLoginValidator, authController.login);

router
  .route("/")
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);
router.use(authController.protect);

router.use(authController.protect);
router.use(authController.restrictTo("admin"));
router
  .route("/:id")
  .get(userController.getOneUser)
  .patch(userController.updateUser)

  .delete(userController.deleteUser);

export default router;
