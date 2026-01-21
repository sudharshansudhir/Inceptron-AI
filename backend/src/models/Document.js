import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  classId: mongoose.Schema.Types.ObjectId,
  subjectName: String,
  fileName: String,
  cloudinaryUrl: String,
  vectorNamespace: String,
  uploadedBy: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

export default mongoose.model("Document", documentSchema);
