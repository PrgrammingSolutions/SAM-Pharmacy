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
import doctorService from "../../Services/doctorService";
import saleService from "../../Services/saleService";
import medicalServices from "../../Services/medicalServices";
import InvoiceModal from "../../Components/InvoiceModal";

const SaleServices = () => {
  const [salesRows, setSalesRows] = useState([
    {
      services_id: "",
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
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const [saleDate, setSaleDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchMedicineData, setSearchMedicineData] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [selectedMedicineId, setSelectedMedicineId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicines = await medicalServices.fetchAll();
        setMedicineData(medicines.services || []);

        // const patients = await patientService.fetchAllPatients();
        // console.log("Fetched patients data:", patients); // Debug log
        // setPatients(patients.patients || []);

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

    if (field === "quantity") {
      // Prevent negative or zero quantity
      if (parseInt(value) <= 0) {
        toast.error("Quantity must be greater than 0.");
        return;
      }
    }
    if (field === "services_id") {
      const selectedMedicine = medicineData.find((med) => med.id === value);
      if (selectedMedicine) {
        updatedRows[index].unit_price = selectedMedicine.price;
      }
    }
    setSalesRows(updatedRows);
  };

  const handleAddRow = () => {
    setSalesRows([
      ...salesRows,
      { services_id: "", quantity: "", unit_price: "" },
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

    setIsModalOpen(true); // Open the modal after successful invoice creation
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
    setSelectedMedicine(medicine); // Save the selected patient
    setSearchMedicineData(""); // Clear search input
    setMedicineData((prevData) => ({
      ...prevData,
      services_id: medicine.id, // Store patient_id in checkupData
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-[90%] m-auto">
        <h1 className="m-[30px] text-center font-[700] text-[20px]">
          Record Medical Services Sale
        </h1>
        <div className="mt-10">
          <Grid container spacing={3} className="my-[20px] mb-">
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  label="Search Patients"
                  placeholder="Type to search patients..."
                  value={searchData || selectedPatient?.full_name || ""}
                  onChange={(e) => {
                    setSearchData(e.target.value);
                    if (selectedPatient) setSelectedPatient(null);
                  }}
                  variant="outlined"
                  fullWidth
                  sx={{
                    backgroundColor: "white",
                  }}
                />
                {searchData && (
                  <div className="relative">
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto mt-2">
                      <li className="px-4 py-2 font-bold bg-gray-100">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-sm font-bold">Patient No.</th>
                              <th className="text-sm font-bold">Name</th>
                              <th className="text-sm font-bold">Phone No.</th>
                            </tr>
                          </thead>
                        </table>
                      </li>

                      {/* Render Patient Data */}
                      {patientss
                        .filter(
                          (patient) =>
                            patient.full_name
                              ?.toLowerCase()
                              .includes(searchData.toLowerCase()) ||
                            patient.patient_id
                              ?.toString()
                              .toLowerCase()
                              .includes(searchData.toLowerCase())
                        )
                        .slice(0, 10)
                        .map((patient) => (
                          <li
                            key={patient.patient_id}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handlePatientSelect(patient)} // Use updated function
                          >
                            <table className="w-full">
                              <tbody>
                                <tr>
                                  <td className="text-sm">
                                    {patient.patient_id}
                                  </td>
                                  <td className="text-sm text-gray-600 px-10">
                                    {patient.full_name}
                                  </td>
                                  <td className="text-sm text-gray-600">
                                    {patient.contact_number}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Doctor Name</InputLabel>
                <Select
                  label="Doctor Name"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  required
                  sx={{
                    backgroundColor: "white",
                  }}
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Sale Date"
                type="date"
                fullWidth
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                sx={{
                  backgroundColor: "white",
                }}
              />
            </Grid>
          </Grid>

          <Divider
            sx={{ my: 3, borderBottomWidth: 1, backgroundColor: "black" }}
          />
          {salesRows.map((row, index) => (
            <Grid container spacing={3} key={index} className="my-[20px]">
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <Autocomplete
                    value={
                      medicineData.find((med) => med.id === row.services_id) ||
                      null
                    } // Ensure the selected medicine is correctly mapped to `stock_id`
                    onChange={(e, newValue) => {
                      handleRowChange(
                        index,
                        "services_id",
                        newValue ? newValue.id : ""
                      ); // Update stock_id with the selected medicine's ID
                    }}
                    options={medicineData}
                    getOptionLabel={(option) => option.name || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Medicine Name" />
                    )}
                    required
                    sx={{
                      backgroundColor: "white",
                    }}
                    disableClearable
                  />
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="Quantity"
                  type="number"
                  fullWidth
                  value={row.quantity}
                  onChange={(e) =>
                    handleRowChange(index, "quantity", e.target.value)
                  }
                  required
                  sx={{
                    backgroundColor: "white",
                  }}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="Price"
                  type="number"
                  fullWidth
                  value={row.unit_price}
                  onChange={(e) =>
                    handleRowChange(index, "unit_price", e.target.value)
                  }
                  InputProps={{
                    readOnly: true,
                  }}
                  required
                  sx={{
                    backgroundColor: "white",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <IconButton sx={{ color: "black" }} onClick={handleAddRow}>
                  <Add />
                </IconButton>
                {salesRows.length > 1 && (
                  <IconButton
                  sx={{ color: "black" }}
                    onClick={() => handleRemoveRow(index)}
                  >
                    <Remove />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}

          <div className="text-center my-[30px]">
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#1F2937",
                "&:hover": { backgroundColor: "#111827" },
              }}
            >
              Save Services Sales
            </Button>
          </div>
        </div>
      </form>
      <InvoiceModal
        open={isModalOpen}
        onClose={closeModal}
        patientName={selectedPatient?.full_name || ""}
        doctorName={
          doctors.find((doc) => doc.id === selectedDoctor)?.name || ""
        }
        servicesName={salesRows.map((row) => {
          const medicine = medicineData.find(
            (med) => med.id === row.services_id
          );
          return medicine ? medicine.name : "N/A"; // Default to "N/A" if no service is found
        })}
        patientId={selectedPatientId}
        doctorId={selectedDoctor}
        invoiceId={invoiceId}
        saleDate={saleDate}
        salesRows={salesRows}
      />
    </>
  );
};

export default SaleServices;
