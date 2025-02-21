import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/plogo.png";

import { Popover, Transition } from "@headlessui/react";

import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MedicationIcon from "@mui/icons-material/Medication"
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StorefrontIcon from "@mui/icons-material/Storefront";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

// import {
//   SESSION_IS_AUTHENTICATED,
//   SESSION_USERINFO,
// } from "../Utills/Constants";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function PortalLayout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  //const [auth, setAuth] = useState(sessionStorage.getItem(SESSION_IS_AUTHENTICATED));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawer = () => {
    setOpen(!open);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const handleLogout = () => {
    localStorage.removeItem('user')
    Cookies.remove('RVkXIOQUNVU1RPTUVSLUFVVEhFTlRJQ0FUSU9OIMSLQ1JFVC1L=')
    toast.success("Logout Successfully")
    navigate('/login', { replace: true });
  }

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  return (
    <>
      {location.pathname === "/" ? (
        children
      ) : (
        <>
          <div className=" !flex !items-center">
            <CssBaseline />
            <AppBar
              className={`!bg-[#ffffff] !rounded-md !shadow-none mt-[-7px] ml-3 -z-50 ${
                open ? `!w-[84%]"` : `!w-[96%]`
              }`}
              sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
              open={open}
            >
              <Toolbar>
                <IconButton
                  aria-label="open drawer"
                  onClick={handleDrawer}
                  edge="start"
                  sx={{ marginLeft: 1 }}
                >
                  <MenuIcon className="text-gray-600 mt-[4px]" />
                </IconButton>
                <div className="ml-auto flex gap-2 items-center">
                  
                  <div className="flex items-center gap-2">
                    <AccountCircleIcon
                      className="text-gray-600 "
                      sx={{ fontSize: 22 }}
                    />
                    <Popover className="ml-auto">
                      <Popover.Button
                        onClick={toggleMenu}
                        className="flex gap-2 outline-none md:mr-6 cursor-pointer text-gray-700"
                      >
                        <IoIosArrowDown
                          className={`w-4 h-4 ${
                            isOpen
                              ? "-rotate-180 duration-300"
                              : "rotate-0 duration-300"
                          }`}
                        />
                      </Popover.Button>
                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform scale-95"
                        enterTo="transform scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform scale-100"
                        leaveTo="transform scale-95"
                      >
                        <Popover.Panel className="absolute right-10 bg-gray-50 border-2 border-gray-300 shadow-lg rounded-md w-[150px] text-black">
                          <div>
                            <div
                              className="flex text-gray-600 gap-6 p-2 cursor-pointer"
                              onClick={handleLogout}
                            >
                              <PowerSettingsNewIcon className="text-gray-600" />
                              <h1>LogOut</h1>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  </div>
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              open={open}
              sx={{
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  borderWidth: 0,
                  boxSizing: "border-box",
             
                  borderBottomRightRadius: 15,
                  backgroundColor: "#fff",
                  zIndex: "9999",
                  boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.1)",
                },
                border: "none",
              }}
            >
              <div>
                <img
                  src={logo}
                  alt=""
                  className={`${open ? "w-[6rem]" : "w-[5rem]"} ml-auto mr-auto my-4`}
                />
              </div>
              <div>
                <ul className="w-[100%]">
                  <li>
                    <div
                      onClick={() => navigate("/dispenser")}
                      className={`flex items-center p-2 cursor-pointer text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/dispenser"
                          ? "bg-primary text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      } ${open ? "ml-6" : "ml-0"}`}
                    >
                      <MedicationIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/dispenser"
                            ? "bg-primary text-white"
                            : ""
                        }`}
                        sx={{
                          boxShadow:
                            location.pathname === "/dispenser"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Medicines
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => navigate("/sales")}
                      className={`flex items-center p-2 cursor-pointer text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/sales"
                          ? "bg-primary text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      } ${open ? "ml-6" : "ml-0"}`}
                    >
                      <PointOfSaleIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/sales"
                            ? "bg-primary text-white"
                            : ""
                        }`}
                        sx={{
                          boxShadow:
                            location.pathname === "/sales"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Sales
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => navigate("/purchases")}
                      className={`flex items-center p-2 cursor-pointer text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/purchases"
                          ? "bg-primary text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      } ${open ? "ml-6" : "ml-0"}`}
                    >
                      <ShoppingBagIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/purchases"
                            ? "bg-primary text-white"
                            : ""
                        }`}
                        sx={{
                          boxShadow:
                            location.pathname === "/purchases"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Purchases
                      </span>
                    </div>
                  </li>
                
                  <li>
                    <div
                      onClick={() => navigate("/suppliers")}
                      className={`flex items-center p-2 cursor-pointer text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/suppliers"
                          ? "bg-primary text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      } ${open ? "ml-6" : "ml-0"}`}
                    >
                      <StorefrontIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/suppliers"
                            ? "bg-primary text-white"
                            : ""
                        }`}
                        sx={{
                          boxShadow:
                            location.pathname === "/suppliers"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Suppliers
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => navigate("/pos")}
                      className={`flex items-center p-2 cursor-pointer text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/pos"
                          ? "bg-primary text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      } ${open ? "ml-6" : "ml-0"}`}
                    >
                      <PointOfSaleIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/pos"
                            ? "bg-primary text-white"
                            : ""
                        }`}
                        sx={{
                          boxShadow:
                            location.pathname === "/pos"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        POS
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
              <DrawerHeader />
              <div
                className={`${
                  location.pathname === "/login" || location.pathname === "/"
                    ? "p-4"
                    : "bg-[#fff] min-h-[80vh]  p-4 m-1 shadow-lg rounded-md transition-all duration-300"
                }`}
              >
                {children}
              </div>
            </Box>
          </div>
        </>
      )}
    </>
  );
}

