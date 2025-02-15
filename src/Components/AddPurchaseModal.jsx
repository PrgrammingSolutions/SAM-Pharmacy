import React from 'react';

const AddPurchaseModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ml-[240px]"
      onClick={onClose} // Click outside to close
    >
      <div 
        className="bg-white px-8 py-6 rounded-2xl w-[70%] shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button 
            onClick={onClose} 
            className="font-semibold text-md bg-red-600 px-[7px] rounded-full text-white"
          >
            ×
          </button>
        </div>  

        {/* Modal Title */}
        <h2 className="text-lg text-center font-bold text-primary mb-4">
          Add New Purchase
        </h2>

        {/* Form Fields */}
        <div className="grid grid-cols-3 gap-4">
          <input type="number" className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary" placeholder="Item Code" />
          <input type="text" className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary" placeholder="Item Name" />
          <input type="date" className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary" placeholder="Expiry Date" />
          
          <input type="text" className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary" placeholder="Batch No." />
          <input type="number" className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary" placeholder="Quantity" />
          <input type="text" className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary" placeholder="Pack" />
          
          <input type="text" className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary" placeholder="Box" />
          <input type="number" className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary" placeholder="Unit Price" />
          <input type="number" className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary" placeholder="Pack Price" />
          
          <input type="number" className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary" placeholder="Total Amount" />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button 
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPurchaseModal;
