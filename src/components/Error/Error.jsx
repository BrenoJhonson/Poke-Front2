import React from 'react';

function Error({ message = "Algo deu errado!", onRetry }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#fee',
      border: '1px solid #fcc',
      borderRadius: '8px',
      margin: '1rem'
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😞</div>
      <h3 style={{ color: '#c33', marginBottom: '0.5rem' }}>Ops!</h3>
      <p style={{ color: '#c33', marginBottom: '1rem' }}>{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          style={{
            backgroundColor: '#c33',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Tentar Novamente
        </button>
      )}
    </div>
  );
}

export default Error;
