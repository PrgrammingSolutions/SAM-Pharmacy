import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import PaginationComponent from "../../Components/PaginationComponent";
import toast from "react-hot-toast";
import medicineService from "../../Services/medicineService";
import { Eye } from "lucide-react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import InvoiceSaleModal from "../../Components/InvoiceSaleModal";
import salesService from "../../Services/salesService";
import moment from "moment";

const Sales = () => {
  const [searchData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getSales = async () => {
      try {
        setLoading(true);
        const response = await salesService.fetchAll();
        console.log(response);
        setRecords(response.sales);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Error fetching Sales");
      }
    };
    getSales();
  }, []);

  useEffect(() => {
    const filteredResult =
      records?.filter((item) =>
        item?.customer_name?.toLowerCase().includes(searchData.toLowerCase())
      ) || [];
    setFilteredData(filteredResult);
    setCurrentPage(1);
  }, [searchData, records]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(filteredData?.slice(startIndex, endIndex) || []);
  }, [currentPage, filteredData]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="p-4">
        <h1 className="ml-[3%] text-[19px] text-gray-700 font-[700]">Sales</h1>
        <h1 className="ml-[3%] text-[13px] text-gray-700 mb-4">
          {filteredData?.length || 0} records found
        </h1>

        <div className="flex mt-8 flex-row justify-between px-[3%]">
          {/* <Link to="RecordSales">
            <button className="bg-white text-primary shadow-[2px_2px_6px_rgba(0,0,0,0.2)] px-8 py-3 rounded-lg font-[600] text-[14px]">
              + Sale Medicine
            </button>
          </Link> */}

          <div className="w-[40%]">
            <input
              type="search"
              placeholder="Search Sales Here..."
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              className="block w-[90%] pl-10 text-gray-900 p-2 border-b-2 border-gray-200 focus:border-primary focus:outline-none"
            />
            <SearchIcon className="mt-[-4rem] text-gray-400 ml-2" />
          </div>
        </div>

        <div className="mx-[3%]">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-xl shadow-gray-300">
            <thead>
              <tr className="bg-primary text-white capitalize leading-normal text-xs text-left">
                <th className="p-4 w-[10%]">Sale</th>
                <th className="p-4 w-[25%]">Customer Name</th>
                <th className="p-4 w-[15%]">Amount</th>
                <th className="p-4 w-[15%]">Sale Date</th>
                <th className="p-4 w-[15%] text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((patient, index) => (
                <tr
                  key={patient?.patient_id}
                  className="text-xs border-t border-gray-200"
                >
                  <td className="p-3 w-[10%] text-left font-bold text-primary">
                    {index + 1}.
                  </td>
                  <td className="p-3 w-[25%] text-left font-bold">
                    {patient?.customer_name}
                  </td>
                  <td className="p-3 w-[15%] text-left">
                    {patient?.amount}
                  </td>
                  <td className="p-3 w-[15%] text-left">{moment(patient.date).format("ll")}</td>
                  <td className="p-3 w-[15%] text-center">
                    <button onClick={()=> setIsOpen(true)}>
                      <Eye className="w-5 h-5 text-gray-500 hover:text-primary cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center my-4">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(filteredData.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      </div>
      <InvoiceSaleModal
        open={isOpen}
        onClose={()=> setIsOpen(false)}
      />
    </div>
  );
};

export default Sales;
