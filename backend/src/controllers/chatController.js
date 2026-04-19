import Class from "../models/Class.js";
import Chat from "../models/Chat.js";
import { queryChroma } from "../services/ragService.js";
import { geminiModel } from "../config/gemini.js";

export const askQuestion = async (req, res) => {
  try {
let { classId, subjectName, question } = req.body;
subjectName = subjectName.trim().toLowerCase();


    if (!classId || !subjectName || !question) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 1️⃣ Check student belongs to class
    const classGroup = await Class.findOne({
      _id: classId,
      students: req.user._id,
      "subjects.subjectName": subjectName
    });

    if (!classGroup) {
      return res.status(403).json({
        message: "You are not allowed to access this class/subject"
      });
    }

    const subject = classGroup.subjects.find(
      s => s.subjectName === subjectName
    );

    // 2️⃣ Vector search
    const contextChunks = await queryChroma(
      question,
      subject.vectorNamespace
    );

    // 3️⃣ If nothing found → no hallucination
    if (!contextChunks.length) {
      return res.json({
        answer: "This question is not covered in your syllabus."
      });
    }

    // 4️⃣ Gemini strict prompt
    const prompt = `
You are an academic teaching assistant.
Answer ONLY using the context below.
If the answer is not explicitly present in the context,
reply EXACTLY with:
"Not available in the uploaded syllabus."
Do not add extra explanation.


Context:
${contextChunks.join("\n\n")}

Question:
${question}
`;

    const result = await geminiModel.generateContent(prompt);
    const answer = result.response.text();

    // 5️⃣ Save chat history
    await Chat.create({
      studentId: req.user._id,
      classId,
      subjectName,
      question,
      answer
    });

    res.json({ answer });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Chat failed" });
  }
};
