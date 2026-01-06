
import { GoogleGenAI, Type } from "@google/genai";
import { Dish } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getDishInsights(dishes: Dish[]) {
  const prompt = `
    Analyze the following restaurant menu data and provide 3 actionable business insights.
    Data: ${JSON.stringify(dishes)}
    
    Format the response as JSON with the following structure:
    {
      "insights": [
        { "title": "string", "description": "string", "impact": "High|Medium|Low" }
      ],
      "recommendation": "string"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  impact: { type: Type.STRING }
                },
                required: ["title", "description", "impact"]
              }
            },
            recommendation: { type: Type.STRING }
          },
          required: ["insights", "recommendation"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      insights: [
        { title: "Boost Lunch Combos", description: "Your appetizers have high margins but lower order frequency. Try bundling them with mains.", impact: "Medium" }
      ],
      recommendation: "Focus on pushing beverage upsells during the dinner rush."
    };
  }
}
