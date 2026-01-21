import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import Class from "../models/Class.js";

const router = express.Router();

router.get(
  "/classes",
  authMiddleware,
  roleMiddleware("student"),
  async (req, res) => {
    try {
      const classes = await Class.find({
        students: req.user._id
      });

      res.json(classes);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
