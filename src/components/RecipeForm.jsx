import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { generatePrompt } from "./options.jsx";
import { generateRecipe } from "./AIModel.jsx";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "@/firebaseconfig.js";

const dietOptions = [
  { value: "none", label: "None" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "keto", label: "Keto" },
  { value: "low-calorie", label: "Low Calorie" },
];

const spiceOptions = [
  { value: "mild", label: "Mild" },
  { value: "medium", label: "Medium" },
  { value: "hot", label: "Hot" },
];

const ChefHatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400 h-10 w-10">
    <path d="M5 21a2 2 0 0 1-2-2v-4.25a2 2 0 0 1 1.09-1.79l5.1-2.55a1 1 0 0 0 .82 0l5.1 2.55A2 2 0 0 1 21 14.75V19a2 2 0 0 1-2 2Z" />
    <path d="M5 12V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const FlameIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

/**
 * Saves a recipe JSON object to the 'recipes' collection in Firestore.
 * @param {object} recipeData The JSON object containing the recipe details.
 * @returns {Promise<string|null>} The ID of the new document, or null if it fails.
 */
const saveRecipeToFirestore = async (recipeData) => {
  try {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "recipes"), recipeData);
    // console.log("Recipe successfully saved with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error saving recipe to Firestore: ", e);
    return null;
  }
};

export default function RecipeForm({ initial = {} }) {
  const navigate = useNavigate();
  const [dishName, setDishName] = useState(initial.dishName || "");
  const [diet, setDiet] = useState(initial.diet || "none");
  const [calories, setCalories] = useState(initial.calories || "");
  const [servings, setServings] = useState(initial.servings || 2);
  const [maxTime, setMaxTime] = useState(initial.maxTime || 30);
  const [spice, setSpice] = useState(initial.spice || "medium");
  const [exclude, setExclude] = useState(initial.exclude || "");
  const [notes, setNotes] = useState(initial.notes || "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dishName.trim()) return toast.error("Please enter a dish name or ingredient!");

    const payload = {
      dishName: dishName.trim(),
      diet,
      calories: diet === "low-calorie" ? Number(calories) : null,
      servings: Math.max(1, Number(servings) || 1),
      maxTime: maxTime ? Number(maxTime) : null,
      spice,
      exclude: exclude ? exclude.split(",").map((i) => i.trim()).filter(Boolean) : [],
      notes: notes.trim() || null,
    };

    const finalPrompt = generatePrompt(payload);

    try {
      setSubmitting(true);
      toast.loading("Crafting your recipe...");
      const result = await generateRecipe(finalPrompt);

      // --- START: MODIFIED BLOCK ---

      // Step 1: Log the raw result to see what the AI is sending back
      // console.log("----------- AI Response -----------");
      // console.log("Type of result:", typeof result);
      // console.log("Raw result from AI:", result);
      // console.log("---------------------------------");

      // Step 2: Validate the result before saving
      if (result && typeof result === 'object' && Object.keys(result).length > 0) {
        toast.success("Recipe generated! Saving and redirecting...");
        
        // The data is a valid object, so we can now save it
        await saveRecipeToFirestore(result);
        
        navigate("/recipe-page", { state: { recipe: result } });
      } else {
        // This will now catch cases where the AI returns bad data
        toast.error("AI returned invalid data format. Please try again.");
        console.error("Failed to save. Invalid data from AI:", result);
      }

      // --- END: MODIFIED BLOCK ---

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while generating the recipe.");
    } finally {
      setSubmitting(false);
      toast.dismiss();
    }
  };

  const handleReset = () => {
    setDishName("");
    setDiet("none");
    setCalories("");
    setServings(2);
    setMaxTime(30);
    setSpice("medium");
    setExclude("");
    setNotes("");
    toast.info("Form reset successfully!");
  };

  const inputClass = "w-full mt-2 px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition";

  return (
    <div className="relative min-h-screen bg-slate-900 text-gray-200 flex justify-center items-center py-12 px-4 font-sans antialiased overflow-hidden">
      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-96 h-96 md:w-[36rem] md:h-[36rem] bg-teal-600/20 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 md:w-[36rem] md:h-[36rem] bg-green-600/20 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-slate-800/50 border border-slate-700/80 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/30 backdrop-blur-md z-10">
        <div className="flex flex-col items-center text-center mb-10">
          <ChefHatIcon />
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-br from-green-400 to-teal-400 bg-clip-text text-transparent mt-3">Craft Your Recipe</h2>
          <p className="text-gray-400 mt-2">Fill in the details below to generate a custom recipe.</p>
        </div>

        {/* Dish Name */}
        <div className="mb-6">
          <label className="font-medium text-gray-300">Dish name or main ingredient</label>
          <input type="text" placeholder="e.g. Paneer Tikka or Chicken Curry" value={dishName} onChange={(e) => setDishName(e.target.value)} className={inputClass} />
        </div>

        {/* Diet Preference as buttons */}
        <div className="mb-6">
          <label className="font-medium text-gray-300">Diet Preference</label>
          <div className="mt-2 flex flex-wrap gap-3">
            {dietOptions.map((option) => (
              <button
                type="button"
                key={option.value}
                onClick={() => setDiet(option.value)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  diet === option.value ? "bg-green-500 text-white" : "bg-slate-700 text-gray-200 hover:bg-slate-600"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {diet === "low-calorie" && (
          <div className="mb-6">
            <label className="font-medium text-gray-300">Max calories per serving</label>
            <input type="number" placeholder="e.g. 400" value={calories} onChange={(e) => setCalories(e.target.value)} className={inputClass} />
          </div>
        )}

        {/* Servings */}
        <div className="mb-6">
          <label className="font-medium text-gray-300">Number of servings</label>
          <input type="number" min="1" value={servings} onChange={(e) => setServings(e.target.value)} className={inputClass} />
        </div>

        {/* Max Time */}
        <div className="mb-6">
          <label className="font-medium text-gray-300">Max cooking time (minutes)</label>
          <input type="number" placeholder="e.g. 30" value={maxTime} onChange={(e) => setMaxTime(e.target.value)} className={inputClass} />
        </div>

        {/* Spice Level as buttons */}
        <div className="mb-6">
          <label className="font-medium text-gray-300 flex items-center gap-2"><FlameIcon className="h-5 w-5 text-orange-400" /> Spice level</label>
          <div className="mt-2 flex flex-wrap gap-3">
            {spiceOptions.map((option) => (
              <button
                type="button"
                key={option.value}
                onClick={() => setSpice(option.value)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  spice === option.value ? "bg-orange-500 text-white" : "bg-slate-700 text-gray-200 hover:bg-slate-600"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Excluded Ingredients */}
        <div className="mb-6">
          <label className="font-medium text-gray-300">Ingredients to exclude (comma-separated)</label>
          <input type="text" placeholder="e.g. nuts, garlic, gluten" value={exclude} onChange={(e) => setExclude(e.target.value)} className={inputClass} />
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="font-medium text-gray-300">Additional notes or preferences</label>
          <textarea rows="3" placeholder="e.g. I prefer spicy food with low oil." value={notes} onChange={(e) => setNotes(e.target.value)} className={inputClass} />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
          <button type="submit" disabled={submitting} className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105">
            {submitting ? "Generating…" : "✨ Generate Recipe"}
          </button>
          <button type="button" onClick={handleReset} className="w-full sm:w-auto px-8 py-3 rounded-full bg-slate-800/60 text-gray-200 font-medium hover:bg-slate-700 transition">
            Reset
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Tip: For the best results, specify dish name and dietary preferences.
        </p>
      </form>
    </div>
  );
}