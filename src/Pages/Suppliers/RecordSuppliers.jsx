import React, { useState } from "react";
import {
  Button,
} from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import distributorServices from "../../Services/distributorServices";

const RecordSuppliers = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    company: "",
    address: "",
    phone: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!data.name) {
      toast.error("Distributor Name is required");
      return;
    }
    if (!data.company) {
      toast.error("Company Name is required");
      return;
    }
    if (!data.address) {
      toast.error("Address is required");
      return;
    }
    if (!data.phone) {
      toast.error("Phone Number is required");
      return;
    }
    if (!data.email) {
      toast.error("Email is required");
      return;
    }
    try {
      await distributorServices.create(data);
      toast.success("Supplier Added Successfully");

      navigate("/suppliers");
    } catch (error) {
      toast.error("Error Adding Supplier");
    }
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
          <input type="text" name="name" value={data.name} onChange={handleChange} className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none w-full focus:border-primary mt-1" placeholder="Distributer Name"/>
          <input type="text" name="company" value={data.company} onChange={handleChange} className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1" placeholder="Company Name" />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3"> 
          <input type="text" name="address" value={data.address} onChange={handleChange} className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none w-full focus:border-primary mt-1" placeholder="Address" />
          <input type="phone" name="phone" value={data.phone} onChange={handleChange} className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1" placeholder="Phone No."/>
          <input type="email" name="email" value={data.email} onChange={handleChange} className="bg-gray-50 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1" placeholder="Email"/>
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
      
    </>
  );
};

export default RecordSuppliers;
