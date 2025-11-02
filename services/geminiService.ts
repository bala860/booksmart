import { GoogleGenAI, Type } from "@google/genai";
import type { ComparisonResult } from '../types';

const getTravelComparison = async (userQuery: string): Promise<ComparisonResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Fix: Use responseSchema to ensure the model returns valid JSON.
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
        summaryRecommendation: {
            type: Type.STRING,
            description: 'A short paragraph (2-3 sentences) highlighting the best value option.'
        },
        comparisonTable: {
            type: Type.ARRAY,
            description: 'An array of objects, with each object representing a row in the comparison table.',
            items: {
                type: Type.OBJECT,
                properties: {
                    platform: { type: Type.STRING, description: 'Platform Name (e.g., MakeMyTrip)' },
                    type: { type: Type.STRING, description: 'Travel/Stay Type (e.g., Flight, Hotel)' },
                    estimatedPrice: { type: Type.STRING, description: 'Price in INR with currency symbol (e.g., ₹12,500)' },
                    notes: { type: Type.STRING, description: 'Brief notes (e.g., 5h 30m, non-refundable)' }
                },
                required: ['platform', 'type', 'estimatedPrice', 'notes']
            }
        },
        smartTravelTip: {
            type: Type.STRING,
            description: 'A single, concise, AI-generated suggestion.'
        }
    },
    required: ['summaryRecommendation', 'comparisonTable', 'smartTravelTip']
  };

  const prompt = `
You are BookSmart, a travel comparison expert. Your goal is to help users find the best travel and stay deals.

Analyze the user's query and generate a comparison. Include a diverse range of platforms like MakeMyTrip, Yatra, Goibibo, IRCTC, RedBus, Booking.com, Agoda, and Airbnb where applicable. Provide realistic but *estimated* prices.

User's query: "${userQuery}"
`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            // Fix: Added responseSchema for structured JSON output.
            responseSchema: responseSchema,
        },
    });
    
    const text = response.text.trim();
    // The model with responseSchema should return a clean JSON string.
    // The cleanup logic is kept as a safeguard.
    const cleanedText = text.replace(/^```json\s*|```\s*$/g, '');

    const result: ComparisonResult = JSON.parse(cleanedText);
    return result;
  } catch (error) {
    console.error("Error calling Gemini API or parsing JSON:", error);
    throw new Error("Failed to get a valid comparison from the AI.");
  }
};

export { getTravelComparison };
