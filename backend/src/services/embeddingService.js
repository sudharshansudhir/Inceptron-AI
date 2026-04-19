import { pipeline } from '@xenova/transformers';

let extractor;

// load model once
const loadModel = async () => {
  if (!extractor) {
    extractor = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );
  }
};

export const embedText = async (text) => {
  if (!text || text.trim() === "") {
    throw new Error("Empty text");
  }

  await loadModel();

  const result = await extractor(text, {
    pooling: 'mean',
    normalize: true
  });

  return Array.from(result.data); // 384-dim
};