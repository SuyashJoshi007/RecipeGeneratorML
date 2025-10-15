import { GoogleGenAI } from "@google/genai";

// --- Initialize the Gemini API ---
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GOOGLE_GEMINI_AI_API_KEY is not defined in your .env.local file.");
}

const ai = new GoogleGenAI({ apiKey });

// --- Model Configuration ---
const model = "gemini-2.5-flash";

const config = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  thinkingConfig: {
    thinkingBudget: -1,
  },
};

// ✅ Helper function to normalize response
function normalizeRecipe(data) {
  return {
    recipeTitle: data.recipeTitle || "Untitled Recipe",
    description: data.description || "No description available.",
    prepTime: data.prepTime || "N/A",
    cookTime: data.cookTime || "N/A",
    totalTime: data.totalTime || "N/A",
    servings: data.servings || 1,

    ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
    instructions: Array.isArray(data.instructions) ? data.instructions : [],
    chefsTips: Array.isArray(data.chefsTips) ? data.chefsTips : [],

    nutritionPerServing: data.nutritionPerServing || {
      calories: "N/A",
      protein: "N/A",
      fat: "N/A",
      carbohydrates: "N/A",
    },
  };
}

// --- Exported Function to Generate Recipe ---
export async function generateRecipe(prompt) {
  try {
    const contents = [
      {
        role: "user",
        parts: [
          {
            text:
              "You are an expert chef. Your task is to generate a recipe based on user-provided constraints. " +
              "You must respond with only a single, valid JSON object in this structure:\n" +
              `{
                "recipeTitle": string,
                "description": string,
                "prepTime": string,
                "cookTime": string,
                "totalTime": string,
                "servings": number,
                "ingredients": string[],
                "instructions": string[],
                "chefsTips": string[],
                "nutritionPerServing": {
                  "calories": string,
                  "protein": string,
                  "fat": string,
                  "carbohydrates": string
                }
              }\n` +
              "Do not include any markdown formatting, backticks, or additional commentary.\n\n" +
              "User prompt: " + prompt,
          },
        ],
      },
    ];

    // --- Stream the AI Response ---
    const responseStream = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullResponse = "";

    // Collect the streamed text
    for await (const chunk of responseStream) {
      if (chunk.text) fullResponse += chunk.text;
    }

    // --- START: Clean and Parse JSON ---
    try {
      // Find the first '{' and the last '}' to extract the JSON object
      const startIndex = fullResponse.indexOf('{');
      const endIndex = fullResponse.lastIndexOf('}');

      if (startIndex === -1 || endIndex === -1) {
        // console.error("❌ No JSON object found in the AI response.");
        // console.log("Raw AI Response:\n---\n", fullResponse, "\n---");
        throw new Error("No JSON object found in the AI response.");
      }

      // Extract the clean JSON string from the raw text
      const jsonString = fullResponse.substring(startIndex, endIndex + 1);
      
      // Parse only the clean string
      const parsed = JSON.parse(jsonString);
      return normalizeRecipe(parsed);

    } catch (parseError) {
      // console.error("❌ Failed to parse the extracted JSON:", parseError);
      // console.log("Raw AI Response that was cleaned:\n---\n", fullResponse, "\n---");
      throw new Error("The AI returned a response that was not valid JSON.");
    }
    // --- END: Clean and Parse JSON ---

  } catch (error) {
    // console.error("Error in generateRecipe function:", error);
    throw new Error("Failed to generate a recipe from the AI model.");
  }
}