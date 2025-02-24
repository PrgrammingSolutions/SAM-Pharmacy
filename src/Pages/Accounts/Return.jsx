import { Eye } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from "@mui/icons-material/Search";

const Return = () => {
  return (
    <div>
      <div className="p-4">
        <h1 className="ml-[3%] text-[19px] text-gray-700 font-[700]">
         Returns
        </h1>
        <h1 className="ml-[3%] text-[13px] text-gray-700 mb-4">
          0 records found
        </h1>

        <div className="flex mt-8 flex-row-reverse justify-between px-[3%]">
          <Link to="RecordSuppliers">
            <button className="bg-white text-primary shadow-[2px_2px_6px_rgba(0,0,0,0.2)] px-8 py-3 rounded-lg font-[600] text-[14px]">
              + Add Return
            </button>
          </Link>

          <div className="w-[40%]">
            <input
              type="search"
              placeholder="Search Returns..."
              className="block w-[90%] pl-10 text-gray-900 p-2 border-b-2 border-gray-200 focus:border-primary focus:outline-none"
            />
            <SearchIcon className="mt-[-4rem] text-gray-400 ml-2" />
          </div>
        </div>

        <div className="mx-[3%]">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-xl shadow-gray-300">
            <thead>
              <tr className="bg-primary text-white capitalize leading-normal text-xs text-left">
                <th className="p-4 w-[10%]">
                  Id
                </th>
                <th className="p-4 w-[25%]">
                  Supplier Name
                </th>
                <th className="p-4 w-[15%]">
                  Phone No.
                </th>
                <th className="p-4 w-[15%]">
                  Address
                </th>
                <th className="p-4 w-[15%] text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
                <tr
                  className="text-xs border-t border-gray-200"
                >
                  <td className="p-3 w-[10%] text-left font-bold text-primary">
                    1.
                  </td>
                  <td className="p-3 w-[25%] text-left font-bold">
                    Abdul Rehman
                  </td>
                  <td className="p-3 w-[15%] text-left">
                    0321 4533561
                  </td>
                  <td className="p-3 w-[15%] text-left">
                    Lahore
                  </td>
                  <td className="p-3 w-[15%] text-center">
                    <button>
                      <Eye className="w-5 h-5 text-gray-500 hover:text-primary cursor-pointer" />
                    </button>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
{/* 
        <PaginationComponent
          filteredData={filteredData}
          setPaginatedData={setPaginatedData}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        /> */}

      {/* <div className="flex justify-center my-4">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(filteredData.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div> */}

      </div>
    </div>
  )
}

export default Return