import { useNavigate } from "react-router-dom";

const ResultView = ({ uniqueIngredients, previewUrl, onReset }) => {
  const navigate = useNavigate();

  const handleGenerateRecipes = () => {
    // Navigate to RecipeForm and pass detected ingredients
    navigate("/form", { state: { ingredients: uniqueIngredients } });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left: Original Image */}
      <div className="flex flex-col items-center gap-4 text-center">
        <img
          src={previewUrl}
          alt="Uploaded Ingredient"
          className="rounded-2xl shadow-lg w-full max-w-sm object-cover border-4 border-green-400 aspect-square"
        />
        <button
          onClick={onReset}
          className="w-full max-w-sm border border-slate-600 mt-2 px-4 py-2 rounded-xl text-gray-200 hover:bg-slate-700 transition"
        >
          Upload Another Image
        </button>
      </div>

      {/* Right: Ingredients List & Generate Button */}
      <div className="lg:col-span-2 bg-slate-800/70 border border-slate-700 rounded-xl p-6 space-y-4">
        <h2 className="text-3xl font-bold text-green-400 flex items-center gap-2">
          Detected Ingredients
        </h2>

        {uniqueIngredients.length > 0 ? (
          <>
            <ul className="grid grid-cols-2 gap-2 mt-4 text-white font-medium">
              {uniqueIngredients.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-green-400 rounded-full flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={handleGenerateRecipes}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm text-white bg-gradient-to-r from-green-500 to-teal-500 shadow-lg shadow-black/20 hover:opacity-90 transition-opacity mt-4"
            >
              Generate Recipes using AI
            </button>
          </>
        ) : (
          <p className="text-gray-400 italic mt-2">No ingredients detected.</p>
        )}
      </div>
    </div>
  );
};

export default ResultView;
