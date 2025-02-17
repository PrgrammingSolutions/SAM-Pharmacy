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
import AddSaleModal from "../../Components/AddSaleModal";

const SaleMedicine = () => {
  const [purchases, setPurchases] = useState([
    {
      itemCode: "A001",
      itemName: "Paracetamol",
      packing: "Box of 10",
      quantity: 2,
      discount: "5%",
      discAmount: "10",
      netAmount: "190",
    },
    {
      itemCode: "B002",
      itemName: "Ibuprofen",
      packing: "Bottle of 100",
      quantity: 1,
      discount: "10%",
      discAmount: "15",
      netAmount: "135",
    },
  ]);
  const [salesRows, setSalesRows] = useState([
    {
      stock_id: "",
      quantity: "",
      unit_price: "",
    },
  ]);
  const [medicineData, setMedicineData] = useState([]);
  const [patientss, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");

  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const [saleDate, setSaleDate] = useState(
    new Date().toISOString().split("T")[0] // Set current date as default
  );

  const [searchMedicineData, setSearchMedicineData] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState("");

  const [selectedMedicineId, setSelectedMedicineId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicines = await medicineService.fetchAll();
        setMedicineData(medicines.medicines || []);

        const doctors = await doctorService.fetchAllDoctors();
        setDoctors(doctors.doctors || []);
      } catch (error) {
        toast.error("Error fetching data.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicines = await medicineService.fetchAll();
        setMedicineData(medicines.medicines || []);

        const doctors = await doctorService.fetchAllDoctors();
        setDoctors(doctors.doctors || []);
      } catch (error) {
        toast.error("Error fetching data.");
      }
    };
    fetchData();
  }, []);

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

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...salesRows];
    updatedRows[index][field] = value;

    if (field === "stock_id") {
      const selectedMedicine = medicineData.find((med) => med.id === value);
      if (selectedMedicine) {
        updatedRows[index].unit_price = selectedMedicine.discounted_price;
      }
    }
    if (field === "quantity") {
      if (parseInt(value) <= 0) {
        toast.error("Quantity must be greater than 0.");
        return;
      }
      const selectedMedicine = medicineData.find(
        (med) => med.id === updatedRows[index].stock_id
      );

      if (
        selectedMedicine &&
        parseInt(value) > selectedMedicine.quantity_in_stock
      ) {
        toast.error("Quantity exceeds available stock.");
        updatedRows[index].quantity = selectedMedicine.quantity_in_stock;
      }
    }
    setSalesRows(updatedRows);
  };

  const handleAddRow = () => {
    setSalesRows([
      ...salesRows,
      { stock_id: "", quantity: "", unit_price: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    setSalesRows(salesRows.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatientId) {
      toast.error("Please select a patient before submitting.");
      return;
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setSelectedPatientId(patient.patient_id);
    setSearchData("");
    setPatients((prevData) => ({
      ...prevData,
      patient_id: patient.patient_id,
    }));
  };

  const handleMedicineSelect = (medicine) => {
    setSelectedMedicine(medicine);
    setSearchMedicineData("");
    setMedicineData((prevData) => ({
      ...prevData,
      stock_id: medicine.id,
    }));
  };
  const handleRemovePurchase = (index) => {
    setPurchases(purchases.filter((_, i) => i !== index));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-[90%] m-auto">
        <h1 className="m-[30px] text-center font-[700] text-[20px]">
          Record Medicine Sales
        </h1>
        <div className="mt-10">
          <div>
            <div className="grid grid-cols-2 gap-3"> 
            <div className="flex flex-col">
              <label className="font-semibold text-sm">Customer Name</label>
              <input
                type="text"
                className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-sm">Sale Date</label>
              <input
                type="date"
                className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1"
              />
            </div>
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
                          <th className="p-3 w-[15%] whitespace-nowrap">Description</th>
                          <th className="p-3 w-[13%] whitespace-nowrap">Paking</th>
                          <th className="p-3 w-[8%] whitespace-nowrap">Quantity</th>
                          <th className="p-3 w-[8%] whitespace-nowrap">Discount</th>
                          <th className="p-3 w-[8%] whitespace-nowrap">Disc Amount</th>
                          <th className="p-3 w-[10%] whitespace-nowrap">Net Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                        {purchases.length > 0 ? (
                            purchases.map((purchase, index) => (
                              <tr key={index} className="text-xs border-t border-gray-200">
                                <td className="p-2 font-bold text-primary">{index + 1}</td>
                                <td className="p-2">{purchase.itemCode}</td>
                                <td className="p-2">{purchase.itemName}</td>
                                <td className="p-2">{purchase.packing}</td>
                                <td className="p-2">{purchase.quantity}</td>
                                <td className="p-2">{purchase.discount}</td>
                                <td className="p-2">{purchase.discAmount}</td>
                                <td className="p-2">{purchase.netAmount}</td>
                                <td className="p-2 text-center">
                                  <IconButton onClick={() => handleRemovePurchase(index)} color="error">
                                    <Remove />
                                  </IconButton>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="9" className="text-center p-4 text-gray-500">
                                No purchases added yet.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

          <div className="text-center my-[30px]">
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#1F2937",
                "&:hover": { backgroundColor: "#111827" },
              }}
            >
              Save Medicine Sales
            </Button>
          </div>
        </div>
      </form>
      <MedicineInvoiceModal
        open={isModalOpen}
        onClose={closeModal}
        patientName={selectedPatient?.full_name || ""}
        doctorName={
          doctors.find((doc) => doc.id === selectedDoctor)?.name || ""
        }
        servicesName={salesRows.map((row) => {
          const medicine = medicineData.find((med) => med.id === row.stock_id);
          return medicine ? medicine.medicine_name : "N/A";
        })}
        patientId={selectedPatientId}
        doctorId={selectedDoctor}
        saleDate={saleDate}
        salesRows={salesRows}
        invoiceId={invoiceId}
      />
      <AddSaleModal isOpen={isOpen} onClose={() => setIsOpen(false)}/>
    </>
  );
};

export default SaleMedicine;
