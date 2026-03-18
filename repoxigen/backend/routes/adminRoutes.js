import express from "express";
import {
  getPendingList,
  approveMember,
  rejectMember,
  getDashboardData,
  manageUsers,
  editUser,
  resetPassword,
  removeUser,
} from "../controllers/adminController.js";
import {
  verifyToken,
  onlyAdmin,
  onlyHumaniora,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyToken, onlyAdmin);

router.get("/pending", getPendingList);
router.post("/approve", approveMember);
router.post("/reject", rejectMember);

router.get("/dashboard-stats", verifyToken, onlyHumaniora, getDashboardData);
router.get("/users", verifyToken, onlyHumaniora, manageUsers);
router.put("/users/:nim", verifyToken, onlyHumaniora, editUser);
router.delete("/users/:nim", verifyToken, onlyHumaniora, removeUser);
router.post("/users/reset-password", verifyToken, onlyHumaniora, resetPassword);

export default router;