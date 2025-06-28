import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snavbar from './Snavbar';

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch items data
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (user) {
      axios.get(`http://localhost:4000/getsellerorders/${user.id}`)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error('Error fetching orders: ', error);
        });
    }
  }, []);

  // Function to calculate the status based on the delivery date
  const calculateStatus = (Delivery) => {
    const currentDate = new Date();
    const formattedDeliveryDate = new Date(Delivery);

    if (formattedDeliveryDate >= currentDate) {
      return "On the way";
    } else {
      return "Delivered";
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Snavbar />
      
      <div style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            color: '#ffffff',
            marginBottom: '1rem',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            📦 Order Management
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            Track and manage your book orders
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {orders.map((item) => {
            const status = calculateStatus(item.Delivery);
            const isDelivered = status === "Delivered";

            return (
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
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '2rem',
                  alignItems: 'center'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={`http://localhost:4000/${item?.itemImage}`} 
                      alt={`${item.itemtype} Image`} 
                      style={{ 
                        height: "120px", 
                        borderRadius: '1rem',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                      }} 
                    />
                  </div>
                  
                  <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>📖 Product Name</h3>
                    <p style={{ fontSize: '1.1rem' }}>{item.itemname}</p>
                  </div>
                  
                  <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>🆔 Order ID</h3>
                    <p style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>{item._id.slice(0,10)}</p>
                  </div>
                  
                  <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>👤 Customer</h3>
                    <p style={{ fontSize: '1.1rem' }}>{item.userName}</p>
                  </div>
                  
                  <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>📍 Address</h3>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                      {item.flatno},<br />
                      {item.city}, ({item.pincode})<br />
                      {item.state}
                    </p>
                  </div>
                  
                  <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>📅 Order Date</h3>
                    <p style={{ fontSize: '1rem' }}>{item.BookingDate}</p>
                  </div>
                  
                  <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>🚚 Delivery By</h3>
                    <p style={{ fontSize: '1rem' }}>{item.Delivery}</p>
                  </div>
                  
                  <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>🛡️ Warranty</h3>
                    <p style={{ fontSize: '1rem' }}>1 year</p>
                  </div>
                  
                  <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>💰 Price</h3>
                    <p style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold',
                      color: '#4CAF50'
                    }}>₹{item.totalamount}</p>
                  </div>
                  
                  <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>📊 Status</h3>
                    <span style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '2rem',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      background: isDelivered 
                        ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)'
                        : 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
                      color: '#ffffff',
                      display: 'inline-block'
                    }}>
                      {status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {orders.length === 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '2rem',
            padding: '4rem',
            textAlign: 'center',
            color: '#ffffff'
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭 No Orders Yet</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              You haven't received any orders yet. Keep promoting your books!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
