import React, {useState, useEffect, useRef} from "react";
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
import {Add, Remove} from "@mui/icons-material";
import patientService from "../../Services/patientService";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import AddPurchaseModal from "../../Components/AddPurchaseModal";
import productService from "../../Services/productService";
import distributorServices from "../../Services/distributorServices";
import moment from "moment/moment";
import purchaseService from "../../Services/purchaseService";
import AutoComplete from 'react-select'

const RecordPurchases = () => {
    const [patients, setPatients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invoiceId, setInvoiceId] = useState(null);
    const [medicines, setMedicines] = useState([]);
    const [distributors, setDistributors] = useState([]);
    const [search, setSearch] = useState("");
    const [searchDistributor, setSearchDistributor] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [purchase, setPurchase] = useState({
        supplier_id: 0,
        amount: 0,
        date: 0,
        note: "",
    });
    const [products, setProducts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [medicinesOptions, setMedicinesOptions] = useState([])
    const [distributorsOptions, setDistributorsOptions] = useState([])

    const navigate = useNavigate();
    const medicineRef = useRef()

    const handleSelectDistributor = (id) => {
        setPurchase((p) => ({...p, supplier_id: id}));
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
            const response = await productService.fetchAll();
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
            let array = []
            for (const medicine of medicines) {
                array.push({value: medicine.id, label: `${medicine.medicine_name} (${medicine.batch_no})`})
            }
            setMedicinesOptions(array)
        }
    }, [medicines]);

    useEffect(() => {
        if (distributors.length > 0) {
            let array = []
            for (const distributor of distributors) {
                array.push({value: distributor.id, label: `${distributor.company} (${distributor.name})`})
            }
            setDistributorsOptions(array)
        }
    }, [distributors]);

    useEffect(() => {
        getPatients();
        getMedicines();
        getDistributors();
        medicineRef.current.focus();
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSelectMedicine = (id) => {
        let medicine = medicines.filter(m => m.id === id)[0]
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
            sale_price: 0,
            total_price: medicine.unit_price * medicine.quantity || 0,
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
            let p = array[index].unit_price;
            if (name === "quantity") {
                if (value <= 0 || isNaN(value)) {
                    toast.error("Quantity must be greater than zero");
                    return products;
                }
                q = value;
            } else if (name === "unit_price") {
                p = value;
            }
            array[index] = {...array[index], [name]: value, total_price: p * q};
            return array;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!purchase.supplier_id) {
            toast.error("Distributor Name is required");
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
        let submit = {...purchase};
        submit.amount = totalAmount;
        submit.products = products;
        purchaseService.create(submit).then((res) => {
            navigate("/purchases");
            toast.success("Purchase Created Successfully");
        });
    };

    const totalPurchasePrice = products.reduce((sum, product) => sum + Number(product.total_price || 0), 0);

    return (
        <>
            <form className="w-[90%] m-auto">
                <h1 className="m-[30px] text-center font-[700] text-[20px]">
                    Record Medicine Purchases
                </h1>
                <div className="mt-10 pb-4">
                    <div className="grid grid-cols-3 gap-3">
                        <div className={`flex flex-col`}>
                            <label className="font-semibold text-sm">Distributor</label>
                            <AutoComplete
                                ref={medicineRef}
                                className={`w-full mt-1`}
                                options={distributorsOptions}
                                // value={selectedProduct}
                                onChange={(v) => handleSelectDistributor(v.value)}
                                placeholder="Search Distributor"
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
                        <div className="flex flex-col">
                            <label className="font-semibold text-sm">Bill Type</label>
                            <select
                                className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1">
                                <option value="cash">Cash</option>
                                <option value="credit">Credit</option>
                            </select>
                        </div>
                    </div>

                    <hr className="mt-4"/>
                    <div className="flex w-[50%] , mt-4 ">
                        <AutoComplete
                            ref={medicineRef}
                            className={`w-full`}
                            options={medicinesOptions}
                            // value={selectedProduct}
                            onChange={(v) => handleSelectMedicine(v.value)}
                            placeholder="Search Medicine"
                        />
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
                                    Purchase Price/Unit
                                </th>
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
                                        <td className="p-3 w-[12%]">
                                            <input
                                                value={product.batch_no}
                                                type="text"
                                                name="batch_no"
                                                className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1 w-20"
                                                onChange={(e) =>
                                                    handleQuantity(index, e.target.name, e.target.value)
                                                }
                                            />
                                        </td>
                                        <td className="p-3 w-[10%]">
                                            <input
                                                value={product.box}
                                                type="number"
                                                name="box"
                                                className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1 w-20"
                                                onChange={(e) =>
                                                    handleQuantity(index, e.target.name, e.target.value)
                                                }
                                            />
                                        </td>
                                        <td className="p-3 w-[8%]">
                                            <input
                                                value={product.pack}
                                                type="number"
                                                name="pack"
                                                className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1 w-20"
                                                onChange={(e) =>
                                                    handleQuantity(index, e.target.name, e.target.value)
                                                }
                                            />
                                        </td>
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
                                        <td className="p-3 w-[8%]">
                                            <input
                                                value={product.unit_price}
                                                type="text"
                                                name="unit_price"
                                                className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1 w-20"
                                                onChange={(e) =>
                                                    handleQuantity(index, e.target.name, e.target.value)
                                                }
                                            />
                                        </td>
                                        <td className="p-3 w-[10%]">
                                            <input
                                                value={product.sale_price}
                                                type="text"
                                                name="sale_price"
                                                className="bg-gray-100 px-3 py-2 text-sm border-b-2 rounded-lg focus:outline-none focus:border-primary mt-1 w-20"
                                                onChange={(e) =>
                                                    handleQuantity(index, e.target.name, e.target.value)
                                                }
                                            />
                                        </td>
                                        <td className="p-3 w-[10%]">{product.total_price}</td>
                                        <td className="p-3 w-[10%] text-center">
                                            <IconButton
                                                onClick={() => handleRemovePurchase(index)}
                                                color="error"
                                            >
                                                <Remove/>
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
                            <tr className="bg-gray-100 font-bold">
                                <td colSpan="10" className="p-3 text-right text-sm">Total:</td>
                                <td colSpan="11" className="p-3 text-sm">{totalPurchasePrice.toFixed(2)}</td>
                            </tr>
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
                                "&:hover": {backgroundColor: "#00A95D"},
                            }}
                        >
                            Generate Purchase Invoice
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
        </>
    );
};

export default RecordPurchases;
