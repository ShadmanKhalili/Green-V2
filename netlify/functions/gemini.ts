import type { Handler } from "@netlify/functions";
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { prompt } = JSON.parse(event.body || '{}');

    if (!prompt) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Bad Request: prompt is required' }) };
    }
    
    if (!process.env.API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Server error: API_KEY is not configured.' }) };
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const text = response.text;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    };
  } catch (error) {
    console.error('Error in Netlify function calling Gemini API:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate recommendations.' }),
    };
  }
};
