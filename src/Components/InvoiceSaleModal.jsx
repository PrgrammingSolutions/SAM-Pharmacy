import React from "react";
import { X } from "lucide-react";

const InvoiceSaleModal = ({ open, onClose, sale }) => {
  if (!open || !sale) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ml-[240px]">
      <div className="bg-white px-8 py-6 rounded-2xl w-[50%] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-600 hover:text-gray-900"
        >
          <X size={20} />
        </button>
        
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
        <div className="flex w-full mt-6 overflow-hidden rounded-lg border border-gray-300 shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-xs font-semibold text-center bg-gray-200 border-b">
                <th className="py-3 px-4">Medicine</th>
                <th className="py-3 px-4">Qty</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {sale.details && sale.details.length > 0 ? (
                sale.details.map((med, index) => (
                  <tr key={index} className="text-center border-b transition">
                    <td className="py-3 px-4 text-gray-700">{med.medicine_name || "N/A"}</td>
                    <td className="py-3 px-4 text-gray-700">{med.quantity || 0}</td>
                    <td className="py-3 px-4 text-gray-700">{med.unit_price || "0.00"}</td>
                    <td className="py-3 px-4 text-gray-700">{med.total_price || "0.00"}</td>
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


// import React, { useRef } from "react";
// import { X } from "lucide-react";
// import { useReactToPrint } from "react-to-print";

// const InvoiceSaleModal = ({ open, onClose, sale }) => {
//   const printRef = useRef(); 
//   if (!open || !sale) return null;

//   const handlePrint = useReactToPrint({
//     content: () => printRef.current,
//     documentTitle: `Invoice_${sale.id}`,
//   });

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ml-[240px]">
//       <div className="bg-white px-8 py-6 rounded-2xl w-[50%] shadow-lg relative">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 p-1 text-gray-600 hover:text-gray-900"
//         >
//           <X size={20} />
//         </button>

//         {/* Invoice Content */}
//         <div ref={printRef} className="p-4">
//           <h1 className="text-center font-semibold text-gray-800 text-xl">Sale Invoice</h1>
//           <h2 className="text-primary font-bold text-lg mt-4">{sale.customer_name || "N/A"}</h2>
          
//           <div className="flex flex-col mt-1 gap-1">
//             <h1 className="font-bold text-gray-700 text-sm">
//               Invoice No : <span className="font-normal">{sale.id || "N/A"}</span>
//             </h1>
//             <h1 className="font-bold text-gray-700 text-sm">
//               Invoice Date : <span className="font-normal">{new Date(sale.date).toLocaleDateString()}</span>
//             </h1>
//           </div>

//           {/* Table */}
//           <div className="flex w-full mt-6 overflow-hidden rounded-lg border border-gray-300 shadow-md">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="text-xs font-semibold text-center bg-gray-200 border-b">
//                   <th className="py-3 px-4">Medicine</th>
//                   <th className="py-3 px-4">Qty</th>
//                   <th className="py-3 px-4">Price</th>
//                   <th className="py-3 px-4">Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sale.details && sale.details.length > 0 ? (
//                   sale.details.map((med, index) => (
//                     <tr key={index} className="text-center border-b transition">
//                       <td className="py-3 px-4 text-gray-700">{med.medicine_name || "N/A"}</td>
//                       <td className="py-3 px-4 text-gray-700">{med.quantity || 0}</td>
//                       <td className="py-3 px-4 text-gray-700">{med.unit_price || "0.00"}</td>
//                       <td className="py-3 px-4 text-gray-700">{med.total_price || "0.00"}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="text-center text-gray-500 py-4">No medicines found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Total Section */}
//           <div className="flex flex-col justify-end items-end mt-10 gap-1">
//             <h1 className="font-bold text-gray-700 text-sm">
//               Sub Total : <span className="font-normal">{sale.amount || "0.00"}</span>
//             </h1>
//             <h1 className="font-bold text-gray-700 text-sm">
//               Discount : <span className="font-normal">0</span>
//             </h1>
//             <h1 className="font-bold text-gray-700 text-sm">
//               Total Amount : <span className="font-normal">{sale.amount || "0.00"}</span>
//             </h1>
//           </div>
//         </div>

//         {/* Print Button */}
//         <div className="flex justify-center mt-6">
//           <button
//             onClick={handlePrint}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//           >
//             Print Invoice
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoiceSaleModal;
