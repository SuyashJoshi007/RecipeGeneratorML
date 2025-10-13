import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './components/UploadPage.jsx';
import LandingPage from './components/LandingPage.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import RecipeForm from './components/RecipeForm.jsx';
import RecipePage from './components/RecipePage.jsx';
function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/form" element={<RecipeForm />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/recipe-page" element={<RecipePage />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
