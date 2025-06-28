import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snavbar from './Snavbar';

function Addbook() {
  const [formData, setFormData] = useState({
    description: '',
    title: '',
    author: '',
    genre: '',
    price: '',
    itemImage: null
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    if (e.target.name === 'itemImage') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('genre', formData.genre);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('itemImage', formData.itemImage);
      formDataToSend.append('userName', user.name);
      formDataToSend.append('userId', user.id);

      await axios.post('http://localhost:4000/items', formDataToSend);
      alert('Book added successfully!');
      navigate('/myproducts');
    } catch (error) {
      console.error('Error adding book: ', error);
      alert('Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Snavbar />
      
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '2rem',
          padding: '3rem',
          color: '#ffffff'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              marginBottom: '0.5rem',
              textShadow: '0 4px 8px rgba(0,0,0,0.3)'
            }}>
              📚 Add New Book
            </h1>
            <p style={{ 
              fontSize: '1.1rem', 
              color: 'rgba(255, 255, 255, 0.8)'
            }}>
              Add your book to the marketplace
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                color: '#ffffff', 
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                📖 Book Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter book title"
                value={formData.title}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                color: '#ffffff', 
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                ✍️ Author Name
              </label>
              <input
                type="text"
                name="author"
                placeholder="Enter author name"
                value={formData.author}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                color: '#ffffff', 
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                📂 Genre
              </label>
              <input
                type="text"
                name="genre"
                placeholder="Enter book genre"
                value={formData.genre}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                color: '#ffffff', 
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                💰 Price
              </label>
              <input
                type="number"
                name="price"
                placeholder="Enter book price"
                value={formData.price}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                color: '#ffffff', 
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                📝 Description
              </label>
              <textarea
                name="description"
                placeholder="Enter book description"
                value={formData.description}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  minHeight: '120px',
                  resize: 'vertical'
                }}
                required
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                color: '#ffffff', 
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                🖼️ Book Cover Image
              </label>
              <input
                type="file"
                name="itemImage"
                accept="image/*"
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '2rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '1rem'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                  Adding Book...
                </>
              ) : (
                <>
                  📚 Add Book to Marketplace
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addbook;

