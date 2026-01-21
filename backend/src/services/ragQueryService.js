import chroma from "../config/chroma.js";
import { embedText } from "./embeddingService.js";

export const queryChroma = async (question, namespace) => {
  const embedding = await embedText(question);

  const collection = await chroma.getOrCreateCollection({
    name: namespace
  });

  const results = await collection.query({
    queryEmbeddings: [embedding],
    nResults: 5
  });

  return results.documents?.[0] || [];
};
