import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  ChefHat,
  Carrot,
  Leaf,
  Star,
  Users,
  Clock,
  Search,
  Heart,
  ArrowRight,
} from "lucide-react";

// Framer Motion variants (no changes here)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function LandingPage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    navigate("/upload", { state: { fromSearch: query } });
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 py-24 sm:py-32 bg-slate-900 text-gray-200 overflow-hidden">
      {/* Themed Animated Blob Background */}
      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-96 h-96 md:w-[36rem] md:h-[36rem] bg-teal-600/20 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 md:w-[36rem] md:h-[36rem] bg-green-600/20 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Themed Floating Decorative Icons */}
      <FloatingIcon icon={<ChefHat />} className="top-[15%] left-[10%]" />
      <FloatingIcon icon={<Carrot />} className="top-[30%] right-[15%]" />
      <FloatingIcon icon={<Leaf />} className="bottom-[20%] left-[20%]" />
      <FloatingIcon icon={<Sparkles />} className="bottom-[15%] right-[10%]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl z-10"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-green-400 to-teal-400 bg-clip-text text-transparent"
        >
          Your Next Meal, Reimagined
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-gray-400"
        >
          Stop guessing, start cooking. Turn any ingredient into a culinary
          masterpiece with our AI-powered recipe generator.
        </motion.p>

        {/* Redesigned Quick search + CTAs */}
        <motion.div variants={itemVariants} className="mt-10 max-w-xl mx-auto">
          <form
            onSubmit={handleQuickSearch}
            className="relative w-full shadow-lg shadow-black/20"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-300 h-5 w-5" />
            <input
              aria-label="Try an ingredient"
              placeholder="What ingredient do you have? e.g., avocado"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-36 h-14 rounded-full border border-slate-700 bg-slate-800/60 backdrop-blur-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <Button
              type="submit"
              size="lg"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-full transition-all transform hover:scale-105"
            >
              Search
            </Button>
          </form>
          <div className="mt-6 flex items-center justify-center gap-4">
             <Link to="/upload">
              <Button size="lg" className="bg-transparent text-gray-200">
                Or Upload a Photo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Restyled Feature highlights */}
        <motion.div
          variants={itemVariants}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <FeatureCard
            icon={<Star className="w-6 h-6 text-green-400" />}
            title="Chef-Tuned"
            desc="Recipes refined by culinary experts for perfect results."
          />
          <FeatureCard
            icon={<Clock className="w-6 h-6 text-green-400" />}
            title="Quick & Easy"
            desc="Most meals are ready in under 30 minutes."
          />
          <FeatureCard
            icon={<Users className="w-6 h-6 text-green-400" />}
            title="Personalized"
            desc="AI suggestions tailored to your available ingredients."
          />
        </motion.div>

        {/* Restyled Stats + Testimonial */}
        <motion.div
          variants={itemVariants}
          className="mt-20 max-w-4xl mx-auto text-left"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-800/50 border border-slate-700/80 rounded-2xl p-8 backdrop-blur-md">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-700/70 rounded-xl">
                  <Heart className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-200 text-lg">
                    Loved by home cooks everywhere
                  </p>
                  <p className="text-sm text-gray-400">
                    “This is a game-changer. I snapped a photo of a lonely sweet potato and got a recipe for the best fries I've ever made. Incredible!”
                  </p>
                  <p className="mt-2 text-xs text-gray-500">— Sarah J., Food Blogger</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">250k+</span>
                <span className="mt-1 block text-xs text-gray-400">Recipes generated</span>
              </div>
               <div>
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">98%</span>
                <span className="mt-1 block text-xs text-gray-400">User satisfaction</span>
              </div>
               <div>
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">1M+</span>
                <span className="mt-1 block text-xs text-gray-400">Ingredients known</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

// Helper: FloatingIcon (Themed)
const FloatingIcon = ({ icon, className }) => (
  <motion.div
    className={`absolute z-0 hidden md:block ${className}`}
    initial={{ y: -10, opacity: 0 }}
    animate={{ y: 10, opacity: 1 }}
    transition={{
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    }}
  >
    <div className="w-16 h-16 bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-center text-teal-400">
      {React.cloneElement(icon, { className: "w-8 h-8" })}
    </div>
  </motion.div>
);

// Helper: FeatureCard (Themed)
const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex items-center text-left gap-4 bg-slate-800/50 border border-slate-700/80 rounded-2xl p-5 backdrop-blur-sm transition-all duration-300 hover:border-slate-600 hover:bg-slate-800">
    <div className="p-3 bg-slate-700/70 rounded-xl">{icon}</div>
    <div>
      <div className="font-semibold text-gray-200">{title}</div>
      <div className="text-sm text-gray-400">{desc}</div>
    </div>
  </div>
);

export default LandingPage;