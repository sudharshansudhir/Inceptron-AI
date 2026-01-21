import mammoth from "mammoth";

export const extractText = async (file) => {
  const ext = file.originalname.split(".").pop().toLowerCase();

  if (ext !== "docx") {
    throw new Error("Only DOCX files are supported");
  }

  const result = await mammoth.extractRawText({
    buffer: file.buffer
  });
  console.log("EXTRACTED TEXT LENGTH:", result.value.length);


  if (!result.value || result.value.trim().length === 0) {
    throw new Error("No readable text found in document");
  }

  return result.value;
};
