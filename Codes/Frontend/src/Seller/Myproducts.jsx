import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snavbar from './Snavbar';
import { FaTrash } from "react-icons/fa";

function Myproducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios
        .get(`http://localhost:4000/getitem/${user.id}`)
        .then((response) => {
          console.log('Response data:', response.data);
          const taskData = response.data;
          setItems(taskData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
          setLoading(false);
        });
    } else {
      console.log('ERROR');
      setLoading(false);
    }
  }, []);

  const deleteItem = (Id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      axios.delete(`http://localhost:4000/itemdelete/${Id}`);
      window.location.assign('/myproducts');
      alert('Item is deleted');
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
          <p>Loading your products...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Snavbar />
      
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
            📚 My Products
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '2rem'
          }}>
            Manage your book collection
          </p>
        </div>

        {/* Stats Card */}
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
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            {items.length} Book{items.length !== 1 ? 's' : ''} Listed
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Total books in your inventory
          </p>
        </div>

        {/* Products Grid */}
        {items.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {items.map((item) => (
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
                
                {/* Delete Button */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  zIndex: 10
                }}>
                  <button 
                    onClick={() => deleteItem(item._id)} 
                    style={{ 
                      background: 'rgba(255, 107, 107, 0.9)',
                      border: 'none',
                      color: '#ffffff',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'rgba(255, 107, 107, 1)';
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'rgba(255, 107, 107, 0.9)';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>

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
                    left: '1rem',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: '#ffffff',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    ${item.price}
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
                    marginBottom: '0.5rem',
                    fontSize: '1rem'
                  }}>
                    <strong>Genre:</strong> {item.genre}
                  </p>

                  <p style={{ 
                    color: 'rgba(255, 255, 255, 0.8)', 
                    marginBottom: '1rem',
                    fontSize: '0.9rem',
                    lineHeight: '1.4'
                  }}>
                    <strong>Description:</strong> {item.description.slice(0, 100)}...
                  </p>

                  {/* Action Buttons */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={() => deleteItem(item._id)}
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
                      🗑️ Delete Book
                    </button>

                    <button
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
                        flex: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      ✏️ Edit Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Products */
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
              📚
            </div>
            <h2 style={{ 
              fontSize: '2rem', 
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              No Books Listed Yet
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '2rem',
              maxWidth: '500px',
              margin: '0 auto 2rem auto'
            }}>
              Start selling by adding your first book to the marketplace.
            </p>
            <button
              onClick={() => window.location.href = '/addbook'}
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
              ➕ Add New Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Myproducts;
