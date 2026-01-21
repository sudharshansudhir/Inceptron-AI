import chroma from "../config/chroma.js";
import { embedText } from "./embeddingService.js";
import { v4 as uuidv4 } from "uuid";

export const storeChunksInChroma = async (chunks, namespace, metadata) => {
  const collection = await chroma.getOrCreateCollection({
    name: namespace
  });

  for (const chunk of chunks) {
    const embedding = await embedText(chunk);

    await collection.add({
      ids: [uuidv4()],
      documents: [chunk],
      embeddings: [embedding],
      metadatas: [metadata]
    });
  }
};
