import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import distributorServices from '../../Services/distributorServices'

const SupplierLedger = () => {
    const { id } = useParams();
    const [supplier, setSupplier] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSupplier = async () => {
          try {
            const response = await distributorServices.fetchSingle(id);
            setSupplier(response.distributor);
          } catch (error) {
            console.error("Error fetching supplier details:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchSupplier();
      }, [id]);

  return (
    <div>
      <div className='flex justify-center items-center'>
        <div className="bg-white shadow-lg p-8 w-[90%] mt-2 border-gray-300 border-2 rounded-3xl">
            <div className="flex flex-col">
                <div className="text-primary text-2xl font-bold">
                 {supplier?.company}
                </div>
                <div className="text-base text-gray-500 font-semibold mt-2">{supplier?.name} </div>

                <div className="text-base font-semibold text-gray-500">{supplier?.phone}</div>

                <div className="text-base text-gray-500">
                    {" "}
                    {supplier?.address}
                </div>
            </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center mt-10'>
            <div className="flex flex-row gap-12 justify-end w-[90%]">
                <div className="flex gap-3 items-center">
                    <label className="text-md text-gray-700 font-bold">
                        Start Date :{" "}
                    </label>
                    <input
                        type="date"
                        name="start_date"
                        className="border-b-2 border-gray-400 focus:outline-none focus:border-primary"
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <label className="text-md text-gray-700 font-bold">
                        End Date :
                    </label>
                    <input
                        type="date"
                        name="end_date"
                        className="border-b-2 border-gray-400 focus:outline-none focus:border-primary"
                    />
                </div>
            </div>
            <table className=" animate_animated animate_fadeIn border-separate border-spacing-y-4 w-[90%]">
                <thead className="bg-primary shadow-lg border-separate-2 border-spacing-y-2">
                <tr className="uppercase text-sm leading-normal w-full text-white">
                    <th className="rounded-l-lg  p-[1.5%] text-left text-[13px] w-[2%]">
                        Date
                    </th>
                    <th className="  p-[1.5%] text-left text-[13px] w-[2%]">
                        Reference
                    </th>
                    <th className="  p-[1.5%] text-left text-[13px] w-[2%]">
                        Note
                    </th>
                    <th className="p-[1.5%] text-left text-[13px] w-[1%]">Credit</th>
                    <th className="p-[1.5%] text-left text-[13px] w-[1%]">Debit</th>
                    <th className="rounded-r-lg p-[1.5%] text-left text-[13px] w-[1%]">
                        Balance
                    </th>
                </tr>
                </thead>

                <tbody>
                    <tr
                        className="rounded-lg border border-gray-400 shadow-sm shadow-gray-300">
                        <td className="py-[1%] px-[2%] text-left rounded-l-lg text-[15px] text-primary font-bold w-[1%] bg-gray-50 border-b border-primary border-opacity-25">
                            okay
                        </td>
                        <td className="py-[1%] px-[2%] text-left text-[15px] text-gray-700 font-light w-[2%] bg-gray-50 border-b border-primary border-opacity-25">
                            Order
                        </td>
                        <td className="py-[1%] px-[2%] text-left text-[15px] text-gray-700 font-light w-[2%] bg-gray-50 border-b border-primary border-opacity-25">
                           Hellow
                        </td>
                        <td className="py-[1%] px-[2%] text-left text-[15px] font-medium w-[1%] bg-gray-50 border-b border-primary border-opacity-25">
                            Now
                        </td>
                        <td className="py-[1%] px-[2%] text-left text-[15px] font-medium w-[1%] bg-gray-50 border-b border-primary border-opacity-25">
                            Transaction
                        </td>
                        <td className="py-[1%] px-[2%] rounded-r-lg text-left text-[15px] font-light w-[1%] bg-gray-50 border-b border-primary border-opacity-25">
                            2000
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default SupplierLedger