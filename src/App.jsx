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

import MedicalStore from "./Pages/Dispensary/MedicalStore";
import SaleMedicine from "./Pages/Dispensary/SaleMedicine";
import Login from "./Pages/Login/Login";
import AddEditMedicalStore from "./Pages/Dispensary/AddEditMedicalStore";
import { Toaster } from "react-hot-toast"; 
import SaleServices from "./Pages/Dispensary/SaleServices";

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
          <Route path="/dispenser" element={isAuthenticated ?  <PortalLayout> <MedicalStore /> </PortalLayout>  : <Navigate to="/login" />} /> 
          <Route path="/dispenser/AddEditMedical" element={isAuthenticated ?  <PortalLayout> <AddEditMedicalStore /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/dispenser/SaleMedicine" element={isAuthenticated ?  <PortalLayout> <SaleMedicine /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/dispenser/SaleServices" element={isAuthenticated ?  <PortalLayout> <SaleServices /> </PortalLayout> : <Navigate to="/login" />} />
          {/* Sales */}
          <Route path="/sales" element={isAuthenticated ?  <PortalLayout> <MedicalStore /> </PortalLayout>  : <Navigate to="/login" />} /> 
          <Route path="/sales/AddEditMedical" element={isAuthenticated ?  <PortalLayout> <AddEditMedicalStore /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/sales/SaleMedicine" element={isAuthenticated ?  <PortalLayout> <SaleMedicine /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/sales/SaleServices" element={isAuthenticated ?  <PortalLayout> <SaleServices /> </PortalLayout> : <Navigate to="/login" />} />
          {/* Purchases */}
          <Route path="/purchases" element={isAuthenticated ?  <PortalLayout> <MedicalStore /> </PortalLayout>  : <Navigate to="/login" />} /> 
          <Route path="/purchases/AddEditMedical" element={isAuthenticated ?  <PortalLayout> <AddEditMedicalStore /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/purchases/SaleMedicine" element={isAuthenticated ?  <PortalLayout> <SaleMedicine /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/purchases/SaleServices" element={isAuthenticated ?  <PortalLayout> <SaleServices /> </PortalLayout> : <Navigate to="/login" />} />
          {/* customers */}
          <Route path="/customers" element={isAuthenticated ?  <PortalLayout> <MedicalStore /> </PortalLayout>  : <Navigate to="/login" />} /> 
          <Route path="/customers/AddEditMedical" element={isAuthenticated ?  <PortalLayout> <AddEditMedicalStore /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/customers/SaleMedicine" element={isAuthenticated ?  <PortalLayout> <SaleMedicine /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/customers/SaleServices" element={isAuthenticated ?  <PortalLayout> <SaleServices /> </PortalLayout> : <Navigate to="/login" />} />
          {/* suppliers */}
          <Route path="/suppliers" element={isAuthenticated ?  <PortalLayout> <MedicalStore /> </PortalLayout>  : <Navigate to="/login" />} /> 
          <Route path="/suppliers/AddEditMedical" element={isAuthenticated ?  <PortalLayout> <AddEditMedicalStore /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/suppliers/SaleMedicine" element={isAuthenticated ?  <PortalLayout> <SaleMedicine /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/suppliers/SaleServices" element={isAuthenticated ?  <PortalLayout> <SaleServices /> </PortalLayout> : <Navigate to="/login" />} />

          </Routes>
  );
}

export default App;
