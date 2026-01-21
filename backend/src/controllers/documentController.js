import Class from "../models/Class.js";
import Document from "../models/Document.js";
import { extractText } from "../utils/textExtractor.js";
import { splitText } from "../utils/textSplitter.js";
import { uploadToCloudinary } from "../services/documentService.js";
import { storeChunksInChroma } from "../services/ragService.js";

export const uploadDocument = async (req, res) => {
  try {
let { classId, subjectName } = req.params;
subjectName = subjectName.trim().toLowerCase();

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "File required" });
    }

    // ✅ FILE TYPE VALIDATION (CORRECT PLACE)
    const allowed = ["docx"];
    const ext = file.originalname.split(".").pop().toLowerCase();

    if (!allowed.includes(ext)) {
      return res.status(400).json({
        message: "Only DOCX files are allowed"
      });
    }

    const classGroup = await Class.findOne({
      _id: classId,
      teacherId: req.user._id,
      "subjects.subjectName": subjectName
    });

    if (!classGroup) {
      return res.status(404).json({ message: "Class or subject not found" });
    }

    const subject = classGroup.subjects.find(
      s => s.subjectName === subjectName
    );

    // Upload file to Cloudinary
    const uploaded = await uploadToCloudinary(
      file.buffer,
      file.originalname
    );

    // Extract text
    const text = await extractText(file);

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        message: "No readable text found in document"
      });
    }

    // Split text
    const chunks = splitText(text);

    // Store in ChromaDB
    await storeChunksInChroma(
      chunks,
      subject.vectorNamespace,
      {
        classId,
        subjectName,
        teacherId: req.user._id.toString()
      }
    );

    // Save document metadata
    await Document.create({
      classId,
      subjectName,
      fileName: file.originalname,
      cloudinaryUrl: uploaded.secure_url,
      vectorNamespace: subject.vectorNamespace,
      uploadedBy: req.user._id
    });

    res.status(201).json({
      message: "Document uploaded and indexed successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};
