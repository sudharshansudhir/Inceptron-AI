import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  createClass,
  addStudentToClass,
  removeStudentFromClass,
  addSubjectToClass,
  getMyClasses
} from "../controllers/teacherController.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("teacher"));

router.post("/class", createClass);
router.post("/class/:id/student", addStudentToClass);
router.delete("/class/:id/student/:sid", removeStudentFromClass);
router.post("/class/:id/subject", addSubjectToClass);
router.get("/classes", getMyClasses);

export default router;
