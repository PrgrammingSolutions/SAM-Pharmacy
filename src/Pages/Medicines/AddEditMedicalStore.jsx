import React, { useState, useEffect } from "react";
import { Button, Divider, Grid, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import patientService from "../../Services/patientService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import doctorService from "../../Services/doctorService";
import medicineService from "../../Services/medicineService";

const AddEditMedicalStore = () => {
  const [patientData, setPatientData] = useState({
    medicine_name: "",
    quantity_in_stock: "",
    price_per_unit: "",
    expiry_date: "",
    supplier: ""
  });

  const [doctorData, setDoctorData] = useState([]); 

  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch patient data for editing
      const fetchPatientData = async () => {
        try {
          const response = await patientService.fetchPatientById(id); // Use the fetchPatientById service method
          setPatientData(response.patient); // Assuming response has a 'patient' object
        } catch (error) {
          toast.error("Error fetching patient data.");
        }
      };

      fetchPatientData();
    }
  }, [id]);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await doctorService.fetchAllDoctors();
        setDoctorData(response.doctors); // Access the doctors array within response
      } catch (error) {
        toast.error('Error fetching Doctors');
      }
    };
    getDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await medicineService.update(id, patientData);
        toast.success("Medicine updated successfully!");
      } else {
        await medicineService.create(patientData);
        toast.success("Patient added successfully!");
      }
      navigate("/patients");
    } catch (error) {
      toast.error("Error saving patient.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[90%] m-auto">
      <h1 className="m-[30px] text-center font-[700] text-[20px]">{id ? "Edit Medicine" : "Add Medicine"}</h1>
      <Divider />
      <div>
        

        {/* Medicine Stock Fields */}
        <Divider className="my-[20px]" />

        <div className="grid grid-cols-2 gap-10 my-[20px]">
          <div>
            <TextField
              label="Medicine Name"
              variant="outlined"
              fullWidth
              name="medicine_name"
              value={patientData.medicine_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <TextField
              label="Quantity in Stock"
              variant="outlined"
              fullWidth
              type="number"
              name="quantity_in_stock"
              value={patientData.quantity_in_stock}
              onChange={handleChange}
              required
            />
          </div>
         
        </div>

        <div className="grid grid-cols-3 gap-10 my-[20px]">
        <div>
            <TextField
              label="Price per Unit"
              variant="outlined"
              fullWidth
              type="number"
              name="price_per_unit"
              value={patientData.price_per_unit}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <TextField
              label="Expiry Date"
              variant="outlined"
              fullWidth
              type="date"
              name="expiry_date"
              value={patientData.expiry_date}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              label="Supplier"
              variant="outlined"
              fullWidth
              name="supplier"
              value={patientData.supplier}
              onChange={handleChange}
              required
            />
          </div>
        
        </div>

        <div className="grid grid-cols-2 gap-10 my-[20px]">
          
          <div>
            <TextField
              label="Storage Conditions"
              variant="outlined"
              fullWidth
              name="storage_conditions"
              value={patientData.storage_conditions}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <TextField
              label="Purchase Date"
              variant="outlined"
              fullWidth
              type="date"
              name="purchase_date"
              value={patientData.purchase_date}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>

      

        <div className="text-center my-[30px]">
          <Button type="submit" variant="contained" color="primary">
            {id ? "Update Medicine" : "Add Medicine"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddEditMedicalStore;
