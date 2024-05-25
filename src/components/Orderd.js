// FoodAppPage.js
import React from "react";

const OrderdPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen  flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg py-4 ">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl  justify-center items-center font-semibold text-gray-800">Singh Food Delivery </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="  flex-col justify-center items-center container mx-auto px-4 py-8 flex">
        {/* Featured Dishes */}
        <div className="w-full  mr-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Dishes</h2>
          {/* Display featured dishes here */}
        </div>
        
        {/* Order Details */}
        <div className="w-1/3">
          <div className="bg-white shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Order Details</h2>
            <div className="mb-4">
              <p className="text-gray-700 mb-1">Estimated Delivery Time:</p>
              <p className="text-lg font-semibold">30 minutes</p>
            </div>
            <div>
              <p className="text-gray-700 mb-1">Total Cost:</p>
              <p className="text-lg font-semibold">RS.25</p>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default OrderdPage;
