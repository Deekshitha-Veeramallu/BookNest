import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import Snavbar from './Snavbar';
import Footer from '../Componenets/Footer';

function Shome() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch items data
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (user) {
      axios
        .get(`http://localhost:4000/getitem/${user.id}`)
        .then((response) => {
          console.log('Response data:', response.data);
          const taskData = response.data;
          setItems(taskData);
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
        });
    } else {
      console.log('ERROR');
    }

    // Fetch orders data
    axios.get(`http://localhost:4000/getsellerorders/${user.id}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings: ', error);
      });
  }, []);

  const totalItems = items.length;
  const totalOrders = orders.length;

  // Define data for the bar chart
  const data = [
    { name: 'Items', value: totalItems, fill: '#667eea' }, 
    { name: 'Orders', value: totalOrders, fill: '#764ba2' }, 
  ];

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
            📊 Seller Dashboard
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            Manage your books and track your sales
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '2rem',
          padding: '3rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <Link to="/myproducts" style={{ textDecoration: 'none' }}>
              <div style={{
                width: '250px',
                height: '150px',
                background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                borderRadius: '1.5rem',
                boxShadow: '0 8px 32px rgba(76, 175, 80, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#ffffff',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 12px 40px rgba(76, 175, 80, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 32px rgba(76, 175, 80, 0.3)';
              }}>
                📚 Books <br /> <br /> {totalItems}
              </div>
            </Link>

            <Link to="/orders" style={{ textDecoration: 'none' }}>
              <div style={{
                width: '250px',
                height: '150px',
                background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
                borderRadius: '1.5rem',
                boxShadow: '0 8px 32px rgba(255, 152, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#ffffff',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 12px 40px rgba(255, 152, 0, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 32px rgba(255, 152, 0, 0.3)';
              }}>
                📦 Total Orders <br /> <br /> {totalOrders}
              </div>
            </Link>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '1.5rem',
            padding: '2rem'
          }}>
            <BarChart width={500} height={300} data={data}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#ffffff', fontSize: 14 }}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
              />
              <YAxis 
                tick={{ fill: '#ffffff', fontSize: 14 }}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
              />
              <Tooltip 
                contentStyle={{
                  background: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '1rem',
                  color: '#ffffff'
                }}
              />
              <Legend 
                wrapperStyle={{ color: '#ffffff' }}
              />
              <Bar 
                dataKey="value" 
                fill="#8884d8" 
                barSize={60}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Shome;
