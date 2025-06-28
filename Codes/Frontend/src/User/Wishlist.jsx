// Wishlist.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Unavbar from './Unavbar';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios
        .get(`http://localhost:4000/wishlist/${user.id}`)
        .then((response) => {
          const wishlistData = response.data;
          setWishlist(wishlistData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching wishlist items: ', error);
          setLoading(false);
        });
    } else {
      console.log('ERROR');
      setLoading(false);
    }
  }, []);

  const removeFromWishlist = async (itemId) => {
    try {
      // Remove item from the wishlist
      await axios.post(`http://localhost:4000/wishlist/remove`, { itemId });

      // Refresh the wishlist items
      const user = JSON.parse(localStorage.getItem('user'));
      if(user){
        const response = await axios.get(`http://localhost:4000/wishlist/${user.id}`);
        setWishlist(response.data);
      } 
      else{
        console.log('ERROR');
      }}
    catch (error) {
      console.error('Error removing item from wishlist: ', error);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '1rem',
          padding: '2rem',
          color: '#ffffff',
          textAlign: 'center'
        }}>
          <div className="spinner" style={{ margin: '0 auto 1rem auto' }}></div>
          <p>Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Unavbar />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            color: '#ffffff',
            marginBottom: '1rem',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            ❤️ My Wishlist
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '2rem'
          }}>
            Your saved books for future reading
          </p>
        </div>

        {/* Wishlist Stats */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '3rem',
          textAlign: 'center',
          color: '#ffffff'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            {wishlist.length} Book{wishlist.length !== 1 ? 's' : ''} in Your Wishlist
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Keep track of books you want to read later
          </p>
        </div>

        {/* Wishlist Grid */}
        {wishlist.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {wishlist.map((item) => (
              <div key={item._id} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }} onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-10px)';
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }} onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}>
                
                {/* Book Image */}
                <div style={{ position: 'relative' }}>
                  <img
                    src={`http://localhost:4000/${item.itemImage}`}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 107, 107, 0.9)',
                    color: '#ffffff',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    ❤️ Saved
                  </div>
                </div>

                {/* Book Info */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 'bold', 
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                    lineHeight: '1.3'
                  }}>
                    {item.title}
                  </h3>
                  
                  <p style={{ 
                    color: 'rgba(255, 255, 255, 0.8)', 
                    marginBottom: '0.5rem',
                    fontSize: '1rem'
                  }}>
                    <strong>Author:</strong> {item.author}
                  </p>
                  
                  <p style={{ 
                    color: 'rgba(255, 255, 255, 0.8)', 
                    marginBottom: '1rem',
                    fontSize: '1rem'
                  }}>
                    <strong>Genre:</strong> {item.genre}
                  </p>

                  {/* Action Buttons */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={() => removeFromWishlist(item.itemId)}
                      style={{
                        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '2rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        flex: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      🗑️ Remove from Wishlist
                    </button>

                    <Link 
                      to={`/uitem/${item.itemId}`}
                      style={{
                        background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '2rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        flex: '1'
                      }}
                    >
                      👁️ View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Wishlist */
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#ffffff'
          }}>
            <div style={{ 
              fontSize: '6rem', 
              marginBottom: '2rem',
              opacity: '0.7'
            }}>
              ❤️
            </div>
            <h2 style={{ 
              fontSize: '2rem', 
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              Your Wishlist is Empty
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '2rem',
              maxWidth: '500px',
              margin: '0 auto 2rem auto'
            }}>
              Start building your reading list by exploring our collection and adding books you'd like to read later.
            </p>
            <Link 
              to="/uproducts"
              style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '2rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 12px 35px rgba(255, 107, 107, 0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
              }}
            >
              📚 Browse Books
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
