import React, { useEffect, useState } from 'react'
import ProvinceDataModal from '../../../modal/provinceDataModal';

export default function Saranganitable(props) {

    //store data to data when table row is clicked
    const [data, setData] = useState();
    const [showProvinceDataModal, setShowProvinceDataModal] = useState(false)
  
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

  
    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    // Get the current page's saranganiData
    const currentData = props.saranganiData? props.saranganiData.slice(startIndex, endIndex):'';
  
    // Function to navigate to the next page
    const nextPage = () => {
      if (currentPage < Math.ceil(props.saranganiData.length / itemsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    // Function to navigate to the previous page
    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

  console.log("currentData: ", Object.keys(currentData))
  console.log("currentData: ", currentData)

    return (
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[27vh]">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">CCLOA Seq. Number</th>
                <th scope="col" className="px-6 py-3">Actual Area</th>
                <th scope="col" className="px-6 py-3">First Name</th>
                <th scope="col" className="px-6 py-3">Middle Name</th>
                <th scope="col" className="px-6 py-3">Last Name</th>
                <th scope="col" className="px-6 py-3">Gender</th>
                <th scope="col" className="px-6 py-3">OCT/TCT Number</th>
                {/* {currentData.length > 0 && (
                  <tr>
                    {Object.keys(currentData[0]).map((column, index) => (
                      <th key={index} scope="col" className="px-6 py-3">
                        {column}
                      </th>
                    ))}
                  </tr>
                )} */}
              </tr>
            </thead>
            <tbody>
              {currentData.length>0?currentData.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-grey-primary hover:cursor-pointer`}
                  onClick={()=> {setData(item);setShowProvinceDataModal(true)}}
                >
                  <td >{item['Collective CLOA Sequence Number']}</td>
                  <td>{item['Actual area of tillage/cultivation (in square meters)']}</td>
                  <td>{item['First Name']}</td>
                  <td>{item['Middle Name']}</td>
                  <td>{item['Last Name']}</td>
                  <td>{item['Gender']}</td>
                  <td>{item['OCT/TCT Number']}</td>
                </tr>
              )):<tr>
                <td className='text-center' colSpan={7}>No Data Found!</td>
                </tr>}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center gap-10">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="bg-navy-primary text-white px-4 py-2 rounded-md disabled:bg-gray-300 hover:bg-opacity-95"
          >
            Previous
          </button>
          <label>
            {props.saranganiData?props.saranganiData.length:''} 
          </label>
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(props.saranganiData?props.saranganiData.length:'' / itemsPerPage)}
            className="bg-navy-primary text-white px-4 py-2 rounded-md disabled:bg-gray-300 hover:bg-opacity-95"
          >
            Next
          </button>
        </div>
        <ProvinceDataModal isOpen={showProvinceDataModal} isClose={()=> setShowProvinceDataModal(!showProvinceDataModal)} data={data}/>
      </div>
    );
  }

