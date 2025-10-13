import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiClock, FiUsers, FiHeart, FiStar, FiArrowLeft } from 'react-icons/fi';
import { GiKnifeFork, GiCookingPot } from 'react-icons/gi';

const RecipePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe;

  useEffect(() => {
    if (!recipe) {
      console.warn("No recipe data found. Redirecting to home page.");
      navigate('/');
    }
  }, [recipe, navigate]);

  if (!recipe) return null;

  const InfoCard = ({ icon, label, value }) => (
    <div className="bg-slate-700/60 p-4 rounded-xl text-center shadow hover:scale-105 transform transition-all">
      {icon}
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mt-2">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );

  const NutritionCard = ({ label, value }) => (
    <div className="bg-slate-800/50 rounded-xl p-4 text-center shadow hover:scale-105 transform transition-all min-w-[120px]">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-bold text-white mt-1">{value}</p>
    </div>
  );

  return (
    <div className="bg-slate-900 text-gray-200 min-h-screen font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-6 group text-lg">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Create Another Recipe
        </Link>

        {/* Recipe Card */}
        <div className="bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50">
          {/* Header */}
          <header className="p-6 sm:p-10 text-center bg-gradient-to-r from-teal-600 to-sky-500 bg-clip-text text-transparent">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">{recipe.recipeTitle}</h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">{recipe.description}</p>
          </header>

          <div className="p-6 sm:p-10 space-y-10">
            {/* Info Cards */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InfoCard icon={<FiClock size={28} className="mx-auto text-teal-400" />} label="Prep Time" value={recipe.prepTime} />
              <InfoCard icon={<GiCookingPot size={28} className="mx-auto text-teal-400" />} label="Cook Time" value={recipe.cookTime} />
              <InfoCard icon={<FiClock size={28} className="mx-auto text-teal-400" />} label="Total Time" value={recipe.totalTime} />
              <InfoCard icon={<FiUsers size={28} className="mx-auto text-teal-400" />} label="Servings" value={recipe.servings} />
            </section>

            {/* Ingredients & Instructions */}
            <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Ingredients */}
              <aside className="lg:col-span-1 bg-slate-900/50 p-6 rounded-xl shadow-inner">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-sky-300 mb-4 border-b border-sky-500/20 pb-2">
                  <GiKnifeFork /> Ingredients
                </h2>
                <ul className="space-y-3 text-gray-300">
                  {recipe.ingredients.map((item, index) => (
                    <li key={index} className="flex items-start hover:text-teal-400 transition-all">
                      <span className="text-teal-400 mr-2 mt-1">&#8227;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Instructions */}
              <article className="lg:col-span-2 bg-slate-900/50 p-6 rounded-xl shadow-inner">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-sky-300 mb-4 border-b border-sky-500/20 pb-2">
                  <GiCookingPot /> Instructions
                </h2>
                <ol className="space-y-6">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="flex items-start hover:bg-slate-800/40 p-2 rounded transition-all">
                      <span className="bg-teal-400 text-slate-900 rounded-full font-bold text-sm w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-300 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </article>
            </main>

            {/* Chef's Tips */}
            {recipe.chefsTips?.length > 0 && (
              <section className="bg-slate-900/60 p-6 rounded-xl shadow-inner">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-sky-300 mb-4">
                  <FiStar /> Chef's Tips
                </h2>
                <ul className="space-y-2 list-disc list-inside text-gray-300">
                  {recipe.chefsTips.map((tip, index) => <li key={index}>{tip}</li>)}
                </ul>
              </section>
            )}

            {/* Nutrition */}
            <footer className="border-t border-teal-500/30 pt-6">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-sky-300 mb-6 justify-center text-center"><FiHeart /> Nutrition Per Serving</h2>
              <div className="flex flex-wrap justify-center gap-6">
                <NutritionCard label="Calories" value={recipe.nutritionPerServing.calories} />
                <NutritionCard label="Protein" value={recipe.nutritionPerServing.protein} />
                <NutritionCard label="Fat" value={recipe.nutritionPerServing.fat} />
                <NutritionCard label="Carbs" value={recipe.nutritionPerServing.carbohydrates} />
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
