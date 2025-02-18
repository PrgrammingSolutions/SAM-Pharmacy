import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import patientService from "../../Services/patientService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import medicineService from "../../Services/medicineService";
import doctorService from "../../Services/doctorService";
import saleService from "../../Services/saleService";
import MedicineInvoiceModal from "../../Components/MedicineInvoiceModal";
import { Box, Typography } from "@mui/material";
import { Eye } from "lucide-react";
import AddPurchaseModal from "../../Components/AddPurchaseModal";

const RecordPurchases = () => {

  const [patientss, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [purchases, setPurchases] = useState([]);

  const handleAddPurchase = (newPurchase) => {
    setPurchases([...purchases, newPurchase]);
    setIsOpen(false);
  };

    useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await patientService.fetchAllPatients();
        setPatients(response.patients);
      } catch (error) {
        toast.error("Error fetching Patients");
      }
    };
    getPatients();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRemovePurchase = (index) => {
    setPurchases(purchases.filter((_, i) => i !== index));
  };

  return (
    <>
      <form className="w-[90%] m-auto">
        <h1 className="m-[30px] text-center font-[700] text-[20px]">
          Record Medicine Purchases
        </h1>
        <div className="mt-10 pb-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label className="font-semibold text-sm">Distributor Name</label>
              <input
                type="text"
                className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-sm">Invoice Date</label>
              <input
                type="text"
                className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-sm">Bill Type</label>
              <input
                type="text"
                className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1"
              />
            </div>
          </div>

          <hr className="mt-4" />
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className="bg-white text-primary shadow-[2px_2px_6px_rgba(0,0,0,0.2)] px-8 py-3 rounded-lg font-[600] text-[14px]"
            >
              + Add Medicines
            </button>
          </div>

          {/* Table to show added purchases */}
          <div className="mt-4">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-xl shadow-gray-300">
              <thead>
                <tr className="bg-primary text-white capitalize leading-normal text-left text-xs">
                <th className="p-3 w-[5%] whitespace-nowrap">Sr No.</th>
                <th className="p-3 w-[10%] whitespace-nowrap">Item Code</th>
                <th className="p-3 w-[15%] whitespace-nowrap">Item Name</th>
                <th className="p-3 w-[12%] whitespace-nowrap">Purchase Date</th>
                <th className="p-3 w-[10%] whitespace-nowrap">Batch No.</th>
                <th className="p-3 w-[8%] whitespace-nowrap">Quantity</th>
                <th className="p-3 w-[8%] whitespace-nowrap">Pack</th>
                <th className="p-3 w-[8%] whitespace-nowrap">Box</th>
                <th className="p-3 w-[10%] whitespace-nowrap">Unit Price</th>
                <th className="p-3 w-[10%] whitespace-nowrap">Pack Price</th>
                <th className="p-3 w-[10%] whitespace-nowrap">Total Amount</th>
                <th className="p-3 w-[8%] whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {purchases.length > 0 ? (
                  purchases.map((purchase, index) => (
                    <tr key={index} className="text-xs border-t border-gray-200">
                      <td className="p-3 pl-4 w-[10%] font-bold text-primary">{index + 1}</td>
                      <td className="p-3 w-[5%] font-bold">{purchase.itemCode}</td>
                      <td className="p-3 w-[10%] font-bold">{purchase.itemName}</td>
                      <td className="p-3 w-[15%]">{purchase.purchaseDate}</td>
                      <td className="p-3 w-[12%]">{purchase.batchNo}</td>
                      <td className="p-3 w-[10%]">{purchase.quantity}</td>
                      <td className="p-3 w-[8%]">{purchase.pack}</td>
                      <td className="p-3 w-[8%]">{purchase.box}</td>
                      <td className="p-3 w-[8%]">{purchase.unitPrice}</td>
                      <td className="p-3 w-[10%]">{purchase.packPrice}</td>
                      <td className="p-3 w-[10%]">{purchase.totalAmount}</td>
                      <td className="p-3 w-[10%] text-center">
                      <IconButton onClick={() => handleRemovePurchase(index)} color="error">
                          <Remove />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center p-4 text-gray-500">
                      No purchases added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="text-center my-[36px]">
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#00A95B",
                "&:hover": { backgroundColor: "#00A95D" },
              }}
            >
              Generate Purchase Invoice
            </Button>
          </div>
        </div>
      </form>

      {/* Medicine Purchase Modal */}
      <AddPurchaseModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={handleAddPurchase} />
    </>
  );
};

export default RecordPurchases;