import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const COHERENCE_TIMEOUT_MS = 12_000;

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return new Promise(resolve => {
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      console.warn(`Gemini call timed out after ${ms}ms; using fallback.`);
      resolve(fallback);
    }, ms);
    promise.then(
      v => { if (!settled) { settled = true; clearTimeout(timer); resolve(v); } },
      e => { if (!settled) { settled = true; clearTimeout(timer); console.error('Gemini call rejected:', e); resolve(fallback); } }
    );
  });
}

// System instructions for the Sustainability Assistant
const ASSISTANT_SYSTEM_PROMPT = `
You are the "GreenSME Assistant," an expert in sustainability for Bangladeshi Small and Medium Enterprises (SMEs). 
Your goal is to help businesses understand and improve their sustainability maturity.

Key Context:
- You are knowledgeable about the GreenBiz Toolkit assessment (covering Environmental, Social, Economic, and Quality domains).
- You understand the unique challenges of Bangladeshi businesses (e.g., energy efficiency, worker safety, waste management, compliance with international standards like ISO 14001).
- Your tone is professional, encouraging, and practical.
- When explaining technical terms (like "Carbon Footprint" or "Circular Economy"), provide simple, relatable examples for a small business owner.
- If a user asks about a specific assessment question, help them understand what documentation or evidence they might need.

Keep responses concise and actionable.
`;

export async function chatWithAssistant(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
          ...history,
          { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: ASSISTANT_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again in a moment!";
  }
}

export async function generateNarrativeInsights(dataSummary: string) {
  if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set — skipping insight generation.');
      return null;
  }

  const call = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following summary of SME sustainability assessment data and provide 3 key narrative insights and 1 strategic recommendation.

      Data Summary:
      ${dataSummary}

      Format the output as a clean JSON object with keys: "insights" (array of strings) and "recommendation" (string).`,
      config: {
          responseMimeType: "application/json",
          responseSchema: {
              type: Type.OBJECT,
              properties: {
                  insights: { type: Type.ARRAY, items: { type: Type.STRING } },
                  recommendation: { type: Type.STRING }
              },
              required: ["insights", "recommendation"]
          }
      }
  }).then(response => {
      try {
          return JSON.parse(response.text || '{}');
      } catch (parseErr) {
          console.error('Insight Generation parse error:', parseErr);
          return null;
      }
  });

  return withTimeout(call, 20_000, null);
}

export async function checkAnswersCoherence(answers: Record<string, any>, questionsObj: any, language: 'en' | 'bn') {
    const fallback = { hasInconsistency: false, feedback: null };

    if (!apiKey) {
        console.warn('GEMINI_API_KEY is not set — skipping coherence check.');
        return fallback;
    }

    const call = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Please review the following set of answers provided by a small business. Check if there are any obvious logical inconsistencies based on their business type and activities. For example, if a livestock farm doesn't select animal-related waste, or if a retail shop claims to use a lot of heavy machinery.

        Questions and their options:
        ${JSON.stringify(questionsObj)}

        Provided Answers:
        ${JSON.stringify(answers)}

        If the answers are mostly coherent, return "null" as the "feedback". Only return feedback if there is a genuine inconsistency. The feedback should be friendly, polite, and explain the inconsistency simply. Do not force them to change it, just point it out as something to review. Keep it under 3 sentences.

        Determine if there is an inconsistency and provide a brief feedback string in ${language === 'en' ? 'English' : 'Bengali'}.
        Output as JSON with keys: "hasInconsistency" (boolean) and "feedback" (string or null).`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    hasInconsistency: { type: Type.BOOLEAN },
                    feedback: { type: Type.STRING, nullable: true }
                },
                required: ["hasInconsistency"]
            }
        }
    }).then(response => {
        try {
            return JSON.parse(response.text || '{}');
        } catch (parseErr) {
            console.error('Coherence Check parse error:', parseErr);
            return fallback;
        }
    });

    return withTimeout(call, COHERENCE_TIMEOUT_MS, fallback);
}
