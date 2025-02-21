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
import productService from "../../Services/productService";

const RecordPurchases = () => {
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [purchases, setPurchases] = useState([]);

  const handleAddPurchase = (newPurchase) => {
    setPurchases([...purchases, newPurchase]);
    setIsOpen(false);
  };

  const getPatients = async () => {
    try {
      const response = await patientService.fetchAllPatients();
      setPatients(response.patients);
    } catch (error) {
      toast.error("Error fetching Patients");
    }
  };

  const getMedicines = async () => {
    try {
      const response = await productService.fetchAll();
      setMedicines(response.products);
    } catch (error) {
      toast.error("Error fetching Medicines");
    }
  };

  useEffect(() => {
    getPatients();
    getMedicines();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectMedicine = (medicine) => {
    const newPurchase = {
      itemCode: medicine.item_code,
      itemName: medicine.medicine_name,
      purchaseDate: new Date().toISOString().split("T")[0],
      batchNo: "",
      quantity: 1,
      pack: 1,
      box: 1,
      unitPrice: medicine.unit_price || 0,
      packPrice: medicine.pack_price || 0,
      totalAmount: medicine.unit_price || 0,
    };

    setPurchases([...purchases, newPurchase]);
    setSearch("");
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
                type="date"
                className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-sm">Bill Type</label>
              <select className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1">
                <option value="cash">Cash</option>
                <option value="credit">Credit</option>
              </select>
            </div>
          </div>

          <hr className="mt-4" />
          <div className="flex justify-between items-center mt-6">
            {/* Search Bar (Aligned Left) */}
            <div className="relative w-[40%]">
              <div className="flex flex-col items-center border-b-2 border-gray-300 focus:border-primary">
                <input
                  type="search"
                  placeholder="Search Medicines Here..."
                  className="block w-[90%] focus:outline-none"
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <div className="w-full relative">
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto mt-2">
                      <li className="px-4 py-2 font-bold bg-gray-100">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-sm font-bold">Medicine</th>
                              <th className="text-sm font-bold">Code</th>
                              <th className="text-sm font-bold">Weight</th>
                            </tr>
                          </thead>
                        </table>
                      </li>

                      {medicines
                        .filter(
                          (medicine) =>
                            medicine.medicine_name
                              ?.toLowerCase()
                              .includes(search.toLowerCase()) ||
                            medicine.item_code
                              ?.toString()
                              .toLowerCase()
                              .includes(search.toLowerCase())
                        )
                        .slice(0, 10)
                        .map((medicine) => (
                          <li
                            key={medicine.id}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSelectMedicine(medicine)} // Add click event
                          >
                            <table className="w-full">
                              <tbody>
                                <tr>
                                  <td className="text-sm">
                                    {medicine.medicine_name}
                                  </td>
                                  <td className="text-sm text-gray-600 px-10">
                                    {medicine.item_code}
                                  </td>
                                  <td className="text-sm text-gray-600">
                                    {medicine.weight}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
{/* 
              <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="bg-white text-primary shadow-[2px_2px_6px_rgba(0,0,0,0.2)] px-8 py-3 rounded-lg font-[600] text-[14px]"
              >
                + Add Medicines
              </button> */}
            </div>
          </div>

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
                      <td className="p-3 pl-4 w-[10%] font-bold text-primary">
                        {index + 1}
                      </td>
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
