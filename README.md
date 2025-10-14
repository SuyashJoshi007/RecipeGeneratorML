🍳 Recipe Generator

A smart application to help you discover recipes based on the ingredients you have. Leveraging machine learning, you can even snap a photo of your ingredients, and the app will identify them for you. Say goodbye to the eternal question: "What's for dinner?"

📖 Table of Contents

    About The Project

    ✨ Features

    🛠️ Built With

    🚀 Getting Started

        Prerequisites

        Installation

    ⚙️ Configuration

    🧩 Usage

    🧪 Running Tests

    🤝 Contributing

    📄 License


📝 About The Project

This Recipe Generator was created to solve a common household problem: having a pantry full of ingredients but no idea what to make. This tool allows users to manually input ingredients or use their device's camera to automatically detect them. The app then fetches a curated list of delicious recipes, with filters for dietary needs, cuisine type, and more, making meal planning simple and fun.

✨ Features

    📸 Image-Based Ingredient Recognition: Snap a photo of your ingredients, and the app's custom-trained YOLO model will automatically detect and list them.

    📝 Ingredient-Based Search: Find recipes using a list of ingredients.

    ⚙️ Advanced Filtering: Filter results by cuisine, diet (e.g., Vegan, Gluten-Free), and meal type.

    ☁️ Real-time Database: User favorites are stored and synced instantly with Cloud Firestore.

    🔐 Secure Authentication: User accounts are managed securely with Firebase Authentication.

    💾 Save Your Favorites: Logged-in users can save their favorite recipes for later.

🛠️ Built With

This project uses modern JavaScript, a serverless backend, and a custom-trained machine learning model.

    Frontend:

        React

        Vite

    Machine Learning:

        Model: YOLO (You Only Look Once)

        Task: Object Detection for ingredients

        Training Platform: Roboflow

    Backend & Infrastructure:

        Firebase Platform

        Authentication: Firebase Authentication

        Database: Cloud Firestore

        Hosting: Firebase Hosting

    API:

        Google Gemini API for recipe generation.

🚀 Getting Started

To get a local copy up and running, follow these simple steps.

Prerequisites

Make sure you have Node.js and the Firebase CLI installed.

    Node.js (v18.x or later)

    Firebase CLI
    Bash

    npm install -g firebase-tools

Installation

    Clone the repository:
    Bash

git clone https://github.com/your-username/recipe-generator.git
cd recipe-generator

Install frontend dependencies:
Bash

npm install

Install backend (Cloud Functions) dependencies (if you have them):
Bash

cd functions
npm install
cd ..

Connect to your Firebase project:
Bash

    firebase login
    firebase use --add

    Then select your Firebase project from the list.

⚙️ Configuration

This project requires environment variables to connect to Firebase and other services.

    Get your Firebase config from your Firebase project console settings.

    Create an environment file: In the root of your project, copy the example file.
    Bash

cp .env.example .env.local

Add your keys to .env.local. If using Vite, prefixes must be VITE_.
Code snippet

    # Firebase Configuration
    VITE_FIREBASE_API_KEY="your-api-key"
    VITE_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
    VITE_FIREBASE_PROJECT_ID="your-project-id"
    VITE_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
    VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
    VITE_FIREBASE_APP_ID="your-app-id"

    # Google Gemini API Key
    VITE_GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"

    # YOLO Model Endpoint/API Key (if applicable)
    VITE_YOLO_API_KEY="YOUR_YOLO_MODEL_API_KEY_HERE"

🧩 Usage

You can run the full application locally using the Firebase Local Emulator Suite.

    Start the Firebase Emulators:
    Bash

firebase emulators:start

In a new terminal, start the React frontend:
Bash

    npm run dev

    Open your browser and navigate to http://localhost:5173 (or the port shown in your terminal).

Deployment

To deploy your application to Firebase:
Bash

firebase deploy

🧪 Running Tests

    For the frontend (React):
    Bash

npm test

For the backend (Cloud Functions):
Bash

    cd functions
    npm test

🤝 Contributing

Contributions are greatly appreciated. Please fork the repository and open a pull request.

    Fork the Project

    Create your Feature Branch (git checkout -b feature/AmazingFeature)

    Commit your Changes (git commit -m 'Add some AmazingFeature')

    Push to the Branch (git push origin feature/AmazingFeature)

    Open a Pull Request

📄 License

Distributed under the MIT License. See LICENSE.txt for more information.


Project Link: https://github.com/SuyashJoshi007/RecipeGeneratorML