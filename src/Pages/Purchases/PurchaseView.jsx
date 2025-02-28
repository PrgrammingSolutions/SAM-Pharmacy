import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import purchaseService from "../../Services/purchaseService";
import productService from "../../Services/productService";
import { Eye } from "lucide-react";

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
        <div className="p-4 px-16">
            <div className="flex flex-row">
                <h1 className="font-bold text-2xl text-primary animate__animated animate__fadeInLeft">
                    DBS
                </h1>
                <p className="ml-5">
                    <span className="bg-blue-600 px-4 py-[1px] rounded-md text-white text-[10px]">
                        B2B
                    </span>
                </p>
            </div>
            <hr className="border border-gray-200"/>

            <div className="grid grid-cols-4 mt-4">
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

              <h1 className="mt-10 font-bold text-xl text-center mb-4">Purchase Order Details</h1>
              <div className="flex justify-center items-center">
                <table className="w-full border-collapse rounded-lg overflow-hidden shadow-xl shadow-gray-300">
                        <thead>
                            <tr className="uppercase w-full text-sm text-white bg-primary">
                                <th className="py-4 border-b text-left pl-4">Id</th>
                                <th className="py-4 border-b text-left pl-4">Medicine Name</th>
                                <th className="py-4 border-b text-left pl-4">Quantity</th>
                                <th className="py-4 border-b text-left pl-4">Unit Price</th>
                                <th className="py-4 border-b text-left pl-4">Batch No.</th>
                                <th className="py-4 border-b text-left pl-4">Sale Price</th>
                                <th className="py-4 border-b text-left pl-4">Expiry Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.details?.map((detail, index) => (
                                <tr key={index} className="bg-white text-left text-sm">
                                    <td className="pl-4 border-b border-gray-100 py-2">{detail.id}</td>
                                    <td className="pl-4 border-b border-gray-100 py-2 font-semibold">{detail.medicine_name}</td>
                                    <td className="pl-4 border-b border-gray-100 py-2">{detail.quantity}</td>
                                    <td className="pl-4 border-b border-gray-100 py-2 font-bold">{detail.unit_price}</td>
                                    <td className="pl-4 border-b border-gray-100 py-2">{detail.batch_no}</td>
                                    <td className="pl-4 border-b border-gray-100 py-2">RS {detail.sale_price}</td>
                                    <td className="pl-4 border-b border-gray-100 py-2">{moment(detail.expiry_date).format("ll")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
              </div>

              <div className="flex flex-col mt-4 text-lg font-semibold">
                    <p>Total Purchase Price: 
                    <span className="text-green-600 break-words w-[50%]">
                        . AED
                    </span>
                    </p>
                    <p>Total Sale Price: 
                    <span className="text-blue-600 break-words w-[50%]">
                        {totalSale} AED
                    </span>
                    </p>
                </div>
            </div>
    );
};

export default PurchaseView;
