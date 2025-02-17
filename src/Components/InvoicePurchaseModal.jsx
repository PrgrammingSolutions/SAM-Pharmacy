import React from "react";

const InvoicePurchaseModal = ({ open, onClose }) => {
   if(!open) return false
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ml-[240px]"
      onClick={onClose}
    >
      <div
        className="bg-white px-8 py-6 rounded-2xl w-[50%] shadow-lg"
      > 
      <h1 className="text-center font-semibold text-gray-800 text-xl">Purchase Invoice</h1>
      <h2 className="text-primary font-bold text-lg mt-4">Company Name</h2>
      <div className="flex justify-between items-center mt-2">
        <h1 className="font-bold text-gray-700 text-sm">From : <span className="font-normal">Pharmacueticals</span></h1>
        <h1 className="font-bold text-gray-700 text-sm">Bill To : <span className="font-normal">Pharma Co.</span></h1>
      </div>
      <div className="flex flex-col mt-1 gap-1">
        <h1 className="font-bold text-gray-700 text-sm">Invoice No : <span className="font-normal">143543-453-34</span></h1>
        <h1 className="font-bold text-gray-700 text-sm">Invoice Date : <span className="font-normal">25/14/02</span></h1>
      </div>
      <div className="flex w-full mt-8">
        <table className="w-full">
          <thead>
            <tr className="text-xs font-semibold text-center border-b">
              <th className="py-2 w-[3%]">Medicine</th>
              <th className="py-2 w-[1%]">Qty</th>
              <th className="py-2 w-[3%]">Price</th>
              <th className="py-2 w-[3%]">Disc Price</th>
              <th className="py-2 w-[3%]">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border-b-2 py-2 text-gray-700 text-sm">234710</td>
              <td className="border-b-2 py-2 text-gray-700 text-sm">Paracetamol</td>
              <td className="border-b-2 py-2 text-gray-700 text-sm">4354322</td>
              <td className="border-b-2 py-2 text-gray-700 text-sm">5</td>
              <td className="border-b-2 py-2 text-gray-700 text-sm">$5000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col justify-end items-end mt-10 gap-1">
        <div>
          <h1 className="font-bold text-gray-700 text-sm">Sub Total : <span className="font-normal">5000</span></h1>
          <h1 className="font-bold text-gray-700 text-sm">Discount : <span className="font-normal">225</span></h1>
          <h1 className="font-bold text-gray-700 text-sm">Total Amount : <span className="font-normal">4775</span></h1>
          <h1 className="font-bold text-gray-700 text-sm">Paid Amount : <span className="font-normal">4775</span></h1>
          </div>
      </div>
      </div>
    </div>
  );
};

export default InvoicePurchaseModal;
