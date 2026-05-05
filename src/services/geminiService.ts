/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function askDetectiveHint(context: string, symptoms: string[]) {
  if (!process.env.GEMINI_API_KEY) return "My intuition is failing me... (Missing API Key)";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the subconscious intuition of a noir detective. 
      The current situation is: "${context}". 
      Current clues: ${symptoms.join(", ")}. 
      Provide a cryptic, helpful hint in a noir style. Keep it under 2 sentences.`,
    });
    return response.text || "Something doesn't feel right.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The static in my head is too loud to think straight.";
  }
}
