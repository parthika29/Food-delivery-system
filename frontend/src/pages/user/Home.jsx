import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const navigate = useNavigate();

  const steamStyle = {
    width: '4px',
    height: '32px',
    background: 'linear-gradient(180deg, white 0%, transparent 100%)',
    opacity: 0.3,
    borderRadius: '2px',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  };

  const steamStyle2 = {
    ...steamStyle,
    height: '24px',
    opacity: 0.2,
    position: 'absolute',
    left: '8px',
    top: '8px',
    animationDelay: '75ms'
  };

  const steamStyle3 = {
    ...steamStyle,
    height: '16px',
    opacity: 0.25,
    position: 'absolute',
    left: '-8px',
    top: '4px',
    animationDelay: '150ms'
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse-delay-100 {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 100ms;
        }
        .animate-pulse-delay-200 {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 200ms;
        }
        .animate-pulse-delay-300 {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 300ms;
        }
        .animate-pulse-delay-400 {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 400ms;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        margin: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '384px',
          backgroundColor: '#1e293b',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          

          {/* Main Content */}
          <div style={{ padding: '32px 32px 48px' }}>
            {/* Food Image */}
            <div style={{ position: 'relative', marginBottom: '32px' }}>
              <div style={{
                width: '100%',
                height: '256px',
                background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1000&q=80"
                  alt="Delicious Burger"
                  style={{
                    width: '192px',
                    height: '192px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    border: '4px solid rgba(251, 146, 60, 0.3)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%)',
                  borderRadius: '16px'
                }}></div>
                <div style={{
                  position: 'absolute',
                  top: '32px',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}>
                  <div style={steamStyle}></div>
                  <div style={steamStyle2}></div>
                  <div style={steamStyle3}></div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{
                color: 'white',
                fontSize: '32px',
                fontWeight: 300,
                lineHeight: 1.4,
                margin: '0 0 8px 0'
              }}>
                Foodie : Where Hunger Meets Happiness.
              </h1>
            </div>

            {/* Login Button */}
            <div style={{ marginBottom: '24px' }}>
              <button
                style={{
                  width: '100%',
                  backgroundColor: isHoveringButton ? '#4b5563' : '#374151',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '16px',
                  fontWeight: 500,
                  fontSize: '18px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={() => setIsHoveringButton(true)}
                onMouseLeave={() => setIsHoveringButton(false)}

                onClick={() => navigate('/auth/login')}
              >
                Login
              </button>
            </div>

            {/* Create Account Link */}
            <div style={{ textAlign: 'center' }}>
              <span
                style={{
                  color: isHoveringLink ? '#cbd5e1' : '#94a3b8',
                  fontSize: '14px',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={() => setIsHoveringLink(true)}
                onMouseLeave={() => setIsHoveringLink(false)}
                onClick={() => navigate('/auth/register')}
              >
                Create Account
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}