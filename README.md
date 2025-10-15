# 🍳 Recipe Generator

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
</p>

A smart application to help you discover recipes based on the ingredients you have. Leveraging machine learning, you can even snap a photo of your ingredients, and the app will identify them for you. Say goodbye to the eternal question: "What's for dinner?"

**Live Demo:** [**Link to Your Deployed App Here**](https://recipegenerator-ee8cf.web.app/)

---

## 📖 Table of Contents

- [📝 About The Project](#-about-the-project)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Configuration](#️-configuration)
- [🧩 Usage](#-usage)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📬 Contact](#-contact)

---

## 📝 About The Project

This Recipe Generator was created to solve a common household problem: having a pantry full of ingredients but no idea what to make. This tool allows users to manually input ingredients or use their device's camera to automatically detect them. The app then fetches a curated list of delicious recipes, making meal planning simple and fun.

---

## ✨ Features

-   📸 **Image-Based Ingredient Recognition**: Snap a photo of your ingredients, and the app's custom-trained YOLO model will automatically detect and list them.
-   📝 **Ingredient-Based Search**: Find recipes using a list of ingredients from a vast dataset.
-   ⚙️ **Advanced Filtering**: Filter results by cuisine, diet (e.g., Vegan, Gluten-Free), and meal type.
-   ☁️ **Real-time Database**: User favorites are stored and synced instantly with Cloud Firestore.
-   🔐 **Secure Authentication**: User accounts are managed securely with Firebase Authentication.
-   💾 **Save Your Favorites**: Logged-in users can save their favorite recipes for later.

---

## 🛠️ Tech Stack

This project uses a modern tech stack, combining a powerful frontend, a Python backend, and custom machine learning models.

| Category                | Technologies                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------- |
| **Frontend** | `React`, `Vite`, `Tailwind CSS`                                                       |
| **Backend** | `Python`, `FastAPI` (or Flask)                                                        |
| **Database** | `Firebase Firestore`                                                                  |
| **Authentication** | `Firebase Authentication`                                                             |
| **ML / AI** | `YOLOv8`, `scikit-learn`, `Roboflow`, `Google Gemini API`                              |
| **Deployment/Hosting** | `Vercel` (for Frontend), `Firebase Hosting`, `Render` (for Backend)                   |

---

## 📂 Project Structure

This project is a monorepo, containing both the frontend and backend code in a single repository.