import fs from "fs";
import path from "path";
import { NCERT_SECTIONS } from "./knowledge_base_data.ts";
import type { KBChunk } from "./types.ts";

// Stopwords for English and transliterated Hindi
const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "in", "on", "at", "to", "for", "of", "with", "by", "is", "are", "was", "were",
  "it", "this", "that", "these", "those", "we", "you", "i", "they", "he", "she", "what", "which", "how", "why",
  "when", "where", "who", "whom", "whose", "can", "will", "shall", "may", "hai", "hain", "ke", "ki", "ka",
  "se", "me", "mein", "par", "ko", "aur", "kya", "kyu", "kaise", "hota", "hoti", "hote", "batao", "bataiye", "explain", "please"
]);

export function tokenize(text: string): string[] {
  if (!text) return [];
  
  // Normalize while preserving math formulas, alphanumeric identifiers, and devanagari letters
  const cleanedText = text.toLowerCase()
    .replace(/[.,!?;:"'’`~()\[\]{}]/g, " ")
    .replace(/\s+/g, " ");

  const rawTokens = cleanedText.split(" ").filter(t => t.trim().length > 0);
  const tokens: string[] = [];

  for (const t of rawTokens) {
    if (STOPWORDS.has(t)) continue;
    // Keep single letter math variables if part of formula context (e.g. f, g, a, v, u, p, d)
    if (t.length === 1 && !["f", "g", "a", "v", "u", "p", "d", "c", "m", "r", "q", "i", "t", "x", "y", "z"].includes(t)) {
      continue;
    }
    tokens.push(t);

    // If token contains formula characters like '=', '^', '/', '-', '+', also add stripped parts
    if (/[=^/+\-*_]/.test(t)) {
      const parts = t.replace(/[=^/+\-*_]/g, " ").split(" ").filter(p => p.length > 1 && !STOPWORDS.has(p));
      tokens.push(...parts);
      // Also add formula without symbols as compact form (e.g. f=ma -> fma)
      const compact = t.replace(/[^a-z0-9]/g, "");
      if (compact.length > 1 && compact !== t) {
        tokens.push(compact);
      }
    }
  }

  return tokens;
}

// Build global vocabulary and compute term vectors
export function buildIndex(): KBChunk[] {
  // 1. Collect all terms
  const allTokens = new Set<string>();
  const chunkTokenLists: string[][] = [];

  const rawChunks: KBChunk[] = NCERT_SECTIONS.map((section, idx) => {
    const fullText = `${section.conceptName} ${section.text} ${section.keywords.join(" ")}`;
    const tokens = tokenize(fullText);
    tokens.forEach(t => allTokens.add(t));
    chunkTokenLists.push(tokens);

    return {
      chunkId: `chunk_c${section.classLevel}_ch${section.chapterNumber}_p${section.pageNumber}_${section.conceptTag}`,
      classLevel: section.classLevel,
      pageNumber: section.pageNumber,
      pageRange: `p. ${section.pageNumber}-${section.pageNumber + 1}`,
      chapterNumber: section.chapterNumber,
      chapterTitle: section.chapterTitle,
      subject: section.subject,
      conceptTag: section.conceptTag,
      conceptName: section.conceptName,
      text: section.text,
      vector: [],
      keywords: section.keywords
    };
  });

  const vocabArray = Array.from(allTokens);
  const vocabIndexMap = new Map<string, number>();
  vocabArray.forEach((term, i) => vocabIndexMap.set(term, i));

  // Compute IDF
  const N = rawChunks.length;
  const idf: number[] = new Array(vocabArray.length).fill(0);

  chunkTokenLists.forEach(tokens => {
    const seen = new Set(tokens);
    seen.forEach(term => {
      const idx = vocabIndexMap.get(term);
      if (idx !== undefined) {
        idf[idx]++;
      }
    });
  });

  const idfWeights = idf.map(df => Math.log((N + 1) / (df + 1)) + 1);

  // Compute TF-IDF vector for each chunk
  rawChunks.forEach((chunk, cIdx) => {
    const tokens = chunkTokenLists[cIdx];
    const tfMap = new Map<string, number>();
    tokens.forEach(t => tfMap.set(t, (tfMap.get(t) || 0) + 1));

    const vector = new Array(vocabArray.length).fill(0);
    let normSq = 0;

    tfMap.forEach((count, term) => {
      const vIdx = vocabIndexMap.get(term);
      if (vIdx !== undefined) {
        const tf = count / tokens.length;
        const weight = tf * idfWeights[vIdx];
        vector[vIdx] = weight;
        normSq += weight * weight;
      }
    });

    // Normalize
    const norm = Math.sqrt(normSq) || 1;
    chunk.vector = vector.map(w => w / norm);
  });

  // Save index to file
  const outputDir = path.join(process.cwd(), "data", "index");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, "chunks.json");
  const vocabPath = path.join(outputDir, "vocab.json");

  fs.writeFileSync(outputPath, JSON.stringify(rawChunks, null, 2), "utf-8");
  fs.writeFileSync(vocabPath, JSON.stringify({ vocabArray, idfWeights }, null, 2), "utf-8");

  console.log(`[Indexer] Indexed ${rawChunks.length} NCERT chunks with ${vocabArray.length} vocabulary terms to ${outputPath}`);
  return rawChunks;
}

// Ensure index exists and matches current curriculum sections
export function loadOrBuildChunks(): KBChunk[] {
  const outputPath = path.join(process.cwd(), "data", "index", "chunks.json");
  if (fs.existsSync(outputPath)) {
    try {
      const data = fs.readFileSync(outputPath, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length === NCERT_SECTIONS.length) {
        return parsed;
      }
    } catch {
      // Rebuild if corrupt
    }
  }
  console.log(`[Indexer] Rebuilding knowledge base index with ${NCERT_SECTIONS.length} NCERT sections...`);
  return buildIndex();
}

// Auto-run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildIndex();
}
