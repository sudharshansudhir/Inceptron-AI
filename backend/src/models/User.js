import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["teacher", "student"] },
  classIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }]
});

export default mongoose.model("User", userSchema);
