import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Body from './components/Body.js';


const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppLayout />);
