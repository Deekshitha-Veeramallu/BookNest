import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Unavbar from '../User/Unavbar';
import { Link } from 'react-router-dom';

function Items() {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Fetch all items
    axios
      .get(`http://localhost:4000/item`)
      .then((response) => {
        const taskData = response.data;
        setItems(taskData);
      })
      .catch((error) => {
        console.error('Error fetching tasks: ', error);
      });

    // Fetch wishlist items
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      axios.get(`http://localhost:4000/wishlist/${user.id}`)
        .then((response) => {
          const wishlistData = response.data;
          setWishlist(wishlistData);
        }) 
    } else {
      console.log('ERROR');
    }
  }, []);

  const addToWishlist = async (itemId) => {
    try {
      console.log('itemId before find:', itemId);
      // Find the selected item by itemId
      const selectedItem = items.find((item) => {
        console.log('item._id:', item._id);
        console.log('itemId in find:', itemId);
        return item._id === itemId;
      });
  
      console.log('selectedItem:', selectedItem);
  
      if (!selectedItem) {
        throw new Error('Selected item not found');
      }
  
      // Destructure the needed properties
      const { title, itemImage, _id: itemId2 } = selectedItem;
  
      const userId = JSON.parse(localStorage.getItem('user')).id;
      const userName = JSON.parse(localStorage.getItem('user')).name;
      console.log('itemId2:', itemId2);
      console.log('itemId2:', title);
  
      // Add item to the wishlist
      await axios.post(`http://localhost:4000/wishlist/add`, { itemId: itemId2, title, itemImage,userId,userName });
      // Refresh the wishlist items
      const user = JSON.parse(localStorage.getItem('user'));
      if(user){
        axios.get(`http://localhost:4000/wishlist/${user.id}`)
          .then((response) => {
            const wishlistData = response.data;
            setWishlist(wishlistData);
          }) 
      } else {
        console.log('ERROR');
      }
    } catch (error) {
      console.error('Error adding item to wishlist: ', error);
    }
  };
  
  const removeFromWishlist = async (itemId) => {
    try {
      // Remove item from the wishlist
      await axios.post(`http://localhost:4000/wishlist/remove`, { itemId }); // Adjust the endpoint accordingly

      // Refresh the wishlist items
      const user = JSON.parse(localStorage.getItem('user'));
      if(user){
        const response = await axios.get(`http://localhost:4000/wishlist/${user.id}`,); // Adjust the endpoint accordingly
        setWishlist(response.data);
      } else {
        console.log('ERROR');
      }
    } catch (error) {
      console.error('Error removing item from wishlist: ', error);
    }
  };

  const isItemInWishlist = (itemId) => {
    return wishlist.some((item) => item.itemId === itemId);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Unavbar />
      
      <div style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            color: '#ffffff',
            marginBottom: '1rem',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            📚 Book Collection
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            Explore and manage all available books
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {items.map((item) => (
            <div
              key={item._id}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '2rem',
                padding: '2rem',
                color: '#ffffff',
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
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <img
                  src={`http://localhost:4000/${item.itemImage}`}
                  alt="Item Image"
                  style={{
                    height: '300px',
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: '1.5rem',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1rem',
                  color: '#ffffff'
                }}>
                  📖 {item.title}
                </h3>
                <p style={{ 
                  fontSize: '1rem', 
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '0.5rem'
                }}>
                  ✍️ Author: {item.author}
                </p>
                <p style={{ 
                  fontSize: '1rem', 
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '0.5rem'
                }}>
                  📂 Genre: {item.genre}
                </p>
                <p style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold',
                  color: '#4CAF50'
                }}>
                  💰 Price: ₹{item.price}
                </p>
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                {isItemInWishlist(item._id) ? (
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '2rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      flex: 1
                    }}
                    onClick={() => removeFromWishlist(item._id)}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(244, 67, 54, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    ❌ Remove from Wishlist
                  </button>
                ) : (
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '2rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      flex: 1
                    }}
                    onClick={() => addToWishlist(item._id)}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(156, 39, 176, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    ❤️ Add to Wishlist
                  </button>
                )}

                <Link to={`/uitem/${item._id}`} style={{ textDecoration: 'none', flex: 1 }}>
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '2rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      width: '100%'
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
                    👁️ View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '2rem',
            padding: '4rem',
            textAlign: 'center',
            color: '#ffffff'
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭 No Books Available</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              No books have been added to the collection yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Items;

