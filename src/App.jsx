import { useEffect, useState } from "react";
import "./index.css";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import PortalLayout from "./Components/PortalLayout";
import Cookies from "js-cookie";

import Login from "./Pages/Login/Login";
import Sales from "./Pages/Sales/Sales";
import RecordSales from "./Pages/Sales/RecordSales";
import Purchases from "./Pages/Purchases/Purchases";
import RecordPurchases from "./Pages/Purchases/RecordPurchases";
import Suppliers from "./Pages/Suppliers/Suppliers";
import RecordSuppliers from "./Pages/Suppliers/RecordSuppliers";
import SupplierLedger from "./Pages/Suppliers/SupplierLedger";
import POS from "./Pages/POS/POS";
import Products from "./Pages/Products/Products";
import Income from "./Pages/Accounts/Income";
import Expense from "./Pages/Accounts/Expense";
import Return from "./Pages/Accounts/Return";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated])

  useEffect(() => {
    const token = Cookies.get("RVkXIOQUNVU1RPTUVSLUFVVEhFTlRJQ0FUSU9OIMSLQ1JFVC1L=");
    if (token) {
      setIsAuthenticated(true);  
    } else {
      setIsAuthenticated(false); 
    }
  }, [location.pathname]);  

  return (

<<<<<<< HEAD
    <Routes basename={"/"}>

    <Route path="/" element={<Navigate to="/pos" replace />} />
    <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/pos" />} />
    
    {/* Medicines */}
    <Route path="/products" element={isAuthenticated ?  <PortalLayout> <Products/> </PortalLayout>  : <Navigate to="/login" />} />
    
    {/* Sales */}
    <Route path="/sales" element={isAuthenticated ?  <PortalLayout> <Sales /> </PortalLayout>  : <Navigate to="/login" />} />
    <Route path="/sales/RecordSales" element={isAuthenticated ?  <PortalLayout> <RecordSales /> </PortalLayout> : <Navigate to="/login" />} />
=======
          <Routes basename={"/"}>

          <Route path="/" element={<Navigate to="/pos" replace />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/pos" />} />
          {/* Medicines */}
          <Route path="/products" element={isAuthenticated ?  <PortalLayout> <Products/> </PortalLayout>  : <Navigate to="/login" />} />
          <Route path="/AddEditMedical" element={isAuthenticated ?  <PortalLayout> <AddEditMedicalStore /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/SaleMedicine" element={isAuthenticated ?  <PortalLayout> <SaleMedicine /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/SaleServices" element={isAuthenticated ?  <PortalLayout> <SaleServices /> </PortalLayout> : <Navigate to="/login" />} />
          {/* Sales */}
          <Route path="/sales" element={isAuthenticated ?  <PortalLayout> <Sales /> </PortalLayout>  : <Navigate to="/login" />} />
          <Route path="/sales/RecordSales" element={isAuthenticated ?  <PortalLayout> <RecordSales /> </PortalLayout> : <Navigate to="/login" />} />
>>>>>>> b1184579ca0f9e386472963553a1573fba559ef5

    {/* Purchases */}
    <Route path="/purchases" element={isAuthenticated ?  <PortalLayout> <Purchases /> </PortalLayout>  : <Navigate to="/login" />} />
    <Route path="/purchases/RecordPurchases" element={isAuthenticated ?  <PortalLayout> <RecordPurchases /> </PortalLayout> : <Navigate to="/login" />} />
   
    {/* Suppliers */}
    <Route path="/suppliers" element={isAuthenticated ?  <PortalLayout> <Suppliers /> </PortalLayout>  : <Navigate to="/login" />} />
    <Route path="/suppliers/RecordSuppliers" element={isAuthenticated ?  <PortalLayout> <RecordSuppliers /> </PortalLayout> : <Navigate to="/login" />} />
    <Route path="/suppliers/SupplierLedger/:id" element={isAuthenticated ?  <PortalLayout> <SupplierLedger /> </PortalLayout> : <Navigate to="/login" />} />

     {/* Accounts */}
    <Route path="/pos" element={isAuthenticated ?  <PortalLayout> <POS /> </PortalLayout> : <Navigate to="/login" />} />
    <Route path="/accounts" element={isAuthenticated ?  <PortalLayout> <Income /> </PortalLayout> : <Navigate to="/login" />} />
    <Route path="/accounts/expense" element={isAuthenticated ?  <PortalLayout> <Expense /> </PortalLayout> : <Navigate to="/login" />} />
    <Route path="/accounts/return" element={isAuthenticated ?  <PortalLayout> <Return /> </PortalLayout> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
