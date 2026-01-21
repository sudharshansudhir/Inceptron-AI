import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { uploadDocument } from "../controllers/documentController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/upload/:classId/:subjectName",
  authMiddleware,
  roleMiddleware("teacher"),
  upload.single("file"),
  uploadDocument
);

export default router;
