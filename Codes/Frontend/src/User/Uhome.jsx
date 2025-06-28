import React from 'react'
import Unavbar from './Unavbar'
import "./uhome.css"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Footer from '../Componenets/Footer'

const Uhome = () => {
  const navigate = useNavigate()
  
  const products = () => {
    navigate('/uproducts')
  }

  const wishlist = () => {
    navigate('/wishlist')
  }

  const myOrders = () => {
    navigate('/myorders')
  }

  const bestSellers = [
    {
      id: 1,
      title: "RICH DAD POOR DAD",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1524451661i/39924789.jpg",
      author: "Robert Kiyosaki",
      price: "$19.99",
      rating: 4.5
    },
    {
      id: 2,
      title: "THINK AND GROW RICH",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463241782i/30186948.jpg",
      author: "Napoleon Hill",
      price: "$15.99",
      rating: 4.3
    },
    {
      id: 3,
      title: "DON'T LET HER STAY",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1674147285i/80830635.jpg",
      author: "Wendy Heard",
      price: "$12.99",
      rating: 4.7
    },
    {
      id: 4,
      title: "KILLING THE WITCHES",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1675642559i/65214203.jpg",
      author: "Bill O'Reilly",
      price: "$18.99",
      rating: 4.2
    }
  ];

  const topRecommendations = [
    {
      id: 5,
      title: "HARRY POTTER",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1663805647i/136251.jpg",
      author: "J.K. Rowling",
      price: "$24.99",
      rating: 4.8
    },
    {
      id: 6,
      title: "ELON MUSK",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1692288251i/122765395.jpg",
      author: "Walter Isaacson",
      price: "$29.99",
      rating: 4.6
    },
    {
      id: 7,
      title: "THE MOSQUITO",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1544102229i/42983957.jpg",
      author: "Timothy C. Winegard",
      price: "$16.99",
      rating: 4.4
    },
    {
      id: 8,
      title: "JOURNEY ON THE JAMES",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1347493537i/1979210.jpg",
      author: "Edwin L. James",
      price: "$14.99",
      rating: 4.1
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Unavbar/>
      
      {/* Hero Section */}
      <section className="hero-section text-center p-xl">
        <div className="container">
          <h1 className="text-gradient font-bold text-4xl mb-md animate-fade-in-up" style={{ color: '#ffffff' }}>
            Discover Your Next Great Read
          </h1>
          <p className="text-gray text-lg mb-xl max-w-2xl mx-auto animate-fade-in-up" style={{ color: '#ffffff' }}>
            Explore thousands of books from bestselling authors and discover new worlds waiting to be explored.
          </p>
          
          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1.5rem', 
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}>
            <button 
              onClick={products}
              style={{ 
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
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
              📚 Browse All Books
            </button>
            
            <button 
              onClick={wishlist}
              style={{ 
                background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(78, 205, 196, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 12px 35px rgba(78, 205, 196, 0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(78, 205, 196, 0.4)';
              }}
            >
              ❤️ My Wishlist
            </button>
            
            <button 
              onClick={myOrders}
              style={{ 
                background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                color: '#333333',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(168, 237, 234, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 12px 35px rgba(168, 237, 234, 0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(168, 237, 234, 0.4)';
              }}
            >
              📦 My Orders
            </button>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="p-xl">
        <div className="container">
          <div className="text-center mb-xl">
            <h2 className="text-gradient font-bold text-3xl mb-md animate-fade-in-left" style={{ color: '#ffffff' }}>
              Best Sellers
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></div>
          </div>
          
          <div className="grid grid-4 animate-fade-in-up">
            {bestSellers.map((book, index) => (
              <div key={book.id} className="book-card card animate-float" style={{ 
                animationDelay: `${index * 0.1}s`,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '1.5rem',
                padding: '2rem',
                color: '#ffffff',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }} onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-10px)';
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }} onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}>
                <Link to='/uproducts' className="block">
                  <div className="book-image-container mb-md">
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="book-image"
                      style={{ borderRadius: '1rem', width: '100%', height: 'auto' }}
                    />
                    <div className="book-overlay">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-sm" style={{ color: '#ffffff' }}>{book.title}</h3>
                    <p className="text-gray text-sm mb-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{book.author}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#ffd700', fontWeight: 'bold' }}>{book.price}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ color: '#ffd700' }}>★</span>
                        <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{book.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Recommendations Section */}
      <section className="p-xl" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
        <div className="container">
          <div className="text-center mb-xl">
            <h2 className="text-gradient font-bold text-3xl mb-md animate-fade-in-right" style={{ color: '#ffffff' }}>
              Top Recommendations
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></div>
          </div>
          
          <div className="grid grid-4 animate-fade-in-up">
            {topRecommendations.map((book, index) => (
              <div key={book.id} className="book-card card animate-float" style={{ 
                animationDelay: `${index * 0.1}s`,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '1.5rem',
                padding: '2rem',
                color: '#ffffff',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }} onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-10px)';
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }} onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}>
                <Link to='/uproducts' className="block">
                  <div className="book-image-container mb-md">
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="book-image"
                      style={{ borderRadius: '1rem', width: '100%', height: 'auto' }}
                    />
                    <div className="book-overlay">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-sm" style={{ color: '#ffffff' }}>{book.title}</h3>
                    <p className="text-gray text-sm mb-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{book.author}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#ffd700', fontWeight: 'bold' }}>{book.price}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ color: '#ffd700' }}>★</span>
                        <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{book.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="p-xl">
        <div className="container">
          <div className="text-center mb-xl">
            <h2 className="text-gradient font-bold text-3xl mb-md" style={{ color: '#ffffff' }}>
              Why Choose Our BookStore?
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></div>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '1.5rem',
              padding: '2rem',
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
                width: '60px',
                height: '60px',
                margin: '0 auto 1rem auto',
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                📚
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Vast Collection</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Thousands of books across all genres</p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '1.5rem',
              padding: '2rem',
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
                width: '60px',
                height: '60px',
                margin: '0 auto 1rem auto',
                background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                🚚
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Fast Delivery</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Quick and secure shipping worldwide</p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '1.5rem',
              padding: '2rem',
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
                width: '60px',
                height: '60px',
                margin: '0 auto 1rem auto',
                background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                💎
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Best Prices</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Competitive prices and great deals</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Uhome;