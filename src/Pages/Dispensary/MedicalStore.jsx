import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
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

        <div className="flex mt-8 flex-row-reverse justify-between px-[3%]">
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
          <div className="w-[40%]">
            <input
              type="search"
              placeholder="Search Here..."
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              className="block w-[90%] pl-10 text-gray-900 p-2 rounded-md border-gray-800 bg-[#F3F4F6] focus:outline-none"
            />
            <SearchIcon className="mt-[-4rem] text-gray-700 ml-2" />
          </div>
        </div>

        <div className="mx-[3%]">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#2D583A] text-white capitalize leading-normal">
                <th className="py-1 px-4 w-[10%] text-[.8rem] text-left">
                  Sr No.
                </th>
                <th className="py-4 px-4 w-[20%] text-[.8rem] text-left">
                  Medicine Name
                </th>
                <th className="py-4 px-4 w-[15%] text-[.8rem] text-left">
                  Qty
                </th>
                <th className="py-4 px-4 w-[15%] text-[.8rem] text-left">
                  Price
                </th>
                <th className="py-4 px-4 w-[15%] text-[.8rem] text-left">
                  Supplier Name
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((patient, index) => (
                <tr
                  key={patient?.patient_id}
                  className="bg-gray-100 text-gray-700 text-sm border-t border-gray-300"
                >
                  <td className="py-3 px-4 w-[10%] text-left font-semibold">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 w-[20%] text-left font-semibold">
                    {patient?.medicine_name}
                  </td>
                  <td className="py-3 px-4 w-[15%] text-left">
                    {patient?.quantity_in_stock}
                  </td>
                  <td className="py-3 px-4 w-[15%] text-left">
                    {patient?.price}
                  </td>
                  <td className="py-3 px-4 w-[15%] text-left">
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
