import React, { useState, useEffect, useRef } from "react";
import { Button, IconButton } from "@mui/material";
import { Remove } from "@mui/icons-material";
import patientService from "../../Services/patientService";
import toast from "react-hot-toast";
import AddPurchaseModal from "../../Components/AddPurchaseModal";
import productService from "../../Services/productService";
import distributorServices from "../../Services/distributorServices";
import moment from "moment/moment";
import salesService from "../../Services/salesService";
import InvoiceSaleModal from "../../Components/InvoiceSaleModal";
import { useNavigate } from "react-router-dom";
import AutoComplete from "react-select";

const POS = () => {
  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [search, setSearch] = useState("");
  const [searchDistributor, setSearchDistributor] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [purchase, setPurchase] = useState({
    customer_name: "",
    customer_age: "",
    customer_phone: "",
    amount: 0,
    date: 0,
    note: "",
  });
  const [products, setProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [medicinesOptions, setMedicinesOptions] = useState([]);
  const navigate = useNavigate();

  const medicineRef = useRef();

  const handleSelectDistributor = (medicine) => {
    setPurchase((p) => ({ ...p, supplier_id: medicine.id }));
    setSearchDistributor(medicine.name);
    setShowDropdown(false); 
  };

  const handleAddPurchase = (newProduct) => {
    setProducts([...products, newProduct]);
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
      const response = await productService.fetchMedicines();
      setMedicines(response.products);
    } catch (error) {
      toast.error("Error fetching Medicines");
    }
  };

  const getDistributors = async () => {
    try {
      const response = await distributorServices.fetchAll();
      setDistributors(response.distributors);
    } catch (error) {
      toast.error("Error fetching Medicines");
    }
  };

  useEffect(() => {
    if (medicines.length > 0) {
      let array = [];
      for (const medicine of medicines) {
        array.push({
          value: medicine.id,
          label: (
            <span>
              <span style={{ color: "gray" }}>{medicine.medicine_name}</span> (
              <span style={{ color: "green" }}>{medicine.item_code}</span> -  
              <span style={{ color: "blue" }}>{medicine.batch_no}</span> -  
              <span style={{ color: "orange" }}>{medicine.weight}</span> - Rs  
              <span style={{ color: "red", fontWeight: "bold" }}>{medicine.unit_price}</span> )
            </span>
          ),
        });
      }
      setMedicinesOptions(array);
    }
  }, [medicines]);

  useEffect(() => {
    getPatients();
    getMedicines();
    getDistributors();
    medicineRef.current.focus();
  }, []);

  const handleSelectMedicine = (id) => {
    let medicine = medicines.filter((m) => m.id === id)[0];

    const newProduct = {
      medicine_id: medicine.id,
      itemCode: medicine.item_code,
      itemName: medicine.medicine_name,
      expiry_date: new Date().toISOString().split("T")[0],
      batch_no: medicine.batch_no,
      quantity: 1,
      pack: 1,
      box: 1,
      unit_price: medicine.unit_price || 0,
      packPrice: medicine.pack_price || 0,
      sale_price: medicine.sale_price,
      total_price: medicine.sale_price * 1 || 0,
      stock_id: medicine.stock_id,
    };

    setProducts([...products, newProduct]);
    setSearch("");
  };

  const handleRemovePurchase = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleQuantity = (index, name, value) => {
    setProducts((products) => {
      const array = [...products];
      let q = array[index].quantity;
      let p = array[index].sale_price;
      if (name === "quantity") {
        if (value <= 0 || isNaN(value)) {
          toast.error("Quantity must be greater than zero");
          return products;
        }
        q = value;
      } else if (name === "sale_price") {
        p = value;
      }
      array[index] = { ...array[index], [name]: value, total_price: p * q };
      return array;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!purchase.customer_name) {
      toast.error("Customer Name is required");
      return;
    }
    if (!purchase.date) {
      toast.error("Invoice Date is required");
      return;
    }
    if (products.length === 0) {
      toast.error("At least one medicine must be added");
      return;
    }

    let totalAmount = 0;
    for (let product of products) {
      totalAmount += product.total_price;
    }
    let submit = { ...purchase };
    submit.amount = totalAmount;
    submit.products = products;
    salesService.create(submit).then((res) => {
      navigate("/sales");
      toast.success("Sale Created Successfully");
    });
  };

  return (
    <>
      <form className="w-[90%] m-auto">
        <h1 className="m-[30px] text-center font-[700] text-[20px]">
          Record Medicine Sales
        </h1>
        <div className="mt-10 pb-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label className="font-semibold text-sm">Customer Name</label>
              <input
                type="name"
                className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1"
                onChange={(e) => {
                  setPurchase((p) => ({ ...p, customer_name: e.target.value }));
                }}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-sm">Invoice Date</label>
              <input
                type="date"
                className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1"
                onChange={(e) =>
                  setPurchase((p) => ({
                    ...p,
                    date: moment(e.target.value).format("YYYY-MM-DD"),
                  }))
                }
              />
            </div>
          </div>

          <hr className="mt-4" />
          <div className="flex justify-between items-center mt-6">
            {/* Search Bar (Aligned Left) */}
            <div className="relative w-[50%]">
              <AutoComplete
                ref={medicineRef}
                className="w-full"
                options={medicinesOptions}
                onChange={(v) => handleSelectMedicine(v.value)}
                placeholder="Search Medicines Here..."
              />
            </div>
          </div>

          <div className="mt-4">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-xl shadow-gray-300">
              <thead>
                <tr className="bg-primary text-white capitalize leading-normal text-left text-xs">
                  <th className="p-3 w-[5%] whitespace-nowrap">Sr No.</th>
                  <th className="p-3 w-[10%] whitespace-nowrap">Item Code</th>
                  <th className="p-3 w-[15%] whitespace-nowrap">Item Name</th>
                  <th className="p-3 w-[10%] whitespace-nowrap">Batch No.</th>
                  <th className="p-3 w-[8%] whitespace-nowrap">Box</th>
                  <th className="p-3 w-[8%] whitespace-nowrap">Pack</th>
                  <th className="p-3 w-[8%] whitespace-nowrap">Units</th>
                  <th className="p-3 w-[8%] whitespace-nowrap">Expiry Date</th>
                  <th className="p-3 w-[10%] whitespace-nowrap">
                    Sale Price/Unit
                  </th>
                  <th className="p-3 w-[10%] whitespace-nowrap">
                    Total Amount
                  </th>
                  <th className="p-3 w-[8%] whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <tr
                      key={index}
                      className="text-xs border-t border-gray-200"
                    >
                      <td className="p-3 pl-4 w-[10%] font-bold text-primary">
                        {index + 1}
                      </td>
                      <td className="p-3 w-[5%] font-bold">
                        {product.itemCode}
                      </td>
                      <td className="p-3 w-[10%] font-bold">
                        {product.itemName}
                      </td>
                      <td className="p-3 w-[10%] font-bold">
                        {product.batch_no}
                      </td>
                      <td className="p-3 w-[10%] font-bold">{product.box}</td>
                      <td className="p-3 w-[10%] font-bold">{product.pack}</td>
                      <td className="p-3 w-[8%]">
                        <input
                          value={product.quantity}
                          type="number"
                          name="quantity"
                          className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1 w-20"
                          onChange={(e) =>
                            handleQuantity(index, e.target.name, e.target.value)
                          }
                        />
                      </td>
                      <td className="p-3 w-[12%]">
                        <input
                          value={product.expiry_date}
                          type="date"
                          name="expiry_date"
                          className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1 w-24"
                          onChange={(e) =>
                            handleQuantity(index, "expiry_date", e.target.value)
                          }
                        />
                      </td>
                      <td className="p-3 w-[10%] font-bold">
                        {product.sale_price}
                      </td>
                      <td className="p-3 w-[10%]">{product.total_price}</td>
                      <td className="p-3 w-[10%] text-center">
                        <IconButton
                          onClick={() => handleRemovePurchase(index)}
                          color="error"
                        >
                          <Remove />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center p-4 text-gray-500">
                      No Sales added yet
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
              onClick={(e) => handleSubmit(e)}
              sx={{
                backgroundColor: "#00A95B",
                "&:hover": { backgroundColor: "#00A95D" },
              }}
            >
              Generate Sale
            </Button>
          </div>
        </div>
      </form>

      {/* Medicine Purchase Modal */}
      <AddPurchaseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleAddPurchase}
      />

      <InvoiceSaleModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default POS;
