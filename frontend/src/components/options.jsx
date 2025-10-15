/**
 * Generates a detailed prompt for the Gemini API based on user-defined recipe options.
 * @param {object} options - The recipe options selected by the user in the form.
 * @param {string} options.dishName - The name of the dish or main ingredient.
 * @param {string} options.diet - The dietary preference (e.g., "vegan", "gluten-free").
 * @param {number|null} options.calories - The target calories per serving.
 * @param {number} options.servings - The number of servings.
 * @param {number|null} options.maxTime - The maximum total cooking time in minutes.
 * @param {string} options.spice - The desired spice level (e.g., "mild", "medium", "hot").
 * @param {string[]} options.exclude - An array of ingredients to exclude.
 * @param {string|null} options.notes - Any additional notes or preferences.
 * @returns {string} A formatted prompt string to be sent to the Gemini API.
 */
export const generatePrompt = (options) => {
  const {
    dishName,
    diet,
    calories,
    servings,
    maxTime,
    spice,
    exclude,
    notes,
  } = options;

  // Start with a clear role definition for the AI model.
  let prompt = `You are an expert chef specializing in creating delicious, easy-to-follow recipes. Your task is to generate a detailed recipe based on the following user-specified criteria:\n\n`;

  // Append each user-defined criterion to the prompt.
  prompt += `**Primary Subject:** "${dishName}"\n`;
  prompt += `**Servings:** ${servings}\n`;

  if (diet && diet !== 'none') {
    prompt += `**Dietary Requirement:** This recipe MUST be strictly ${diet}.\n`;
  }

  if (calories) {
    prompt += `**Calorie Target:** Approximately ${calories} kcal per serving.\n`;
  }

  if (maxTime) {
    prompt += `**Maximum Total Time:** The entire process (preparation and cooking) must not exceed ${maxTime} minutes.\n`;
  }

  prompt += `**Spice Level:** The final dish should be ${spice}.\n`;

  if (exclude && exclude.length > 0) {
    prompt += `**Excluded Ingredients:** The recipe MUST NOT contain any of the following: ${exclude.join(', ')}.\n`;
  }

  if (notes) {
    prompt += `**Additional Notes to Consider:** "${notes}"\n`;
  }

  // Define the required output format using Markdown for easy parsing and display.
  prompt += `\nPlease provide the recipe in the following strict Markdown format:\n\n`;
  prompt += `# [A Creative and Appealing Recipe Title]\n\n`;
  prompt += `**A brief, enticing one-paragraph description of the dish.**\n\n`;
  prompt += `| Prep Time | Cook Time | Total Time | Servings |\n`;
  prompt += `|-----------|-----------|------------|----------|\n`;
  prompt += `| [X] mins  | [Y] mins  | [Z] mins   | ${servings}      |\n\n`;
  prompt += `## Ingredients\n`;
  prompt += `* [Full ingredient line with amount, unit, and name]\n`;
  prompt += `* [Another full ingredient line]\n\n`;
  prompt += `## Instructions\n`;
  prompt += `1. [First step of instructions]\n`;
  prompt += `2. [Second step of instructions]\n\n`;
  prompt += `## Nutrition (Estimated Per Serving)\n`;
  prompt += `* **Calories:** [Value] kcal\n`;
  prompt += `* **Protein:** [Value] g\n`;
  prompt += `* **Fat:** [Value] g\n`;
  prompt += `* **Carbohydrates:** [Value] g\n\n`;
  prompt += `## Chef's Tips\n`;
  prompt += `* [A helpful tip, potential variation, or a storage suggestion.]\n`;

  return prompt;
};

