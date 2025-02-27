// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import purchaseService from "../../Services/purchaseService";
// import productService from "../../Services/productService";

// const PurchaseView = () => {
//     const [loading, setLoading] = useState(false);
//     const [order, setOrder] = useState(null);
//     const [totalPurchase, setTotalPurchase] = useState(0);
//     const [totalSale, setTotalSale] = useState(0);
//     const [medicines, setMedicines] = useState(0);
//     const { id } = useParams();
//     const location = useLocation();
//     const { company, name } = location.state || {};


//     useEffect(() => {
//         const getMedicines = async () => {
//           try {
//             setLoading(true);
//             const response = await productService.fetchAll();
//             console.log(response);
//             setMedicines(response.products);
//             setLoading(false);
//           } catch (error) {
//             setLoading(false);
//             toast.error("Error fetching Purhases");
//           }
//         };
//         getMedicines();
//       }, []);

//     useEffect(() => {
//         const fetchPurchaseById = async () => {
//             if (!id) {
//                 toast.error("No ID provided in the URL");
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const response = await purchaseService.fetchById(id);
//                 console.log(response);
                
//                 if (response?.purchase) {
//                     setOrder(response.purchase);
                    
//                     let tp = 0;
//                     let ts = 0;
//                     response.purchase.details.forEach(detail => {
//                         tp += detail.total_price;
//                         ts += detail.sale_price * detail.quantity;
//                     });

//                     setTotalPurchase(tp);
//                     setTotalSale(ts);
//                 }
//             } catch (error) {
//                 toast.error("Error fetching purchase data");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPurchaseById();
//     }, [id]);

//     return (
//         <div className="my-10 mx-10 lg:mx-16">
//             {loading ? (
//                 <div className="text-center text-xl">Loading...</div>
//             ) : order ? (
//                 <div>
//                     <div className="flex flex-row justify-between border-b-2 border-gray-300">
//                         <div className="flex flex-row items-center">
//                             <h1 className="font-bold text-2xl text-primary animate__animated animate__fadeInLeft">
//                                 {order.invoice}
//                             </h1>
//                             <p className="ml-5">
//                                 <span className="bg-blue-600 px-4 py-[1px] rounded-md text-white text-[10px]">
//                                     {order.order_type}
//                                 </span>
//                             </p>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-4 w-full mt-4">
//                         <p className="flex flex-col font-semibold text-sm text-green-600">
//                             Order Created At:
//                             <span className="text-gray-500 font-medium">
//                                 {moment(order.created_at).format("LL")}
//                             </span>
//                         </p>
//                         <p className="flex flex-col font-semibold text-sm text-green-600">
//                             Order Date:
//                             <span className="text-gray-500 font-medium">
//                                 {moment(order.purchase_date).format("LL")}
//                             </span>
//                         </p>
                        
//                     </div>

//                     <h1 className="font-bold text-lg mt-8">Supplier Details</h1>
//                     <div className="flex justify-between">
//                         <div className="flex flex-row gap-8 mt-2">
//                             <div>
//                                 <span className="block leading-none font-semibold">Company Name</span>
//                                 <span className="text-sm leading-none font-medium text-gray-500">{company}</span>
//                             </div>
//                             <div>
//                                 <span className="block leading-none font-semibold">Salesman Name</span>
//                                 <span className="text-sm leading-none font-medium text-gray-500">{name}</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="mt-2">
//                         <div className="bg-white rounded-xl">
//                             <div className="text-center pt-5 font-bold text-xl">Purchase Order Details</div>
//                             <div className="px-4 py-2">
//                                 <table className="w-full border-collapse rounded-lg overflow-hidden shadow-xl shadow-gray-300">
//                                     <thead>
//                                         <tr className="uppercase w-full text-white bg-primary">
//                                             <th className="py-2 border-b-2 text-left pl-4">Id</th>
//                                             <th className="py-2 border-b-2 text-left pl-4">Quantity</th>
//                                             <th className="py-2 border-b-2 text-left pl-4">Unit Price</th>
//                                             <th className="py-2 border-b-2 text-left pl-4">Batch No.</th>
//                                             <th className="py-2 border-b-2 text-left pl-4">Sale Price</th>
//                                             <th className="py-2 border-b-2 text-left pl-4">Expiry Date</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {order.details?.map((detail, index) => (
//                                             <tr key={index} className="bg-gray-100 text-left text-sm">
//                                                 <td className="pl-4 py-2">{detail.id}</td>
//                                                 <td className="pl-4 py-2">{detail.quantity}</td>
//                                                 <td className="pl-4 py-2 font-bold">{detail.unit_price}</td>
//                                                 <td className="pl-4 py-2">{detail.batch_no}</td>
//                                                 <td className="pl-4 py-2">RS {detail.sale_price}</td>
//                                                 <td className="pl-4 py-2">{detail.expiry_date}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="mt-4 text-lg font-semibold">
//                         <p>Total Purchase Price: <span className="text-green-600">{totalPurchase} AED</span></p>
//                         <p>Total Sale Price: <span className="text-blue-600">{totalSale} AED</span></p>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="text-center text-4xl text-black">
//                     The Order you are looking for is currently unavailable
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PurchaseView;





import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import purchaseService from "../../Services/purchaseService";
import productService from "../../Services/productService";

const PurchaseView = () => {
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState(null);
    const [totalPurchase, setTotalPurchase] = useState(0);
    const [totalSale, setTotalSale] = useState(0);
    const [medicines, setMedicines] = useState([]); 
    const { id } = useParams();
    const location = useLocation();
    const { company, name } = location.state || {};

    useEffect(() => {
        const getMedicines = async () => {
            try {
                setLoading(true);
                const response = await productService.fetchAll();
                console.log("Fetched Medicines:", response);
                setMedicines(response.products); 
            } catch (error) {
                toast.error("Error fetching Medicines");
            } finally {
                setLoading(false);
            }
        };
        getMedicines();
    }, []);

    useEffect(() => {
        const fetchPurchaseById = async () => {
            if (!id) {
                toast.error("No ID provided in the URL");
                return;
            }
            try {
                setLoading(true);
                const response = await purchaseService.fetchById(id);
                console.log("Fetched Purchase Order:", response);

                if (response?.purchase) {
                    let tp = 0;
                    let ts = 0;

                    // Enrich details with medicine names
                    const updatedDetails = response.purchase.details.map(detail => {
                        const medicine = medicines.find(med => med.id === detail.medicine_id);
                        return { 
                            ...detail, 
                            medicine_name: medicine ? medicine.name : "Unknown" 
                        };
                    });

                    updatedDetails.forEach(detail => {
                        tp += detail.total_price;
                        ts += detail.sale_price * detail.quantity;
                    });

                    setOrder({ ...response.purchase, details: updatedDetails });
                    setTotalPurchase(tp);
                    setTotalSale(ts);
                }
            } catch (error) {
                toast.error("Error fetching purchase data");
            } finally {
                setLoading(false);
            }
        };

        if (medicines.length > 0) {
            fetchPurchaseById();
        }
    }, [id, medicines]);

    return (
        <div className="my-10 mx-10 lg:mx-16">
            {loading ? (
                <div className="text-center text-xl">Loading...</div>
            ) : order ? (
                <div>
                    <div className="flex flex-row justify-between border-b-2 border-gray-300">
                        <div className="flex flex-row items-center">
                            <h1 className="font-bold text-2xl text-primary animate__animated animate__fadeInLeft">
                                {order.invoice}
                            </h1>
                            <p className="ml-5">
                                <span className="bg-blue-600 px-4 py-[1px] rounded-md text-white text-[10px]">
                                    {order.order_type}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 w-full mt-4">
                        <p className="flex flex-col font-semibold text-sm text-green-600">
                            Order Created At:
                            <span className="text-gray-500 font-medium">
                                {moment(order.created_at).format("LL")}
                            </span>
                        </p>
                        <p className="flex flex-col font-semibold text-sm text-green-600">
                            Order Date:
                            <span className="text-gray-500 font-medium">
                                {moment(order.purchase_date).format("LL")}
                            </span>
                        </p>
                    </div>

                    <h1 className="font-bold text-lg mt-8">Supplier Details</h1>
                    <div className="flex justify-between">
                        <div className="flex flex-row gap-8 mt-2">
                            <div>
                                <span className="block leading-none font-semibold">Company Name</span>
                                <span className="text-sm leading-none font-medium text-gray-500">{company}</span>
                            </div>
                            <div>
                                <span className="block leading-none font-semibold">Salesman Name</span>
                                <span className="text-sm leading-none font-medium text-gray-500">{name}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2">
                        <div className="bg-white rounded-xl">
                            <div className="text-center pt-5 font-bold text-xl">Purchase Order Details</div>
                            <div className="px-4 py-2">
                                <table className="w-full border-collapse rounded-lg overflow-hidden shadow-xl shadow-gray-300">
                                    <thead>
                                        <tr className="uppercase w-full text-white bg-primary">
                                            <th className="py-2 border-b-2 text-left pl-4">Id</th>
                                            <th className="py-2 border-b-2 text-left pl-4">Medicine Name</th>
                                            <th className="py-2 border-b-2 text-left pl-4">Quantity</th>
                                            <th className="py-2 border-b-2 text-left pl-4">Unit Price</th>
                                            <th className="py-2 border-b-2 text-left pl-4">Batch No.</th>
                                            <th className="py-2 border-b-2 text-left pl-4">Sale Price</th>
                                            <th className="py-2 border-b-2 text-left pl-4">Expiry Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.details?.map((detail, index) => (
                                            <tr key={index} className="bg-gray-100 text-left text-sm">
                                                <td className="pl-4 py-2">{detail.id}</td>
                                                <td className="pl-4 py-2 font-semibold">{detail.medicine_name}</td>
                                                <td className="pl-4 py-2">{detail.quantity}</td>
                                                <td className="pl-4 py-2 font-bold">{detail.unit_price}</td>
                                                <td className="pl-4 py-2">{detail.batch_no}</td>
                                                <td className="pl-4 py-2">RS {detail.sale_price}</td>
                                                <td className="pl-4 py-2">{detail.expiry_date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-lg font-semibold">
                        <p>Total Purchase Price: <span className="text-green-600">{totalPurchase} AED</span></p>
                        <p>Total Sale Price: <span className="text-blue-600">{totalSale} AED</span></p>
                    </div>
                </div>
            ) : (
                <div className="text-center text-4xl text-black">
                    The Order you are looking for is currently unavailable
                </div>
            )}
        </div>
    );
};

export default PurchaseView;
