import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/auth.css';

export default function LoginPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const isLogin = searchParams.get('mode') !== 'signup';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isLogin) {
      if (email && password) {
        setMessage('Login successful!');
        navigate('/boards');
      } else {
        setMessage('Please enter email and password.');
      }
    } else {
      if (!fullName || !email || !password || !confirmPassword) {
        setMessage('Please fill in all fields.');
        return;
      }
      if (password !== confirmPassword) {
        setMessage('Passwords do not match.');
        return;
      }
      setMessage('Signup successful!');
      navigate('/boards');
    }
  }

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1 
          className="auth-title"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Trello Clone
        </motion.h1>
        <motion.p 
          className="auth-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Organize your projects with ease
        </motion.p>
      </motion.div>
      <div className="auth-card">
        <div className="auth-tabs">
          <button
            onClick={() => setSearchParams({})}
            className={`auth-tab ${isLogin ? 'auth-tab-active' : 'auth-tab-inactive'}`}
          >
            Login
          </button>
          <button
            onClick={() => setSearchParams({ mode: 'signup' })}
            className={`auth-tab ${!isLogin ? 'auth-tab-active' : 'auth-tab-inactive'}`}
          >
            Sign Up
          </button>
        </div>
        <h2 className="auth-form-title">
          {isLogin ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="auth-form-subtitle">
          {isLogin 
            ? 'Enter your credentials to access your boards'
            : 'Sign up to start organizing your projects'}
        </p>
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="auth-form-group">
              <label className="auth-label">Full Name</label>
              <input
                type="text"
                className="auth-input"
                placeholder="Enter your full name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />
            </div>
          )}
          <div className="auth-form-group">
            <label className="auth-label">Email</label>
            <input
              type="email"
              className="auth-input"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-form-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="auth-input"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {!isLogin && (
            <div className="auth-form-group">
              <label className="auth-label">Confirm Password</label>
              <input
                type="password"
                className="auth-input"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          <button type="submit" className="auth-button">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        {message && <p className="auth-message">{message}</p>}
      </div>
      <p className="auth-demo-text">
        Demo credentials: any email/password combination will work
      </p>
    </div>
  );
}