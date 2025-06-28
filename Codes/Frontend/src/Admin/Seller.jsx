import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';

const Seller = () => {
  const [userbookings, setUserbookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/sellers`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sellers:', error);
      });
  }, []);

  const deleteData = (taskId) => {
    if (window.confirm('Are you sure you want to delete this seller?')) {
      axios.delete(`http://localhost:4000/sellerdelete/${taskId}`);
      window.location.assign('/sellers');
      alert('Seller deleted successfully');
    }
  };

  const deleteitem = (taskId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      axios.delete(`http://localhost:4000/useritemdelete/${taskId}`);
      window.location.assign('/users');
      alert('Item deleted successfully');
    }
  };

  const fetchUserBikeData = (userId) => {
    axios.get(`http://localhost:4000/getitem/${userId}`)
      .then((response) => {
        setUserbookings(response.data);
        toggleDetails();
      })
      .catch((error) => {
        console.error('Error fetching seller items:', error);
      });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Anavbar />
      
      <div style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            color: '#ffffff',
            marginBottom: '1rem',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            🏪 Vendor Management
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            Manage and monitor vendor accounts
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '2rem',
          padding: '2rem',
          overflow: 'auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {users.map((item, index) => (
              <div
                key={item._id}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    marginBottom: '1rem',
                    color: '#ffffff'
                  }}>
                    🏪 {item.name}
                  </h3>
                  <p style={{ 
                    fontSize: '1rem', 
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginBottom: '0.5rem'
                  }}>
                    📧 {item.email}
                  </p>
                  <p style={{ 
                    fontSize: '0.9rem', 
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontFamily: 'monospace'
                  }}>
                    🆔 {item._id.slice(0, 20)}...
                  </p>
                </div>

                <div style={{ 
                  display: 'flex', 
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => fetchUserBikeData(item._id)}
                    style={{
                      background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '2rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(33, 150, 243, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <FaEye /> View Products
                  </button>

                  <Link to={`/useredit/${item._id}`} style={{ textDecoration: 'none' }}>
                    <button
                      style={{
                        background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '2rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 25px rgba(76, 175, 80, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <FaEdit /> Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => deleteData(item._id)}
                    style={{
                      background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '2rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(244, 67, 54, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {users.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '4rem',
              color: '#ffffff'
            }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭 No Vendors Found</h2>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                No vendors have registered yet.
              </p>
            </div>
          )}
        </div>

        {/* Modal for Vendor Products */}
        {showDetails && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '2rem',
              padding: '3rem',
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflow: 'auto',
              color: '#ffffff'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold',
                  marginBottom: '1rem'
                }}>
                  📚 Vendor Products
                </h2>
                <button
                  onClick={toggleDetails}
                  style={{
                    background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '2rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(244, 67, 54, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  ✕ Close
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {userbookings.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '1.5rem',
                      padding: '2rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1.5rem',
                      alignItems: 'center'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <img 
                          src={`http://localhost:4000/${item?.itemImage}`} 
                          alt={`${item.itemtype} Image`} 
                          style={{ 
                            height: "100px", 
                            width: "120px",
                            borderRadius: '1rem',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                          }} 
                        />
                      </div>
                      
                      <div>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>📖 Product</h3>
                        <p>{item.itemtype}-{item._id.slice(3, 7)}</p>
                      </div>
                      
                      <div>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>🆔 Product ID</h3>
                        <p style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>{item._id.slice(0,10)}</p>
                      </div>
                      
                      <div>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>🛡️ Warranty</h3>
                        <p>1 year</p>
                      </div>
                      
                      <div>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>💰 Price</h3>
                        <p style={{ 
                          fontSize: '1.2rem', 
                          fontWeight: 'bold',
                          color: '#4CAF50'
                        }}>₹{item.price}</p>
                      </div>
                      
                      <div>
                        <button
                          onClick={() => deleteitem(item._id)}
                          style={{
                            background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '1rem',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <FaTrash /> Delete Product
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {userbookings.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📭 No Products</h3>
                  <p>This vendor hasn't added any products yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seller;
