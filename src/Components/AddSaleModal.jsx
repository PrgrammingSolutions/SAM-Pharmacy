import React, { useState } from "react";

const AddSaleModal = ({ isOpen, onClose, onSave }) => {
  const [purchaseData, setPurchaseData] = useState({
    itemCode: "",
    description: "",
    packing: "",
    quantity: "",
    discount: "",
    discountAmount: "",
    netAmount: ""
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
          Add New Sale
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
            name="description"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Description"
          />

          <input
            type="number"
            name="paking"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Packing"
          />
          <input
            type="number"
            name="quantity"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Quantity"
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
            name="discountAmount"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Discount Amount"
          />
          <input
            type="number"
            name="netAmount"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Net Amount"
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

export default AddSaleModal;
