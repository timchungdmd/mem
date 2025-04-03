import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App'; // Minimal App component
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import FeaturesPage from './pages/FeaturesPage';
import './index.css';

// Main application component with internal routing
import MembershipApp from './MembershipApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        {/* The MembershipApp now handles all routes starting with /app */}
        <Route path="/app/*" element={<MembershipApp />} />
        {/* Add route for login page later: <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </Router>
  </React.StrictMode>,
);
