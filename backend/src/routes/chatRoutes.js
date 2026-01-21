import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { askQuestion } from "../controllers/chatController.js";

const router = express.Router();

router.post(
  "/ask",
  authMiddleware,
  roleMiddleware("student"),
  askQuestion
);

export default router;
