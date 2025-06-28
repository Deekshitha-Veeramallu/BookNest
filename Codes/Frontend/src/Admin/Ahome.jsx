import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';

function Ahome() {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch user data
    axios.get(`http://localhost:4000/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users: ', error);
      });

    // Fetch vendors data
    axios.get(`http://localhost:4000/sellers`)
      .then((response) => {
        setVendors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching vendors: ', error);
      });

    // Fetch items data
    axios.get(`http://localhost:4000/item`)
      .then((response) => {
        setItems(response.data);
        console.log(items);
      })
      .catch((error) => {
        console.error('Error fetching items: ', error);
      });

    // Fetch orders data
    axios.get(`http://localhost:4000/orders`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders: ', error);
      });
  }, []);

  const totalUsers = users.length;
  const totalvendors = vendors.length;
  const totalItems = items.length;
  const totalOrders = orders.length;

  // Define data for the bar chart
  const data = [
    { name: 'Users', value: totalUsers, fill: '#667eea' }, 
    { name: 'Vendors', value: totalvendors, fill: '#764ba2' },
    { name: 'Items', value: totalItems, fill: '#4CAF50' }, 
    { name: 'Orders', value: totalOrders, fill: '#FF9800' }, 
  ];

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
            🏢 Admin Dashboard
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            Monitor and manage your bookstore platform
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
            <Link to="/users" style={{ textDecoration: 'none' }}>
              <div style={{
                width: '200px',
                height: '120px',
                background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                borderRadius: '1.5rem',
                boxShadow: '0 8px 32px rgba(244, 67, 54, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#ffffff',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 12px 40px rgba(244, 67, 54, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 32px rgba(244, 67, 54, 0.3)';
              }}>
                👥 Users <br /> <br /> {totalUsers}
              </div>
            </Link>

            <Link to="/sellers" style={{ textDecoration: 'none' }}>
              <div style={{
                width: '200px',
                height: '120px',
                background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                borderRadius: '1.5rem',
                boxShadow: '0 8px 32px rgba(33, 150, 243, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#ffffff',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 12px 40px rgba(33, 150, 243, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 32px rgba(33, 150, 243, 0.3)';
              }}>
                🏪 Vendors <br /> <br /> {totalvendors}
              </div>
            </Link>

            <Link to="/items" style={{ textDecoration: 'none' }}>
              <div style={{
                width: '200px',
                height: '120px',
                background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
                borderRadius: '1.5rem',
                boxShadow: '0 8px 32px rgba(76, 175, 80, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#ffffff',
                fontSize: '1.2rem',
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
                📚 Items <br /> <br /> {totalItems}
              </div>
            </Link>

            <Link to="/users" style={{ textDecoration: 'none' }}>
              <div style={{
                width: '200px',
                height: '120px',
                background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
                borderRadius: '1.5rem',
                boxShadow: '0 8px 32px rgba(255, 152, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#ffffff',
                fontSize: '1.2rem',
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
                📦 Orders <br /> <br /> {totalOrders}
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
            <BarChart width={600} height={300} data={data}>
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
                barSize={50}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ahome;
