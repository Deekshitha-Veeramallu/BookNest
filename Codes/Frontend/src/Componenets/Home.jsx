// src/components/Navbar.js

import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Navigation */}
      <nav style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <span style={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: '2rem',
              fontWeight: '800'
            }}>
              📚 BookStore
            </span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center', 
        padding: '4rem 1rem',
        background: 'rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '800', 
            color: '#ffffff',
            marginBottom: '1.5rem',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            Welcome to the Ultimate
            <span style={{ 
              background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block',
              marginTop: '0.5rem'
            }}>
              Book Experience
            </span>
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'rgba(255, 255, 255, 0.9)', 
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem auto',
            lineHeight: '1.6'
          }}>
            Discover millions of books, connect with authors, and build your personal library. 
            Whether you're a reader, seller, or administrator, we have everything you need.
          </p>

          {/* Main Action Buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            flexWrap: 'wrap',
            marginBottom: '4rem'
          }}>
            <Link to="/login" style={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
              color: '#ffffff',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }} onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 12px 35px rgba(255, 107, 107, 0.6)';
            }} onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
            }}>
              👤 User Portal
            </Link>
            
            <Link to="/slogin" style={{
              background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
              color: '#ffffff',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              boxShadow: '0 8px 25px rgba(78, 205, 196, 0.4)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }} onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 12px 35px rgba(78, 205, 196, 0.6)';
            }} onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(78, 205, 196, 0.4)';
            }}>
              🏪 Seller Portal
            </Link>
            
            <Link to="/alogin" style={{
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
              color: '#333333',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              boxShadow: '0 8px 25px rgba(168, 237, 234, 0.4)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }} onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 12px 35px rgba(168, 237, 234, 0.6)';
            }} onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(168, 237, 234, 0.4)';
            }}>
              ⚙️ Admin Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 1rem', background: 'rgba(255, 255, 255, 0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: '#ffffff',
            marginBottom: '3rem'
          }}>
            Why Choose BookStore?
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {/* Feature 1 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '2.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              color: '#ffffff'
            }} onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-10px)';
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            }} onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 1.5rem auto',
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                📖
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Vast Collection
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                Access millions of books across all genres, from bestsellers to rare finds.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '2.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              color: '#ffffff'
            }} onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-10px)';
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            }} onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 1.5rem auto',
                background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                🛡️
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Secure Platform
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                Your data and transactions are protected with industry-leading security.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '2.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              color: '#ffffff'
            }} onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-10px)';
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            }} onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 1.5rem auto',
                background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                🚀
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Fast & Easy
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                Quick setup, intuitive interface, and seamless user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: '800', 
                color: '#ffd700',
                marginBottom: '0.5rem'
              }}>
                1M+
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem' }}>
                Books Available
              </div>
            </div>
            <div>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: '800', 
                color: '#4ecdc4',
                marginBottom: '0.5rem'
              }}>
                50K+
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem' }}>
                Active Users
              </div>
            </div>
            <div>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: '800', 
                color: '#ff6b6b',
                marginBottom: '0.5rem'
              }}>
                10K+
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem' }}>
                Sellers
              </div>
            </div>
            <div>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: '800', 
                color: '#a8edea',
                marginBottom: '0.5rem'
              }}>
                24/7
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem' }}>
                Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        background: 'rgba(0, 0, 0, 0.2)', 
        padding: '2rem 1rem', 
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1rem' }}>
            2025 BookStore. All rights reserved to Veeramallu Deekshitha Maithreyi.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Privacy Policy</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Terms of Service</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
