import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;