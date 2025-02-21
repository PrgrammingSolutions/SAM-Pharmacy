import React, { useState } from "react";

const AddMedicineModal = ({ isOpen, onClose, onSave }) => {
  const [data, setData] = useState({
    medicine_name: "",
    item_code: "",
    batch_no: "",
    weight: "",
    box_quantity: "",
    unit_price: 0.00,
    pack_quantity: "",
  });

  const [isPlaceholder, setIsPlaceholder] = useState(true);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(data);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ml-[240px]"
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
          Add New Medicine
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="medicine_name"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Medicine Name"
          />
          <input
            type="text"
            name="item_code"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Item Code"
          />

          <input
            type="number"
            name="batch_no"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Batch No"
          />
          <input
            type="number"
            name="weight"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Weight"
          />
          <input
            type="number"
            name="box_quantity"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Box Quantity"
          />

          <input
            type="number"
            name="pack_quantity"
            onChange={handleChange}
            className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Pack Quantity"
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

export default AddMedicineModal;
