import React, { useState } from 'react';
import { Search, ShoppingBag, User, Home, Star, Bell, MapPin, Filter } from 'lucide-react';

const Home2 = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  
  // Dummy data - replace with your backend API calls
  const categories = [
    { id: 1, name: 'Pizza', emoji: '🍕' },
    { id: 2, name: 'Burger', emoji: '🍔' },
    { id: 3, name: 'Sushi', emoji: '🍣' },
    { id: 4, name: 'Pasta', emoji: '🍝' },
    { id: 5, name: 'Salad', emoji: '🥗' },
    { id: 6, name: 'Dessert', emoji: '🍰' },
    { id: 7, name: 'Coffee', emoji: '☕' },
    { id: 8, name: 'Asian', emoji: '🥡' },
  ];

  const restaurants = [
    {
      id: 1,
      name: 'Burger King',
      emoji: '🍔',
      rating: 4.5,
      deliveryTime: '25-30 min',
      deliveryFee: 'Free',
      cuisine: 'Fast Food',
      distance: '1.2 km'
    },
    {
      id: 2,
      name: 'Domino\'s Pizza',
      emoji: '🍕',
      rating: 4.2,
      deliveryTime: '20-25 min',
      deliveryFee: '$2',
      cuisine: 'Pizza',
      distance: '0.8 km'
    },
    {
      id: 3,
      name: 'Subway',
      emoji: '🥪',
      rating: 4.3,
      deliveryTime: '15-20 min',
      deliveryFee: 'Free',
      cuisine: 'Healthy',
      distance: '0.5 km'
    },
    {
      id: 4,
      name: 'Starbucks',
      emoji: '☕',
      rating: 4.4,
      deliveryTime: '10-15 min',
      deliveryFee: '$1.5',
      cuisine: 'Coffee',
      distance: '2.1 km'
    },
    {
      id: 5,
      name: 'Sushi Express',
      emoji: '🍣',
      rating: 4.6,
      deliveryTime: '30-35 min',
      deliveryFee: 'Free',
      cuisine: 'Japanese',
      distance: '1.8 km'
    },
    {
      id: 6,
      name: 'Taco Bell',
      emoji: '🌮',
      rating: 4.1,
      deliveryTime: '20-25 min',
      deliveryFee: '$2.5',
      cuisine: 'Mexican',
      distance: '1.5 km'
    }
  ];

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      width: '100%',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>


      {/* Main Content */}
      <div style={{
        width: '100%',
        padding: '40px 60px'
      }}>
        {/* Hero Section */}
        <div style={{
          marginBottom: '60px',
          textAlign: 'center'
        }}>
          <div>
            <h2 style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#1e293b',
              margin: '0 0 24px 0',
              lineHeight: '1.1'
            }}>Hi! 👋</h2>
            <p style={{
              fontSize: '24px',
              color: '#6b7280',
              margin: '0 0 40px 0',
              lineHeight: '1.6',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>What do you want to eat today? Discover the best restaurants and food delivery in your area.</p>
            
            {/* Search Bar */}
            <div style={{
              position: 'relative',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <div style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}>
                <Search size={24} />
              </div>
              <input
                type="text"
                placeholder="Search for food, restaurants, or cuisine..."
                style={{
                  width: '100%',
                  padding: '20px 20px 20px 60px',
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  border: '2px solid #e5e7eb',
                  outline: 'none',
                  fontSize: '18px',
                  color: '#374151',
                  boxSizing: 'border-box',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
                }}
              />
              <button style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: '#1e293b',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: '80px' }}>
          <h3 style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#1e293b',
            margin: '0 0 40px 0',
            textAlign: 'center'
          }}>Browse Categories</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '24px',
            width: '100%'
          }}>
            {categories.map((category, index) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(index)}
                style={{
                  backgroundColor: selectedCategory === index ? '#1e293b' : 'white',
                  borderRadius: '20px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  border: '2px solid',
                  borderColor: selectedCategory === index ? '#1e293b' : '#e5e7eb',
                  boxShadow: selectedCategory === index ? '0 8px 25px rgba(30, 41, 59, 0.15)' : '0 2px 8px rgba(0,0,0,0.05)',
                  transform: selectedCategory === index ? 'translateY(-2px)' : 'translateY(0)'
                }}
              >
                <div style={{
                  fontSize: '40px',
                  marginBottom: '12px'
                }}>{category.emoji}</div>
                <span style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: selectedCategory === index ? 'white' : '#374151'
                }}>{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurants */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '40px'
          }}>
            <h3 style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#1e293b',
              margin: '0',
              textAlign: 'center'
            }}>Popular Restaurants</h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '28px',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                border: '1px solid #f3f4f6',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '20px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '20px',
                    flexShrink: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #e5e7eb'
                  }}>
                    <span style={{ fontSize: '48px' }}>{restaurant.emoji}</span>
                  </div>
                  <div style={{ flex: '1' }}>
                    <h4 style={{
                      fontWeight: '600',
                      color: '#1e293b',
                      margin: '0 0 8px 0',
                      fontSize: '22px'
                    }}>{restaurant.name}</h4>
                    <p style={{
                      color: '#6b7280',
                      margin: '0 0 12px 0',
                      fontSize: '16px'
                    }}>{restaurant.cuisine}</p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '16px',
                      color: '#6b7280'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={16} style={{ fill: '#fbbf24', color: '#fbbf24' }} />
                        <span>{restaurant.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{restaurant.deliveryTime}</span>
                      <span>•</span>
                      <span>{restaurant.distance}</span>
                    </div>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: restaurant.deliveryFee === 'Free' ? '#10b981' : '#6b7280'
                  }}>
                    Delivery: {restaurant.deliveryFee}
                  </span>
                  <button style={{
                    backgroundColor: '#1e293b',
                    color: 'white',
                    padding: '16px 28px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0f172a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1e293b';
                  }}>
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home2;