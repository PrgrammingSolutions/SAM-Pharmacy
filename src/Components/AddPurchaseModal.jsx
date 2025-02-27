import React, { useState } from "react";

const AddPurchaseModal = ({ isOpen, onClose, onSave }) => {
  const [purchaseData, setPurchaseData] = useState({
    itemCode: "",
    itemName: "",
    purchaseDate: "",
    batchNo: "",
    quantity: "",
    pack: "",
    box: "",
    unitPrice: "",
    packPrice: "",
    totalAmount: "",
  });

  const [isPlaceholder, setIsPlaceholder] = useState(true);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setPurchaseData({ ...purchaseData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(purchaseData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ml-[240px]"
      onClick={onClose}
    >
      <div
        className="bg-white px-8 py-6 rounded-2xl w-[70%] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="font-semibold text-md bg-red-600 px-[7px] rounded-full text-white"
          >
            ×
          </button>
        </div>

        <h2 className="text-lg text-center font-bold text-primary mb-4">
          Add New Purchase
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            name="itemCode"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Item Code"
          />
          <input
            type="text"
            name="itemName"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Item Name"
          />
          
          {/* 📅 Custom Date Input */}
          <div className="relative">
            <input
              type="date"
              name="purchaseDate"
              value={purchaseData.purchaseDate}
              onChange={handleChange}
              onFocus={() => setIsPlaceholder(false)}
              onBlur={() => setIsPlaceholder(purchaseData.purchaseDate === "")}
              className={`bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary w-full ${
                isPlaceholder ? "text-gray-50" : "text-black"
              }`}
            />
            {isPlaceholder && (
              <span className="absolute left-3 top-2 text-gray-400 text-sm pointer-events-none">
                Expiry Date
              </span>
            )}
          </div>

          <input
            type="text"
            name="batchNo"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Batch No."
          />
          <input
            type="number"
            name="quantity"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Quantity"
          />
          <input
            type="text"
            name="pack"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Pack"
          />

          <input
            type="text"
            name="box"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Box"
          />
          <input
            type="number"
            name="unitPrice"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Unit Price"
          />
          <input
            type="number"
            name="salePricePerUnit"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Sale Price Per Unit"
          />
          <input
            type="number"
            name="packPrice"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Pack Price"
          />
          <input
            type="number"
            name="discount"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Discount"
          />
          <input
            type="number"
            name="totalAmount"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Total Amount"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSave}
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
