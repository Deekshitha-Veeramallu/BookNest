import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Unavbar from './Unavbar';
import { Link } from 'react-router-dom';

function Products() {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  useEffect(() => {
    // Fetch all items
    axios
      .get(`http://localhost:4000/item`)
      .then((response) => {
        const taskData = response.data;
        setItems(taskData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tasks: ', error);
        setLoading(false);
      });

    // Fetch wishlist items
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      axios.get(`http://localhost:4000/wishlist/${user.id}`)
      .then((response) => {
        const wishlistData = response.data;
        setWishlist(wishlistData);
      }) 
    } 
    else{
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
      } 
      else{
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
      } 
      else{
        console.log('ERROR');
      }}
    catch (error) {
      console.error('Error removing item from wishlist: ', error);
    }
  };

  const isItemInWishlist = (itemId) => {
    return wishlist.some((item) => item.itemId === itemId);
  };

  // Filter items based on search term and genre
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || item.genre.toLowerCase() === selectedGenre.toLowerCase();
    return matchesSearch && matchesGenre;
  });

  // Get unique genres for filter
  const genres = ['all', ...new Set(items.map(item => item.genre))];

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
          <p>Loading books...</p>
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
            📚 Book Collection
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '2rem'
          }}>
            Discover amazing books from talented authors
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <div>
              <label style={{ 
                display: 'block', 
                color: '#ffffff', 
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                🔍 Search Books
              </label>
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                color: '#ffffff', 
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                📖 Filter by Genre
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              >
                {genres.map(genre => (
                  <option key={genre} value={genre} style={{ background: '#333' }}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ 
          color: '#ffffff', 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.1rem' }}>
            Found <strong>{filteredItems.length}</strong> book{filteredItems.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Books Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {filteredItems.map((item) => (
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
                  {isItemInWishlist(item._id) ? (
                    <button
                      onClick={() => removeFromWishlist(item._id)}
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
                      ❤️ Remove from Wishlist
                    </button>
                  ) : (
                    <button
                      onClick={() => addToWishlist(item._id)}
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
                      ❤️ Add to Wishlist
                    </button>
                  )}

                  <Link 
                    to={`/uitem/${item._id}`}
                    style={{
                      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                      color: '#333333',
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

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#ffffff'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No books found</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Try adjusting your search terms or genre filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;

