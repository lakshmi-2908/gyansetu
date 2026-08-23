import fs from "fs";
import path from "path";
import { tokenize, loadOrBuildChunks } from "./indexer.ts";
import type { KBChunk, RetrievalResult } from "./types.ts";

export { loadOrBuildChunks };

let cachedChunks: KBChunk[] | null = null;
let cachedVocab: { vocabArray: string[]; idfWeights: number[]; vocabMap: Map<string, number> } | null = null;

function getVocabAndChunks() {
  if (!cachedChunks) {
    cachedChunks = loadOrBuildChunks();
  }

  if (!cachedVocab) {
    const vocabPath = path.join(process.cwd(), "data", "index", "vocab.json");
    if (fs.existsSync(vocabPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(vocabPath, "utf-8"));
        const vocabMap = new Map<string, number>();
        data.vocabArray.forEach((term: string, i: number) => vocabMap.set(term, i));
        cachedVocab = {
          vocabArray: data.vocabArray,
          idfWeights: data.idfWeights,
          vocabMap
        };
      } catch (err) {
        console.error("[Retrieval] Error loading vocab.json:", err);
      }
    }

    if (!cachedVocab) {
      // Build fresh
      cachedChunks = loadOrBuildChunks();
      const vocabData = JSON.parse(fs.readFileSync(vocabPath, "utf-8"));
      const vocabMap = new Map<string, number>();
      vocabData.vocabArray.forEach((term: string, i: number) => vocabMap.set(term, i));
      cachedVocab = {
        vocabArray: vocabData.vocabArray,
        idfWeights: vocabData.idfWeights,
        vocabMap
      };
    }
  }

  return { chunks: cachedChunks, vocab: cachedVocab };
}

function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 2) return 99;
  const m = a.length;
  const n = b.length;
  const dp: number[] = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      if (a[i - 1] === b[j - 1]) {
        dp[j] = prev;
      } else {
        dp[j] = Math.min(prev, dp[j], dp[j - 1]) + 1;
      }
      prev = temp;
    }
  }
  return dp[n];
}

export function cleanQueryText(rawQuery: string): string {
  if (!rawQuery) return "";
  return rawQuery
    .replace(/^(please provide the step-by-step formula derivation for|what are the key ncert textbook points to write in cbse board exam for|explain with an everyday intuitive real-world example|explain in simple bilingual hinglish with key english terms|please provide|give me|what is the formula derivation for|please explain|can you explain|tell me about|notes on|derivation for|tips for|summary of|what is|how to|what are|define|explain|state|describe|discuss|give|show|calculate|write|solve)[\s:]+/gi, "")
    .replace(/^(for|about|on|the|a|an)[\s:]+/gi, "")
    .trim();
}

export function vectorizeQuery(query: string): number[] {
  const { vocab } = getVocabAndChunks();
  const cleaned = cleanQueryText(query);
  // Use tokens from both cleaned query and raw query with focus on core terms
  const tokens = tokenize(cleaned.length >= 2 ? `${cleaned} ${query}` : query);
  const vector = new Array(vocab.vocabArray.length).fill(0);
  if (tokens.length === 0) return vector;

  const tfMap = new Map<string, number>();
  tokens.forEach(t => tfMap.set(t, (tfMap.get(t) || 0) + 1));

  let normSq = 0;
  tfMap.forEach((count, term) => {
    // 1. Exact match
    const vIdx = vocab.vocabMap.get(term);
    if (vIdx !== undefined) {
      const tf = count / tokens.length;
      const weight = tf * (vocab.idfWeights[vIdx] || 1.5) * 2.0; // Boost query term impact
      vector[vIdx] = weight;
      normSq += weight * weight;
      return;
    }

    // 2. Substring & Fuzzy match for typos (e.g., auadratic -> quadratic, nefron -> nephron)
    let bestFuzzyIdx = -1;
    let minDistance = 99;

    for (let i = 0; i < vocab.vocabArray.length; i++) {
      const vTerm = vocab.vocabArray[i];
      if (vTerm.includes(term) || term.includes(vTerm)) {
        const tf = (count * 0.85) / tokens.length;
        const weight = tf * (vocab.idfWeights[i] || 1.2);
        vector[i] = Math.max(vector[i], weight);
        normSq += weight * weight;
      } else if (term.length >= 4 && vTerm.length >= 4) {
        const maxAllowed = term.length >= 6 ? 2 : 1;
        const dist = editDistance(term, vTerm);
        if (dist <= maxAllowed && dist < minDistance) {
          minDistance = dist;
          bestFuzzyIdx = i;
        }
      }
    }

    if (bestFuzzyIdx !== -1) {
      const tf = (count * 0.8) / tokens.length;
      const weight = tf * (vocab.idfWeights[bestFuzzyIdx] || 1.2);
      vector[bestFuzzyIdx] = Math.max(vector[bestFuzzyIdx], weight);
      normSq += weight * weight;
    }
  });

  const norm = Math.sqrt(normSq) || 1;
  return vector.map(w => w / norm);
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
  }
  return dotProduct;
}

export function retrieveChunks(
  query: string,
  topK?: number,
  filter?: { classLevel?: number; subject?: string }
): { results: RetrievalResult[]; topScore: number; isCovered: boolean; threshold: number } {
  const { chunks } = getVocabAndChunks();
  const k = topK || parseInt(process.env.TOP_K_CHUNKS || "4", 10);
  const threshold = parseFloat(process.env.SIMILARITY_THRESHOLD || "0.18");

  const queryVec = vectorizeQuery(query);
  const cleaned = cleanQueryText(query);
  const queryTokens = tokenize(cleaned.length >= 2 ? `${query} ${cleaned}` : query);
  const queryLower = query.toLowerCase();
  const cleanedLower = cleaned.toLowerCase();
  const rawCompact = queryLower.replace(/[^a-z0-9]/g, "");

  const scored: RetrievalResult[] = chunks.map(chunk => {
    let score = cosineSimilarity(queryVec, chunk.vector);

    // Class & Subject match mild preference if filter is set
    if (filter?.classLevel && chunk.classLevel === filter.classLevel) {
      score += 0.12;
    }
    if (filter?.subject && filter.subject !== "ALL" && chunk.subject.toLowerCase() === filter.subject.toLowerCase()) {
      score += 0.12;
    }
    
    // Keyword boost with exact + fuzzy matching
    for (const kw of chunk.keywords) {
      const kwLower = kw.toLowerCase();
      const kwCompact = kwLower.replace(/[^a-z0-9]/g, "");

      if (queryLower.includes(kwLower) || (cleanedLower && cleanedLower.includes(kwLower))) {
        score += 0.35;
      } else if (rawCompact.length >= 4 && kwCompact.length >= 4 && (rawCompact.includes(kwCompact) || kwCompact.includes(rawCompact))) {
        score += 0.30;
      } else {
        // Check token-level fuzzy match for typo keywords
        for (const qt of queryTokens) {
          if (qt.length >= 4 && kwLower.length >= 4) {
            const maxAllowed = qt.length >= 6 ? 2 : 1;
            if (editDistance(qt, kwLower) <= maxAllowed) {
              score += 0.25;
              break;
            }
          }
        }
      }
    }

    const conceptClean = chunk.conceptTag.replace(/-/g, " ");
    if (queryLower.includes(conceptClean) || (cleanedLower && cleanedLower.includes(conceptClean))) {
      score += 0.40;
    } else {
      for (const qt of queryTokens) {
        if (qt.length >= 4 && editDistance(qt, conceptClean) <= 2) {
          score += 0.30;
          break;
        }
      }
    }

    // Direct chapter name & concept matches
    if (queryLower.includes(chunk.conceptName.toLowerCase()) || (cleanedLower && cleanedLower.includes(chunk.conceptName.toLowerCase()))) {
      score += 0.40;
    }
    if (queryLower.includes(chunk.chapterTitle.toLowerCase()) || (cleanedLower && cleanedLower.includes(chunk.chapterTitle.toLowerCase()))) {
      score += 0.35;
    }

    // Direct text snippet substring match
    if (chunk.text.toLowerCase().includes(cleanedLower) && cleanedLower.length >= 4) {
      score += 0.30;
    }

    return {
      chunk,
      score: Math.min(score, 1.0)
    };
  });

  // Sort descending
  scored.sort((a, b) => b.score - a.score);

  const topResults = scored.slice(0, k);
  const topScore = topResults.length > 0 ? topResults[0].score : 0;
  const isCovered = topScore >= threshold;

  return {
    results: topResults,
    topScore,
    isCovered,
    threshold
  };
}

export function getChunksByConcept(conceptTag: string): KBChunk[] {
  const { chunks } = getVocabAndChunks();
  return chunks.filter(c => c.conceptTag === conceptTag);
}

export function getAllChunks(): KBChunk[] {
  const { chunks } = getVocabAndChunks();
  return chunks;
}
