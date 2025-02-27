import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import purchaseService from "../../Services/purchaseService";

const PurchaseView = () => {
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([]);
    const [order, setOrder] = useState(null);
    const { id } = useParams(); // Get ID from URL

    useEffect(() => {
        const getPurchases = async () => {
            try {
                setLoading(true);
                const response = await purchaseService.fetchAll();
                setRecords(response.purchases);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error("Error fetching Purchases");
            }
        };
        getPurchases();
    }, []);

    useEffect(() => {
        // Find the selected order by ID when records update
        if (records.length > 0) {
            const selectedOrder = records.find(order => order.id === parseInt(id));
            setOrder(selectedOrder || null);
        }
    }, [records, id]);

    return (
        <div className="my-10 mx-10 lg:mx-16">
            {order ? (
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
                        <p className="flex flex-col font-semibold text-sm text-blue-600">
                            Order Tracking Number:
                            <span className="text-gray-500 font-medium">
                                {order.tracking_number}
                            </span>
                        </p>
                        <p className="flex flex-col font-semibold text-sm text-blue-600">
                            Payment Status:
                            <span className="text-gray-500 font-medium">
                                {order.payment_status}
                            </span>
                        </p>
                    </div>

                    <h1 className="font-bold text-lg mt-8">Supplier Details</h1>
                    <div className="flex justify-between">
                        <div className="flex flex-row gap-8 mt-2">
                            <div>
                                <span className="block leading-none font-semibold">Company Name</span>
                                <span className="text-sm leading-none font-medium text-gray-500">{order.company}</span>
                            </div>
                            <div>
                                <span className="block leading-none font-semibold">Salesman Name</span>
                                <span className="text-sm leading-none font-medium text-gray-500">{order.name}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2">
                        <div className="bg-white rounded-xl">
                            <div className="text-center pt-5 font-bold text-xl">Purchase Order Details</div>
                            <div className="px-4 py-2">
                            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-xl shadow-gray-300">
                                    <thead>
                                        <tr className="uppercase w-full text-white bg-primary" >
                                            <th className="py-2 border-b-2 text-left pl-4 w-[3%]">Id</th>
                                            <th className="py-2 border-b-2 text-left pl-4 w-[3%]">Vendor Code</th>
                                            <th className="py-2 border-b-2 text-left pl-4 w-[3%]">Brand</th>
                                            <th className="py-2 border-b-2 text-left pl-4 w-[3%]">Weight</th>
                                            <th className="py-2 border-b-2 text-left pl-4 w-[3%]">Price</th>
                                            <th className="py-2 border-b-2 text-left pl-4 w-[3%]">Quantity</th>
                                            <th className="py-2 border-b-2 text-left pl-4 w-[3%]">Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.details?.map((detail, index) => (
                                            <tr key={index} className="bg-gray-100 text-left text-sm">
                                                <td className="pl-4 py-2">254</td>
                                                <td className="pl-4 py-2">656569-4646</td>
                                                <td className="pl-4 py-2 font-bold">Brand</td>
                                                <td className="pl-4 py-2">Hello</td>
                                                <td className="pl-4 py-2">RS 65656</td>
                                                <td className="pl-4 py-2">45</td>
                                                <td className="pl-4 py-2">454545 AED</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-4xl text-black">The Order you are looking for is currently unavailable</div>
            )}
        </div>
    );
};

export default PurchaseView;
