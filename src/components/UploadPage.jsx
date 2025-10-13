import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, UploadCloud, Replace, X, CheckCircle2, AlertTriangle } from "lucide-react";
import RecipeForm from "./RecipeForm"; // Your existing RecipeForm

// --- Configuration ---
const API_URL = "https://serverless.roboflow.com/suyash-qoqcv/workflows/small-object-detection-sahi-2";
const ROBOTFLOW_API_KEY = "R4vhU4zroESxiy4rhrOj";
const MAX_IMAGE_SIZE_MB = 6;

// --- Helper Functions & Components ---
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const base = "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-lg hover:shadow-green-500/20 hover:scale-105",
    outline: "border border-slate-700 text-gray-300 hover:bg-slate-700 hover:text-white",
  };
  const sizes = { default: "h-10 py-2 px-6", lg: "h-12 px-10 text-base" };
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
};

// --- Main Views ---

// 1. Result View
const ResultView = ({ previewUrl, uniqueIngredients, onReset }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      {/* Left Column */}
      <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col items-center gap-4">
        <div className="w-full max-w-sm relative">
          <motion.img
            src={previewUrl}
            alt="Uploaded Ingredient"
            className="rounded-2xl shadow-lg w-full object-cover border-4 border-green-400/50 aspect-square"
            layoutId="previewImage"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
        </div>

        <div className="w-full max-w-sm mt-4 bg-slate-900/50 p-4 rounded-xl">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-sky-300 mb-3">
            <CheckCircle2 className="h-5 w-5" /> Ingredients Detected
          </h3>
          {uniqueIngredients.length > 0 ? (
            <motion.div variants={containerVariants} className="flex flex-wrap gap-2">
              {uniqueIngredients.map((ingredient) => (
                <motion.div key={ingredient} variants={itemVariants} className="bg-green-400/10 text-green-300 text-sm font-medium px-3 py-1 rounded-full">
                  {ingredient}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-gray-400 text-sm">No ingredients were detected. Try another image or enter them manually.</p>
          )}
        </div>
        <Button onClick={onReset} variant="outline" className="w-full max-w-sm mt-2"><Replace className="mr-2 h-4 w-4" /> Upload Another</Button>
      </motion.div>

      {/* Right Column */}
      <motion.div variants={itemVariants} className="lg:col-span-3">
        <RecipeForm initial={{ dishName: uniqueIngredients.join(", ") }} />
      </motion.div>
    </motion.div>
  );
};

// 2. Loading View
const LoadingView = () => {
  const [text, setText] = useState("Analyzing your image...");
  const loadingTexts = ["Scanning for ingredients...", "Consulting with expert chefs...", "Preparing your workspace..."];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % loadingTexts.length;
      setText(loadingTexts[index]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center p-8">
      <Loader2 className="h-16 w-16 animate-spin text-green-400" />
      <p className="text-xl font-semibold text-gray-300 mt-4">{text}</p>
      <p className="text-gray-500">This may take a moment.</p>
    </div>
  );
};

// 3. Preview View
const PreviewView = ({ previewUrl, onReset, onUpload, isLoading }) => (
  <div className="flex flex-col items-center gap-6 text-center">
    <motion.img layoutId="previewImage" src={previewUrl} alt="Preview" className="max-h-72 rounded-2xl shadow-lg border-4 border-green-400/50 object-cover" />
    <div className="flex flex-col sm:flex-row gap-4 mt-2">
      <Button onClick={onReset} variant="outline">
        <Replace className="mr-2 h-4 w-4" /> Change Image
      </Button>
      <Button onClick={onUpload} size="lg" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <CheckCircle2 className="mr-2 h-5 w-5" />}
        {isLoading ? "Detecting..." : "Detect Ingredients"}
      </Button>
    </div>
  </div>
);

// 4. Upload View
const UploadView = ({ onFileChange, fileInputRef, error }) => {
    const [isDragging, setIsDragging] = useState(false);
    return (
        <div 
            className="text-center w-full max-w-2xl mx-auto"
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDrop={() => setIsDragging(false)}
        >
            <h2 className="text-3xl font-bold text-center mb-2">Upload an Image of Your Ingredients</h2>
            <p className="text-gray-400 mb-6">Our AI will detect them and help you create a delicious recipe.</p>
            <motion.div
                className={`p-10 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 ${isDragging ? 'border-green-400 bg-green-500/10' : 'border-slate-700'}`}
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.02, borderColor: 'rgb(52 211 153)' }}
            >
                <UploadCloud className="h-16 w-16 mx-auto text-green-400" />
                <p className="mt-4 text-lg font-semibold text-gray-300">Click or drag & drop to upload</p>
                <p className="text-sm text-gray-500">PNG, JPG, or WEBP (max {MAX_IMAGE_SIZE_MB}MB)</p>
                <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => onFileChange(e.target.files[0])} accept="image/*"/>
            </motion.div>
            {error && <div className="mt-4 text-red-400 flex items-center justify-center gap-2"><AlertTriangle className="h-4 w-4"/>{error}</div>}
        </div>
    )
};


// --- Main Page Component ---

function UploadPage() {
  const [appState, setAppState] = useState("uploading"); // uploading | preview | loading | result
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uniqueIngredients, setUniqueIngredients] = useState([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => previewUrl && URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const handleImageChange = (file) => {
    if (!file) return;
    setError("");
    if (!file.type.startsWith("image/")) return setError("Please upload a valid image file.");
    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) return setError(`Image is too large. Max size is ${MAX_IMAGE_SIZE_MB}MB.`);
    
    setSelectedImage(file);
    previewUrl && URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setUniqueIngredients([]);
    setAppState("preview");
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
    setAppState("loading");
    setError("");

    try {
      const base64Image = (await fileToBase64(selectedImage)).split(",")[1];
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: ROBOTFLOW_API_KEY, inputs: { image: { type: "base64", value: base64Image } } }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "API call failed.");

      const predictions = data.outputs?.[0]?.predictions?.predictions || [];
      const uniqueNames = Array.from(new Set(predictions.map((p) => p.class))).sort();
      
      setUniqueIngredients(uniqueNames);
      setAppState("result");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to communicate with the detection API.");
      setAppState("preview"); // Go back to preview on error
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    previewUrl && URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
    setUniqueIngredients([]);
    setError("");
    setAppState("uploading");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const renderContent = () => {
    const key = appState;
    let content;
    switch (appState) {
        case "loading": content = <LoadingView />; break;
        case "result": content = <ResultView previewUrl={previewUrl} uniqueIngredients={uniqueIngredients} onReset={handleReset} />; break;
        case "preview": content = <PreviewView previewUrl={previewUrl} onReset={handleReset} onUpload={handleUpload} isLoading={appState === 'loading'} />; break;
        case "uploading":
        default: content = <UploadView onFileChange={handleImageChange} fileInputRef={fileInputRef} error={error}/>; break;
    }
    return <motion.div key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>{content}</motion.div>
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-900 text-gray-200">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-96 h-96 md:w-[36rem] md:h-[36rem] bg-teal-600/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 md:w-[36rem] md:h-[36rem] bg-green-600/10 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className={`rounded-3xl border bg-slate-800/50 backdrop-blur-xl shadow-2xl border-slate-700 w-full max-w-7xl p-8 transition-all duration-500 ${appState === 'result' ? 'max-w-7xl' : 'max-w-3xl'}`}>
        <div className="space-y-6">
            <AnimatePresence mode="wait">
                {renderContent()}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;