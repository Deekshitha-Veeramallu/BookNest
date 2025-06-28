import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Unavbar from './Unavbar';

const Uitem = () => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState([]);
    const [isInWishlist, setIsInWishlist] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        // Fetch book details
        axios.get(`http://localhost:4000/item/${id}`)
            .then((resp) => {
                console.log(resp);
                setItem(resp.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("Did not get data");
                setLoading(false);
            });

        // Fetch wishlist to check if book is saved
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            axios.get(`http://localhost:4000/wishlist/${user.id}`)
                .then((response) => {
                    const wishlistData = response.data;
                    setWishlist(wishlistData);
                    setIsInWishlist(wishlistData.some(wishItem => wishItem.itemId === id));
                })
                .catch((error) => {
                    console.error('Error fetching wishlist: ', error);
                });
        }
    }, [id]);

    const addToWishlist = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                alert('Please login to add items to wishlist');
                return;
            }

            const { title, itemImage, _id: itemId } = item;
            const userId = user.id;
            const userName = user.name;

            await axios.post(`http://localhost:4000/wishlist/add`, { 
                itemId, 
                title, 
                itemImage, 
                userId, 
                userName 
            });

            // Refresh wishlist
            const response = await axios.get(`http://localhost:4000/wishlist/${user.id}`);
            setWishlist(response.data);
            setIsInWishlist(true);
            alert('Added to wishlist successfully!');
        } catch (error) {
            console.error('Error adding to wishlist: ', error);
            alert('Failed to add to wishlist');
        }
    };

    const removeFromWishlist = async () => {
        try {
            await axios.post(`http://localhost:4000/wishlist/remove`, { itemId: id });

            // Refresh wishlist
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get(`http://localhost:4000/wishlist/${user.id}`);
            setWishlist(response.data);
            setIsInWishlist(false);
            alert('Removed from wishlist successfully!');
        } catch (error) {
            console.error('Error removing from wishlist: ', error);
            alert('Failed to remove from wishlist');
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
                    <p>Loading book details...</p>
                </div>
            </div>
        );
    }

    if (!item) {
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
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
                    <h2>Book not found</h2>
                    <p>Sorry, this book could not be found.</p>
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
                {/* Book Details Card */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '2rem',
                    overflow: 'hidden',
                    marginBottom: '2rem'
                }}>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                        gap: '2rem'
                    }}>
                        {/* Book Image */}
                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <img 
                                src={`http://localhost:4000/${item.itemImage}`} 
                                alt={item.title}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    borderRadius: '1rem',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                }}
                            />
                        </div>

                        {/* Book Information */}
                        <div style={{ padding: '2rem', color: '#ffffff' }}>
                            <h1 style={{ 
                                fontSize: '2.5rem', 
                                fontWeight: 'bold', 
                                marginBottom: '1rem',
                                lineHeight: '1.2'
                            }}>
                                {item.title}
                            </h1>
                            
                            <div style={{ marginBottom: '2rem' }}>
                                <p style={{ 
                                    fontSize: '1.2rem', 
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    marginBottom: '0.5rem'
                                }}>
                                    <strong>Author:</strong> {item.author}
                                </p>
                                <p style={{ 
                                    fontSize: '1.2rem', 
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    marginBottom: '0.5rem'
                                }}>
                                    <strong>Genre:</strong> {item.genre}
                                </p>
                                <p style={{ 
                                    fontSize: '1.2rem', 
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    marginBottom: '0.5rem'
                                }}>
                                    <strong>Seller:</strong> {item.userName}
                                </p>
                                <div style={{
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    color: '#ffd700',
                                    marginTop: '1rem'
                                }}>
                                    ${item.price}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ 
                                display: 'flex', 
                                gap: '1rem',
                                flexWrap: 'wrap',
                                marginBottom: '2rem'
                            }}>
                                <Link 
                                    to={`/orderitem/${item._id}`}
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
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        flex: '1',
                                        justifyContent: 'center',
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
                                    💳 Buy Now
                                </Link>

                                {isInWishlist ? (
                                    <button
                                        onClick={removeFromWishlist}
                                        style={{
                                            background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                                            color: '#ffffff',
                                            border: 'none',
                                            padding: '1rem 2rem',
                                            borderRadius: '2rem',
                                            fontSize: '1.1rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            flex: '1',
                                            justifyContent: 'center',
                                            boxShadow: '0 8px 25px rgba(78, 205, 196, 0.4)'
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
                                        ❤️ Remove from Wishlist
                                    </button>
                                ) : (
                                    <button
                                        onClick={addToWishlist}
                                        style={{
                                            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                                            color: '#333333',
                                            border: 'none',
                                            padding: '1rem 2rem',
                                            borderRadius: '2rem',
                                            fontSize: '1.1rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            flex: '1',
                                            justifyContent: 'center',
                                            boxShadow: '0 8px 25px rgba(168, 237, 234, 0.4)'
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
                                        ❤️ Add to Wishlist
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '1.5rem',
                    padding: '2rem',
                    color: '#ffffff'
                }}>
                    <h2 style={{ 
                        fontSize: '2rem', 
                        fontWeight: 'bold', 
                        marginBottom: '1.5rem',
                        textAlign: 'center'
                    }}>
                        📖 Book Description
                    </h2>
                    <div style={{
                        width: '50px',
                        height: '3px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        margin: '0 auto 2rem auto',
                        borderRadius: '2px'
                    }}></div>
                    <p style={{ 
                        fontSize: '1.1rem', 
                        lineHeight: '1.8',
                        color: 'rgba(255, 255, 255, 0.9)',
                        textAlign: 'justify'
                    }}>
                        {item.description}
                    </p>
                </div>

                {/* Back to Products Button */}
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link 
                        to="/uproducts"
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: '#ffffff',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            padding: '1rem 2rem',
                            borderRadius: '2rem',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.transform = 'translateY(-3px)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        ← Back to All Books
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Uitem;
