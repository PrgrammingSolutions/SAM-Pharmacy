import React, { useState, useEffect } from "react";
import {
  Button,
} from "@mui/material";
import patientService from "../../Services/patientService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import medicineService from "../../Services/medicineService";
import doctorService from "../../Services/doctorService";
import MedicineInvoiceModal from "../../Components/MedicineInvoiceModal";

const RecordSuppliers = () => {
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

  return (
    <>
      <form onSubmit={handleSubmit} className="w-[90%] m-auto">
        <h1 className="m-[30px] text-center font-[700] text-[20px]">
          Record Suppliers
        </h1>
        <div className="mt-10">
         <div>
         
          <div className="grid grid-cols-2 gap-3"> 
          <input type="text" className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none w-full focus:border-primary mt-1" placeholder="Distributer Name"/>
          <input type="text" className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1" placeholder="Company Name" />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3"> 
          <input type="text" className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none w-full focus:border-primary mt-1" placeholder="Address" />
          <input type="phone" className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1" placeholder="Phone No."/>
          <input type="email" className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1" placeholder="Email"/>
          </div>
         </div>
          <div className="text-center my-[30px]">
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#00A95B",
                "&:hover": { backgroundColor: "#00A95B" },
              }}
            >
              Add Supplier
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
    </>
  );
};

export default RecordSuppliers;
