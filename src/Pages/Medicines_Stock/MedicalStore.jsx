import React, { useEffect, useState } from "react";
import { Pagination, Stack, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import PaginationComponent from "../../Components/PaginationComponent";
import toast from "react-hot-toast";
import medicineService from "../../Services/medicineService";

const MedicalStore = () => {
  const [searchData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMedicines = async () => {
      try {
        setLoading(true);
        const response = await medicineService.fetchAll();
        console.log(response); 
        setRecords(response.medicines); 
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Error fetching Patients");
      }
    };
    getMedicines();
  }, []);

  useEffect(() => {
    const filteredResult =
      records?.filter((item) =>
        item?.medicine_name?.toLowerCase().includes(searchData.toLowerCase())
      ) || [];
    setFilteredData(filteredResult);
    setCurrentPage(1);
  }, [searchData, records]);

  const handlePageChange = (event, page) => {
        setCurrentPage(page);
  }

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(filteredData?.slice(startIndex, endIndex) || []);
  }, [currentPage, filteredData]);

  return (
    <div>
      <div className="p-4">
        <h1 className="ml-[3%] text-[19px] text-gray-700 font-[700]">
          Medicines
        </h1>
        <h1 className="ml-[3%] text-[13px] text-gray-700 mb-4">
          {filteredData?.length || 0} records found
        </h1>

        <div className="flex mt-8 flex-row justify-start px-[3%]">
        <div className="w-[40%]">
            <input
              type="search"
              placeholder="Search Here..."
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              className="block w-[90%] pl-10 text-gray-900 p-2 border-b-2 border-gray-200 focus:border-primary focus:outline-none"
            />
            <SearchIcon className="mt-[-4rem] text-gray-400 ml-2" />
          </div>
          {/* <Link to="SaleMedicine">
            <button className="bg-[#2D583A] text-white h-[2rem] px-4 rounded-md font-[600] text-[14px]">
              + Sale Medicine
            </button>
          </Link>

          <Link to="SaleServices">
            <button className="bg-[#f8f8f8] h-[2rem] px-4 rounded-md text-black font-[600] text-[14px] border-2">
              + Sale Services
            </button>
          </Link> */}
        </div>

        <div className="mx-[3%]">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-xl shadow-gray-300">
            <thead>
              <tr className="bg-primary text-white text-xs capitalize leading-normal text-left">
                <th className="p-4 w-[10%]">
                  Sr No.
                </th>
                <th className="p-4 w-[20%]">
                  Medicine Name
                </th>
                <th className="p-4 w-[15%]">
                  Qty
                </th>
                <th className="p-4 w-[15%]">
                  Price
                </th>
                <th className="p-4 w-[15%]">
                  Supplier Name
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((patient, index) => (
                <tr
                  key={patient?.patient_id}
                  className="text-xs border-t border-gray-200"
                >
                  <td className="p-4 w-[10%] font-bold text-primary">
                    {index + 1}.
                  </td>
                  <td className="p-4 w-[20%] font-bold">
                    {patient?.medicine_name}
                  </td>
                  <td className="p-4 w-[15%]">
                    {patient?.quantity_in_stock}
                  </td>
                  <td className="p-4 w-[15%]">
                    {patient?.price}
                  </td>
                  <td className="p-4 w-[15%]">
                    {patient?.supplier_name}
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
    </div>
  );
};

export default MedicalStore;
