import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import './App.css';

function App() {
  return (
    <>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
