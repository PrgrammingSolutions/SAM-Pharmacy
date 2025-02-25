import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton
} from "@mui/material";
import { Remove } from "@mui/icons-material";
import patientService from "../../Services/patientService";
import toast from "react-hot-toast"
import AddPurchaseModal from "../../Components/AddPurchaseModal";
import productService from "../../Services/productService";
import distributorServices from "../../Services/distributorServices";
import moment from "moment/moment";
import purchaseService from "../../Services/purchaseService";
import salesService from "../../Services/salesService";
import InvoiceSaleModal from "../../Components/InvoiceSaleModal"
import { useNavigate } from "react-router-dom";

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
    note: ""
  })
  const [products, setProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleSelectDistributor = (medicine) => {
    setPurchase(p => ({...p, supplier_id: medicine.id}))
    setSearchDistributor(medicine.name); // Set selected value in input
    setShowDropdown(false); // Hide dropdown
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
    getPatients();
    getMedicines();
    getDistributors();
  }, []);

  const handleSelectMedicine = (medicine) => {
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
      stock_id: medicine.stock_id
    };

    setProducts([...products, newProduct]);
    setSearch("");
  };

  const handleRemovePurchase = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleQuantity = (index, name, value) => {
    setProducts(products => {
      const array = [...products]
      let q = array[index].quantity
      let p = array[index].sale_price
      if (name === "quantity") {
        if (value <= 0 || isNaN(value)) {
          toast.error("Quantity must be greater than zero");
          return products;

        }
        q = value;
      } else if (name === "sale_price") {
        p = value;
      }
      array[index] = { ...array[index], [name]: value, total_price: p * q }
      return array
    })
  }

  const handleKeyDown = (e) => {
    if (!medicines.length) return;
  
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev + 1) % medicines.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev - 1 + medicines.length) % medicines.length);
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      handleSelectMedicine(medicines[selectedIndex]);
      setSearch(""); 
      setSelectedIndex(-1);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault()
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
      totalAmount += product.total_price
    }
    let submit = {...purchase}
    submit.amount = totalAmount
    submit.products = products
    salesService.create(submit).then(res => {
      navigate("/sales")
      toast.success("Sale Created Successfully");
    })
  }

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
                onChange={(e) => {setPurchase(p => ({ ...p, customer_name: e.target.value }))
                }}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-sm">Invoice Date</label>
              <input
                type="date"
                className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1"
                onChange={(e) => setPurchase(p => ({ ...p, date: moment(e.target.value).format("YYYY-MM-DD")}))}
              />
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
                  onKeyDown={handleKeyDown}
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
                                    {medicine.batch_no}
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
                      <td className="p-3 w-[10%] font-bold">
                        {product.box}
                      </td>
                      <td className="p-3 w-[10%] font-bold">
                        {product.pack}
                      </td>
                      <td className="p-3 w-[8%]">
                        <input value={product.quantity}
                        type="number"
                        name="quantity"
                        className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1 w-20"
                        onChange={(e) => handleQuantity(index, e.target.name, e.target.value)}/>
                        </td>
                        <td className="p-3 w-[12%]">
                      <input value={product.expiry_date}
                        type="date"
                        name="expiry_date"
                        className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1 w-24"
                        onChange={(e) => handleQuantity(index, "expiry_date", e.target.value)}/>
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

      <InvoiceSaleModal
        open={open}
        onClose={()=> setOpen(false)}
      />
    </>
  );
};

export default POS;
