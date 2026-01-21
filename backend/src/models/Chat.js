import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  classId: mongoose.Schema.Types.ObjectId,
  subjectName: String,
  question: String,
  answer: String
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);
