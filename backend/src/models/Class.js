import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  className: String,
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  subjects: [
    {
      subjectName: String,
      vectorNamespace: String
    }
  ]
});

export default mongoose.model("Class", classSchema);
