import React, { useEffect, useState } from 'react'
import QueryModal from './modal/querymodal';
import Swal from 'sweetalert2';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';


export default function GeneralTable(props) {
    //store data to data when table row is clicked for sorting purpose
    const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
        // Calculate the index range for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const [sortActive, setSortActive] = useState(false)

        useEffect(() => {
          setCurrentPage(1)
        
    
        }, [props.tableData])

            // Get the current page's tableData
    const currentData = props.tableData? sortActive?
    sortedData().slice(startIndex,endIndex)
    :props.tableData.slice(startIndex, endIndex):'';
  
    // Function to navigate to the next page
    const nextPage = () => {
      if (currentPage < Math.ceil(props.tableData.length / itemsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    };

    //Function to go to the last page
    const endPage = () => {
      const totalPages = Math.ceil(props.tableData.length / itemsPerPage);
      if (currentPage !== totalPages) {
        setCurrentPage(totalPages);
      }
    };
    
  
    // Function to navigate to the previous page
    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

        // Function to navigate to the previous page
    const startPage = () => {
      if (currentPage > 1) {
        setCurrentPage(1);
      }
    };
    const [style, setStyle] = useState()

    useEffect(() => {
      import('react-syntax-highlighter/dist/esm/styles/prism/material-dark')
        .then(mod => setStyle(mod.default));
    }, []);

   const handleUseThisQueryModal = (rowData) => {
    if(props.disable == false){
      console.log(rowData.script);

      let sqlScript;
    
      // Check if rowData.script is an object
      if (typeof rowData.script === 'object') {
        // Extract a specific property or convert the object to a string
        sqlScript = JSON.stringify(rowData.script, null, 2);
      } else if (typeof rowData.script === 'string') {
        // If rowData.script is already a string, use it directly
        sqlScript = rowData.script;
      }
    
      Swal.fire({
        title: 'Use This Query?',
        text: rowData.script, 
        showCancelButton: true,
        confirmButtonText: 'Yes, use it!',
        cancelButtonText: 'No, cancel',
        confirmButtonColor: '#053B50',
        cancelButtonColor: 'red',
      }).then((result) => {
        if (result.isConfirmed) {
          // Handle confirmation action here
          props.closeViewModal()
          props.getQuery(rowData.script)
          console.log('Query used:', sqlScript);
          
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          console.log('User cancelled');
        }
      });
    }
  
};

    
  return (
    <div>   
   <div className='flex gap-9 md:gap-6 xl:gap-9 2xl:gap-16 bg-white rounded h-fit shadow-md overflow-x-auto mb-5 items-center'>
  {currentData.length > 0 && (
   <table className="w-full " style={{ borderCollapse: 'collapse' }}>
   <thead>
     <tr>
       {Object.keys(currentData[0]).map((column, index) => (
         <th className="text-sm md:text-base text-center" key={index} style={{ background: '#f2f2f2',  border: '1px solid #ddd', fontWeight: 'bold', color: '#333' }}>
           {column.toUpperCase()}
         </th>
       ))}
     </tr>
   </thead>
   <tbody>
     {currentData.map((row, rowIndex) => (
       <tr
         key={rowIndex}
         className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-grey-primary hover:cursor-pointer`}
         onClick={() => {setData(row);handleUseThisQueryModal(row)}}
       >
         {Object.values(row).map((cell, cellIndex) => (
           <td className="p-2 md:p-4 text-center" key={cellIndex} style={{ padding: '8px', border: '1px solid #ddd', color: cellIndex % 2 === 0 ? '#007BFF' : '#333' }}>
             {cell}
           </td>
         ))}
       </tr>
     ))}
   </tbody>
 </table>
 
  )}
  {currentData.length === 0 && (
    <div className='flex justify-center w-[100%]'>
    <p>No data available</p>

      </div>
  )}
</div>
  <div className={`mt-4 flex justify-center gap-5 ${props.isLaptop?'flex-wrap':''}`}>
          <button
            onClick={startPage}
            disabled={currentPage === 1}
            className="bg-navy-primary text-white px-4 py-2 rounded-md disabled:bg-gray-300 hover:bg-opacity-95"
          >
            Start
          </button>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="bg-navy-primary text-white px-4 py-2 rounded-md disabled:bg-gray-300 hover:bg-opacity-95"
          >
            Previous
          </button>
          <label>
            {props.tableData?props.tableData.length:''} 
          </label>
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(props.tableData.length / itemsPerPage) || props.tableData.length == 0}
            className="bg-navy-primary text-white px-4 py-2 rounded-md disabled:bg-gray-300 hover:bg-opacity-95"
          >
            Next
          </button>
          <button
            onClick={endPage}
            disabled={currentPage === Math.ceil(props.tableData.length / itemsPerPage)  || props.tableData.length == 0}
            className="bg-navy-primary text-white px-4 py-2 rounded-md disabled:bg-gray-300 hover:bg-opacity-95"
          >
            End
          </button>
        </div>
        {/* <QueryModal isOpen={showQueryModal} isClose={()=> setShowQueryModal(!showQueryModal)} data={data}/> */}
  </div>
  )
}
