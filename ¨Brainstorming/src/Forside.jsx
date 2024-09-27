import React from 'react';

const BrainstormingPage = ({ onButtonClick }) => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Storm IT</h1>
        <p style={styles.subtitle}>Unleash your creativity</p>
      </header>

      <main style={styles.mainContent}>
        <div style={styles.brainstormBox}>
          <p style={styles.boxText}>Let's brainstorm your next big idea!</p>
          <button style={styles.button} onClick={onButtonClick}>Lets go</button>
        </div>
        <div style={styles.creativeShapes}>
          <div style={styles.circle}></div>
          <div style={styles.square}></div>
          <div style={styles.triangle}></div>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>Powered by your imagination</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: '#3b82f6',
    width: '100%',
    padding: '20px',
    textAlign: 'center',
    color: 'white',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '3rem',
    margin: 0,
  },
  subtitle: {
    fontSize: '1.2rem',
    margin: '10px 0 0',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  brainstormBox: {
    width: '80%',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    padding: '40px',
    marginBottom: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  boxText: {
    fontSize: '1.5rem',
    color: '#333',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  creativeShapes: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px',
  },
  circle: {
    width: '100px',
    height: '100px',
    backgroundColor: '#34d399',
    borderRadius: '50%',
  },
  square: {
    width: '100px',
    height: '100px',
    backgroundColor: '#fbbf24',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeft: '50px solid transparent',
    borderRight: '50px solid transparent',
    borderBottom: '100px solid #f87171',
  },
  footer: {
    backgroundColor: '#1f2937',
    color: 'white',
    width: '100%',
    textAlign: 'center',
    padding: '10px 0',
  },
};

export default BrainstormingPage;
