import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

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
  try {
      const response = await ai.models.generateContent({
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
      });

      return JSON.parse(response.text);
  } catch (error) {
      console.error("Insight Generation Error:", error);
      return null;
  }
}

export async function getQuestionHelp(questionText: string, language: 'en' | 'bn') {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Explain the importance of this sustainability question and suggest what evidence a business might need to answer it correctly.
            
            Question: "${questionText}"
            Language: ${language === 'en' ? 'English' : 'Bengali'}
            
            Keep the explanation simple and friendly. Maximum 3 sentences.`,
            config: {
                systemInstruction: "You are a helpful sustainability consultant for Bangladeshi SMEs."
            }
        });

        return response.text;
    } catch (error) {
        return language === 'en' 
            ? "I couldn't generate help for this right now, but try looking into your recent utility bills or policy documents!"
            : "আমি এই মুহূর্তে সাহায্য করতে পারছি না, তবে আপনার ইউটিলিটি বিল বা পলিসি ডকুমেন্টগুলো চেক করে দেখতে পারেন।";
    }
}
