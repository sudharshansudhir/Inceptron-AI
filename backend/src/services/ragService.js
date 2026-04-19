import chroma from "../config/chroma.js";
import { embedText } from "./embeddingService.js";

let collections = {};

// lazy init per namespace
const getCollection = async (namespace) => {
  if (!collections[namespace]) {
    collections[namespace] = await chroma.getOrCreateCollection({
      name: namespace,
      metadata: {
        "hnsw:space": "cosine"
      },
      embeddingFunction: null // 🔥 MUST
    });
  }
  return collections[namespace];
};

// =====================
// STORE CHUNKS
// =====================
export const storeChunksInChroma = async (
  chunks,
  namespace,
  metadata = {}
) => {
  const col = await getCollection(namespace);

  const embeddings = [];

  for (const chunk of chunks) {
    const emb = await embedText(chunk);
    embeddings.push(emb);
  }

  const ids = chunks.map((_, i) => `${namespace}_${i}_${Date.now()}`);

  await col.add({
    ids,
    documents: chunks,
    embeddings,
    metadatas: chunks.map(() => metadata)
  });

  console.log("Stored in Chroma:", ids.length);
};

// =====================
// QUERY CHUNKS
// =====================
export const queryChroma = async (query, namespace) => {
  const col = await getCollection(namespace);

  const queryEmbedding = await embedText(query);

  const results = await col.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 5
  });

  return results.documents?.[0] || [];
};