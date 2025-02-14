import React from 'react'

const AddPurchaseModal = ({ isOpen, onClose }) => {
    if(!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ml-32">
        <div className="bg-gray-50 px-8 py-6 rounded-2xl mt-4">
        <div className='flex justify-end'>
            <button onClick={onClose} className='font-semibold text-md bg-red-600 px-[7px] rounded-full text-white'>x</button>
        </div>  
            <div className="flex flex-row justify-start gap-3">
              <div className="flex flex-col w-[20%]">
                <label className="text-xs font-semibold">Item Code</label>
                <input className="px-3 py-2 rounded-md focus:outline-none focus:shadow-md text-sm mt-1" placeholder="Enter Item Code" type="number" />
              </div>
              <div className="flex flex-col w-[30%]">
                <label className="text-xs font-semibold">Item Name</label>
                <input className="px-3 py-2 rounded-md focus:outline-none focus:shadow-md text-sm mt-1" placeholder="Enter Item Name" type="text" />
              </div>
              <div className="flex flex-col w-[25%]">
                <label className="text-xs font-semibold">Expiry Date</label>
                <input className="px-3 py-2 rounded-md focus:outline-none focus:shadow-md text-sm mt-1" type="date" />
              </div>
              <div className="flex flex-col w-[25%]">
                <label className="text-xs font-semibold">Batch No.</label>
                <input className="px-3 py-2 rounded-md focus:outline-none focus:shadow-md text-sm mt-1" placeholder="Enter Batch No." type="number" />
              </div>
            </div>

            <div className="flex flex-row justify-start gap-3 mt-3">
              <div className="flex flex-col w-[17%]">
                <label className="text-xs font-semibold">Quantity</label>
                <input className="px-3 py-2 rounded-md focus:outline-none focus:shadow-md text-sm mt-1" placeholder="Enter Quantity" type="number" />
              </div>
              <div className="flex flex-col w-[18%]">
                <label className="text-xs font-semibold">Pack</label>
                <input className="px-3 py-2 rounded-md focus:outline-none focus:shadow-md text-sm mt-1" placeholder="Enter Pack" type="number" />
              </div>
              <div className="flex flex-col w-[15%]">
                <label className="text-xs font-semibold">Box</label>
                <input className="px-3 py-2 rounded-md focus:outline-none focus:shadow-md text-sm mt-1" placeholder="Enter Box" type="number" />
              </div>
              <div className="flex flex-col w-[25%]">
                <label className="text-xs font-semibold">Unit Price</label>
                <input className="px-3 py-2 rounded-md focus:outline-none focus:shadow-md text-sm mt-1" placeholder="Enter Item Code" type="number" />
              </div>
              <div className="flex flex-col w-[25%]">
                <label className="text-xs font-semibold">Pack Price</label>
                <input className="px-3 py-2 rounded-md focus:outline-none focus:shadow-md text-sm mt-1" placeholder="Enter Pack Price" type="number" />
              </div>
            </div>
            <div className="flex flex-row justify-start gap-3 mt-3">
              <div className="flex flex-col w-[40%%]">
                <label className="text-xs font-semibold">Total Price</label>
                <input className="px-3 py-2 rounded-md focus:outline-none focus:shadow-md text-sm mt-1" placeholder="Enter Total Price" type="number" />
              </div>
            </div>
            </div>
    </div>
  )
}

export default AddPurchaseModal