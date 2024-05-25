import Header from './Header.js';
import Footer from './Footer.js';

import React from 'react';

const OfferPage = () => {
  // Dummy data for offers
  const offers = [
    { id: 1, title: "Flat 20% Off", code: "SWIGGY20" },
    { id: 2, title: "Get 50% Cashback", code: "CASH50" },
    { id: 4, title: "Get 70% Cashback", code: "CASH70" },
    { id: 3, title: "Combo Offer: Buy 1 Get 1 Free", code: "BOGO" },
    // Add more offers as needed
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Exclusive Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">{offer.title}</h2>
            <p className="text-gray-600 mb-4">Use code: <span className="font-bold">{offer.code}</span></p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Apply Code</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferPage;