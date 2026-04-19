import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/teacher", teacherRoutes); 
app.use("/api/document", documentRoutes);
app.use("/api/chat", chatRoutes);

app.use("/api/student", studentRoutes);
import { embedText } from "./services/embeddingService.js";

const test = await embedText("hello world");
console.log("Embedding length:", test.length);

export default app;
 