import React from "react";
import { X } from "lucide-react";

const InvoiceSaleModal = ({ open, onClose, sale }) => {
  const receiptRef = useRef(null);

  if (!open || !sale) return null;

  const handlePrint = () => {
    const receiptContent = receiptRef.current
      ? receiptRef.current.innerHTML.replace(/undefined|null|blank/g, "")
      : "";
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
      <head>
        <style>
          body { font-family: calibri, sans-serif; font-size: 12px; margin: 0 auto; padding: 0;}
          .receipt-container { width: 300px; margin: 0 auto; padding: 5px;}
          table { width: 100%; border-collapse: collapse; }
          th, td { text-align: left; padding: 4px; }
          th { border-bottom: 1px solid #000; }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        ${receiptContent}
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ml-[240px]">
      <div
        className="bg-white px-8 py-6 rounded-2xl w-[50%] shadow-lg relative"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✖
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
              <tr className="text-xs font-semibold text-center border-b">
                <th className="text-start py-2 w-[3%]">Medicine</th>
                <th className="py-2 w-[1%]">Qty</th>
                <th className="py-2 w-[3%]">Price</th>
                <th className="py-2 w-[3%]">Amount</th>
              </tr>
            </thead>
            <tbody>
              {sale.details && sale.details.length > 0 ? (
                sale.details.map((med, index) => (
                  <tr key={index} className="text-center">
                    <td className="text-start border-b-2 py-2 text-gray-700 text-sm">{med.medicine_name || "N/A"}</td>
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

        <div className="flex content-center justify-center self-center mt-5">
          <button
            onClick={handlePrint}
            className="mt-5 bg-[#00A95B] text-white px-4 py-2 rounded-md hover:bg-[#00a941]"
          >
            Print Invoice
          </button>
        </div>
        <div ref={receiptRef} className="hidden">
          <div className="receipt-container w-[3in] font-calibri text-[10px]">
            <div className="flex justify-center items-center w-full">
              <h2 className="text-lg font-bold text-center">
                Said Ahmed Memorial Pharmacy
              </h2>
            </div>
            <h3 className="text-lg">Invoice # {sale.id || "N/A"}</h3>
            <p className="text-sm">
              <strong>Patient:</strong> {sale.customer_name || "N/A"}
            </p>
            <p className="text-sm">
              <strong>Date: </strong>
              {new Date(sale.date).toLocaleDateString() || "N/A"}
            </p>
            <hr className="my-2 border-gray-300" />
            <table className="w-full text-sm border-collapse table-fixed">
              <thead>
                <tr>
                  <th className="text-left text-sm">Name</th>
                  <th className="text-left text-sm">Qty</th>
                  <th className="text-right text-sm">Price</th>
                  <th className="text-right text-sm">Amount</th>
                </tr>
              </thead>
              <tbody>
                {sale.details?.map((row, index) => (
                  <tr key={index}>
                    <td className="text-sm">{row.medicine_name || "N/A"}</td>
                    <td className="text-sm">{row.quantity || "0"}</td>
                    <td className="text-right text-sm">
                      {row.unit_price || "0.00"}
                    </td>
                    <td className="text-right text-sm">
                      {row.total_price || "0.00"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr className="my-2 border-gray-300" />
            <div className="w-full text-right">
              <h2 className="text-2xl font-bold">
                Total: {sale.amount || "0.00"}
              </h2>
              <p className="text-sm">Thank you for Your Purchase!</p>
            </div>
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
