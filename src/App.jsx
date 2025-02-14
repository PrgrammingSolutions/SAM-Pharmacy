import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./index.css";
import {
  Navigate,
  Route,
  Routes,
  Redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import PortalLayout from "./Components/PortalLayout";
import Cookies from "js-cookie";

import MedicinesStock from "./Pages/Medicines/MedicinesStock";
import SaleMedicine from "./Pages/Medicines/SaleMedicine";
import Login from "./Pages/Login/Login";
import AddEditMedicalStore from "./Pages/Medicines/AddEditMedicalStore";
import { Toaster } from "react-hot-toast"; 
import SaleServices from "./Pages/Medicines/SaleServices";
import Sales from "./Pages/Sales/Sales";
import RecordSales from "./Pages/Sales/RecordSales";
import Purchases from "./Pages/Purchases/Purchases";
import RecordPurchases from "./Pages/Purchases/RecordPurchases";
import Suppliers from "./Pages/Suppliers/Suppliers";

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
      setIsAuthenticated(true);  // User is authenticated
    } else {
      setIsAuthenticated(false); // No token found, set to false
    }
  }, [location.pathname]);  // Check authentication on path change
  
  return (
   
          <Routes>
            
          <Route path="/" element={<Navigate to="/dispenser" replace />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dispenser" />} />
          {/* Medicines */}
          <Route path="/dispenser" element={isAuthenticated ?  <PortalLayout> <MedicinesStock/> </PortalLayout>  : <Navigate to="/login" />} /> 
          <Route path="/dispenser/AddEditMedical" element={isAuthenticated ?  <PortalLayout> <AddEditMedicalStore /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/dispenser/SaleMedicine" element={isAuthenticated ?  <PortalLayout> <SaleMedicine /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/dispenser/SaleServices" element={isAuthenticated ?  <PortalLayout> <SaleServices /> </PortalLayout> : <Navigate to="/login" />} />
          {/* Sales */}
          <Route path="/sales" element={isAuthenticated ?  <PortalLayout> <Sales /> </PortalLayout>  : <Navigate to="/login" />} /> 
          <Route path="/sales/RecordSales" element={isAuthenticated ?  <PortalLayout> <RecordSales /> </PortalLayout> : <Navigate to="/login" />} />
          
            {/* Purchases */}
          <Route path="/purchases" element={isAuthenticated ?  <PortalLayout> <Purchases /> </PortalLayout>  : <Navigate to="/login" />} /> 
          <Route path="/purchases/RecordPurchases" element={isAuthenticated ?  <PortalLayout> <RecordPurchases /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/purchases/SaleMedicine" element={isAuthenticated ?  <PortalLayout> <SaleMedicine /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/purchases/SaleServices" element={isAuthenticated ?  <PortalLayout> <SaleServices /> </PortalLayout> : <Navigate to="/login" />} />
          {/* customers */}
          <Route path="/customers" element={isAuthenticated ?  <PortalLayout> <MedicinesStock /> </PortalLayout>  : <Navigate to="/login" />} /> 
          <Route path="/customers/AddEditMedical" element={isAuthenticated ?  <PortalLayout> <AddEditMedicalStore /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/customers/SaleMedicine" element={isAuthenticated ?  <PortalLayout> <SaleMedicine /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/customers/SaleServices" element={isAuthenticated ?  <PortalLayout> <SaleServices /> </PortalLayout> : <Navigate to="/login" />} />
          {/* suppliers */}
          <Route path="/suppliers" element={isAuthenticated ?  <PortalLayout> <Suppliers /> </PortalLayout>  : <Navigate to="/login" />} /> 
          <Route path="/suppliers/AddEditMedical" element={isAuthenticated ?  <PortalLayout> <AddEditMedicalStore /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/suppliers/SaleMedicine" element={isAuthenticated ?  <PortalLayout> <SaleMedicine /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/suppliers/SaleServices" element={isAuthenticated ?  <PortalLayout> <SaleServices /> </PortalLayout> : <Navigate to="/login" />} />

          </Routes>
  );
}

export default App;
