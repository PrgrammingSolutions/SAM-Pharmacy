import React from "react";

const InvoiceSaleModal = ({ open, onClose, sale }) => {
  if (!open || !sale) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ml-[240px]"
    >
      <div
        className="bg-white px-8 py-6 rounded-2xl w-[50%] shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
      >
        <h1 className="text-center font-semibold text-gray-800 text-xl">Sale Invoice</h1>
        <h2 className="text-primary font-bold text-lg mt-4">{sale.customer_name || "N/A"}</h2>
        <div className="flex flex-col mt-1 gap-1">
          <h1 className="font-bold text-gray-700 text-sm">
            Invoice No : <span className="font-normal">{sale.id || "N/A"}</span>
          </h1>
          <h1 className="font-bold text-gray-700 text-sm">
            Invoice Date : <span className="font-normal">{new Date(sale.date).toLocaleDateString()}</span>
          </h1>
        </div>
        <div className="flex w-full mt-8">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold text-center border-b">
                <th className="py-2 w-[3%]">Medicine</th>
                <th className="py-2 w-[1%]">Qty</th>
                <th className="py-2 w-[3%]">Price</th>
                <th className="py-2 w-[3%]">Total</th>
              </tr>
            </thead>
            <tbody>
              {sale.details && sale.details.length > 0 ? (
                sale.details.map((med, index) => (
                  <tr key={index} className="text-center">
                    <td className="border-b-2 py-2 text-gray-700 text-sm">{med.medicine_name || "N/A"}</td>
                    <td className="border-b-2 py-2 text-gray-700 text-sm">{med.quantity || 0}</td>
                    <td className="border-b-2 py-2 text-gray-700 text-sm">{med.unit_price || "0.00"}</td>
                    <td className="border-b-2 py-2 text-gray-700 text-sm">{med.total_price || "0.00"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No medicines found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col justify-end items-end mt-10 gap-1">
          <div>
            <h1 className="font-bold text-gray-700 text-sm">
              Sub Total : <span className="font-normal">{sale.amount || "0.00"}</span>
            </h1>
            <h1 className="font-bold text-gray-700 text-sm">
              Discount : <span className="font-normal">0</span>
            </h1>
            <h1 className="font-bold text-gray-700 text-sm">
              Total Amount : <span className="font-normal">{sale.amount || "0.00"}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSaleModal;
