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
import { Eye, SearchIcon } from "lucide-react";
import AddPurchaseModal from "../../Components/AddPurchaseModal";
import productService from "../../Services/productService";

const POS = () => {

  const [patientss, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [medicines, setMedicines] = useState([])
  const [search, setSearch] = useState("")

  const handleAddPurchase = (newPurchase) => {
    setPurchases([...purchases, newPurchase]);
    setIsOpen(false);
  };

    useEffect(() => {
    const getMedicines = async () => {
      try {
        const response = await productService.fetchAll();
        console.log(response)
        setMedicines(response.products);
      } catch (error) {
        toast.error("Error fetching Medicines");
      }
    };
    getMedicines();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRemovePurchase = (index) => {
    setPurchases(purchases.filter((_, i) => i !== index));
  };

  const handleAddItem = (item) => {
    let array = [...purchases]
    array.push({id:1})
    setPurchases(array)
  }

  return (
    <>
      <form className="w-[90%] m-auto">
        <h1 className="m-[30px] text-center font-[700] text-[20px]">
          Record Medicine POS
        </h1>
        <div className="mt-10 pb-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label className="font-semibold text-sm">Customer Name</label>
              <input
                type="text"
                className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-sm">Sale Date</label>
              <input
                type="date"
                className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1"
              />
            </div>
          </div>

          <hr className="mt-4" />
          <div className="flex justify-between mt-6">
          <div className="flex flex-col items-center border-b-2 border-gray-300 w-[40%] focus:border-primary">
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
                                // onClick={() => handlePatientSelect(patient)}
                            >
                              <table className="w-full">
                                <tbody>
                                <tr>
                                  <td className="text-sm">{medicine.medicine_name}</td>
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
            <button
                onClick={() => handleAddItem(null)}
              type="button"
              className="bg-white text-primary shadow-[2px_2px_6px_rgba(0,0,0,0.2)] px-8 py-3 rounded-lg font-[600] text-[14px]"
            >
              + Add
            </button>
          </div>

          {/* Table to show added purchases */}
          <div className="mt-4">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-xl shadow-gray-300">
              <thead>
                <tr className="bg-primary text-white capitalize leading-normal text-left text-xs">
                <th className="p-3 w-[10%] whitespace-nowrap">Item Code</th>
                <th className="p-3 w-[8%] whitespace-nowrap">Quantity</th>
                <th className="p-3 w-[10%] whitespace-nowrap">Discount</th>
                <th className="p-3 w-[10%] whitespace-nowrap">Net Amount</th>
                </tr>
              </thead>
              <tbody>
                {purchases.length > 0 ? (
                  purchases.map((purchase, index) => (
                    <tr key={index} className="text-xs border-t border-gray-200">
                      <td className="p-3 w-[5%] font-bold">{purchase.itemCode}</td>
                      <td className="p-3 w-[10%]"><input type="number" />hel</td>
                      <td className="p-3 w-[10%]"><input type="number" /></td>
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
    </>
  );
};

export default POS;
