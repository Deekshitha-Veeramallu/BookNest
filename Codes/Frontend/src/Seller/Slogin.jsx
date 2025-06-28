import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from '../Componenets/Home';

const Slogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let payload = { email, password };
    axios
      .post("http://localhost:4000/slogin", payload)
      .then((res) => {
        console.log("login: " + res.data.Status);
        if (res.data.Status === "Success") {
          console.log(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          navigate('/shome');
          alert("login successful");
        } else {
          alert("wrong credentials");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Login failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/ssignup");
  };

  return (
    <div className="min-h-screen bg-gradient flex flex-col">
      <Home />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="form-container">
          <div className="form-card animate-fade-in-up">
            <div className="text-center mb-xl">
              <h1 className="text-gradient font-bold mb-md">Welcome Back, Seller</h1>
              <p className="text-gray">Sign in to your seller account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-lg">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-sm">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-sm">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter your password"
                />
              </div>

              <div className="space-y-md">
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                >
                  {loading ? (
                    <>
                      <div className="spinner mr-sm"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-sm">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                        <polyline points="10,17 15,12 10,7"/>
                        <line x1="15" y1="12" x2="3" y2="12"/>
                      </svg>
                      Sign In as Seller
                    </>
                  )}
                </button>
                
                <div className="text-center">
                  <p className="text-sm text-gray">
                    Don't have a seller account?{' '}
                    <button
                      onClick={handleSignup}
                      className="text-primary hover:underline font-medium transition-colors"
                    >
                      Create Account
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slogin;
