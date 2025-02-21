import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import PaginationComponent from "../../Components/PaginationComponent";
import toast from "react-hot-toast";
import medicineService from "../../Services/medicineService";
import productService from "../../Services/productService";

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
        const response = await productService.fetchAll();
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
              placeholder="Search Medicines Here..."
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

        <PaginationComponent
          filteredData={filteredData}
          setPaginatedData={setPaginatedData}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default MedicalStore;
