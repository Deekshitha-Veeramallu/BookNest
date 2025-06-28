import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from '../Componenets/Home';

const Ssignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let payload = { name, email, password };

    axios
      .post("http://localhost:4000/ssignup", payload)
      .then((result) =>{
        alert('Account created successfully!');
        console.log(result);
        navigate('/slogin');
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to create an account. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/slogin");
  };

  return (
    <div className="min-h-screen bg-gradient flex flex-col">
      <Home />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="form-container">
          <div className="form-card animate-fade-in-up">
            <div className="text-center mb-xl">
              <h1 className="text-gradient font-bold mb-md">Join as Seller</h1>
              <p className="text-gray">Create your seller account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-lg">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-sm">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>

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
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Create a password"
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
                      Creating account...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-sm">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="8.5" cy="7" r="4"/>
                        <line x1="20" y1="8" x2="20" y2="14"/>
                        <line x1="23" y1="11" x2="17" y2="11"/>
                      </svg>
                      Create Seller Account
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray">
                    Already have a seller account?{' '}
                    <button
                      onClick={handleLogin}
                      className="text-primary hover:underline font-medium transition-colors"
                    >
                      Sign In
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

export default Ssignup;
