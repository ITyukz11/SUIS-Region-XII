import React, {useEffect, useState } from 'react'
import ProvinceDataModal from '../../../modal/provinceDataModal';
import {MdSouth } from 'react-icons/md';

export default function DashboardTable(props) {

    //store data to data when table row is clicked
    const [data, setData] = useState();
    const [showProvinceDataModal, setShowProvinceDataModal] = useState(false)
  
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    const [showSortSeqNo, setShowSortSeqNo]=useState(false);
    const [showSortArea, setShowSortArea]=useState(false);
    const [showSortFirstName, setShowSortFirstname]=useState(false);
    const [showSortMiddleName, setShowSortMiddleName]=useState(false);
    const [showSortLastName, setShowSortLastName]=useState(false);
    const [showSortGender, setShowSortGender]=useState(false);

    const [sortActive, setSortActive] = useState(false)

    const [sortActiveSeqNo, setSortActiveSeqNo]=useState(false);
    const [sortActiveArea, setSortActiveArea]=useState(false);
    const [sortActiveFirstName, setSortActiveFirstname]=useState(false);
    const [sortActiveMiddleName, setSortActiveMiddleName]=useState(false);
    const [sortActiveLastName, setSortActiveLastName]=useState(false);
    const [sortActiveGender, setSortActiveGender]=useState(false);

  //CHECK IF LOCALHOST OR ONLINE
  const isLocalhost = process.env.NEXT_PUBLIC_URL.includes('localhost');

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const noNumberColumnDatas = ['First Name', 'Middle Name', 'Last Name', 'Gender'];

    useEffect(() => {
      setCurrentPage(1)
    

    }, [props.tableData])
    
    const sortedData = (column) => {
      
      if (props.tableData) {
        if (noNumberColumnDatas.includes(column)) {
          if (sortActive) {
            return props.tableData.sort((a, b) => {
              return a[column].localeCompare(b[column]); // Sort alphabetically
            });
          } else {
            return props.tableData.sort((a, b) => {
              return b[column].localeCompare(a[column]); // Sort alphabetically in reverse
            });
          }
        } else {
          props.tableData.sort((a, b) => {
            const propA = a[column];
            const propB = b[column];
    
            if (sortActive) {
              return propA - propB; //Sort numeric
            } else {
              return propB - propA;
            } 
          });
        }
      } else {
        console.log("no data fetch props.tableData")
      }
    
      return props.tableData;
    };
    

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
    // const handlesSortData = props.tableData.sort((a, b) => {
    //     const propA = a['Collective CLOA Sequence Number'];
    //     const propB = b['Collective CLOA Sequence Number'];
    
    //     if (propA < propB) {
    //       return -1;
    //     } else if (propA > propB) {
    //       return 1;
    //     } else {
    //       return 0;
    //     }
    //   }).slice(startIndex,endIndex);

 const handlesColumnSort=(column)=>{
    setSortActive(!sortActive)
   
    sortedData(column)

    switch (column) {
      case 'Collective CLOA Sequence Number':
        setSortActiveSeqNo(!sortActiveSeqNo)
        break;
      case 'Actual area of tillage/cultivation (in square meters)':
        setSortActiveArea(!sortActiveArea)
        break;
      case 'First Name':
        setSortActiveFirstname(!sortActiveFirstName)
        break;
      case 'Middle Name':
        setSortActiveMiddleName(!sortActiveMiddleName)
        break;
      case 'Last Name':
        setSortActiveLastName(!sortActiveLastName)
        break;
      case 'Gender':
        setSortActiveGender(!sortActiveGender)
        break;     
      default:
        break;
    }
  }
    return (
      <div className='z-0'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[250px] h-fit">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th
                  scope="col"
                  className={`px-6 py-3 hover:bg-gray-300 hover:cursor-pointer`}
                  onMouseEnter={() => setShowSortSeqNo(true)}
                  onMouseLeave={() => setShowSortSeqNo(false)}
                  onClick={()=> handlesColumnSort('Collective CLOA Sequence Number')}
                >
                  <span className='flex items-center justify-between'>
                  CCLOA Seq. Number
                  <MdSouth className={`transition-opacity ${showSortSeqNo ? 'opacity-100' : 'opacity-0'} ${sortActiveSeqNo?'rotate-180':'rotate-0'} `}/>
                  </span>
                </th>
                <th scope="col"
                  className={`px-6 py-3 hover:bg-gray-300 hover:cursor-pointer`}
                  onMouseEnter={() => setShowSortArea(true)}
                  onMouseLeave={() => setShowSortArea(false)}
                  onClick={()=> handlesColumnSort('Actual area of tillage/cultivation (in square meters)')}>
                   <span className='flex items-center justify-between'>
                   Actual Area  
                  <MdSouth className={`transition-opacity ${showSortArea ? 'opacity-100' : 'opacity-0'} ${sortActiveArea?'rotate-180':'rotate-0'} `}/>
                   </span>              
                </th>
                <th scope="col"
                  className={`px-6 py-3 hover:bg-gray-300 hover:cursor-pointer`}
                  onMouseEnter={() => setShowSortFirstname(true)}
                  onMouseLeave={() => setShowSortFirstname(false)}
                  onClick={()=> handlesColumnSort('First Name')}>
                   <span className='flex items-center justify-between'>
                   First Name 
                  <MdSouth className={`transition-opacity ${showSortFirstName ? 'opacity-100' : 'opacity-0'} ${sortActiveFirstName?'rotate-180':'rotate-0'} `}/>
                   </span>              
                </th>
                <th scope="col"
                  className={`px-6 py-3 hover:bg-gray-300 hover:cursor-pointer`}
                  onMouseEnter={() => setShowSortMiddleName(true)}
                  onMouseLeave={() => setShowSortMiddleName(false)}
                  onClick={()=> handlesColumnSort('Middle Name')}>
                   <span className='flex items-center justify-between'>
                   Middle Name 
                  <MdSouth className={`transition-opacity ${showSortMiddleName ? 'opacity-100' : 'opacity-0'} ${sortActiveMiddleName?'rotate-180':'rotate-0'} `}/>
                   </span>              
                </th>
                <th scope="col"
                  className={`px-6 py-3 hover:bg-gray-300 hover:cursor-pointer`}
                  onMouseEnter={() => setShowSortLastName(true)}
                  onMouseLeave={() => setShowSortLastName(false)}
                  onClick={()=> handlesColumnSort('Last Name')}>
                   <span className='flex items-center justify-between'>
                   Last Name 
                  <MdSouth className={`transition-opacity ${showSortLastName ? 'opacity-100' : 'opacity-0'} ${sortActiveLastName?'rotate-180':'rotate-0'} `}/>
                   </span>              
                </th>
                <th scope="col"
                  className={`px-6 py-3 hover:bg-gray-300 hover:cursor-pointer`}
                  onMouseEnter={() => setShowSortGender(true)}
                  onMouseLeave={() => setShowSortGender(false)}
                  onClick={()=> handlesColumnSort('Gender')}>
                   <span className='flex items-center justify-between'>
                   Gender 
                  <MdSouth className={`transition-opacity ${showSortGender ? 'opacity-100' : 'opacity-0'} ${sortActiveGender?'rotate-180':'rotate-0'} `}/>
                   </span>              
                </th>
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
              {currentData.length>0? currentData.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-grey-primary hover:cursor-pointer`}
                  onClick={()=> {setData(item);setShowProvinceDataModal(true)}}
                >
                  <td>{item['Collective CLOA Sequence Number']}</td>
                  <td>{item['Actual area of tillage/cultivation (in square meters)']}</td>
                  <td>{item['First Name']}</td>
                  <td>{item['Middle Name']}</td>
                  <td>{item['Last Name']}</td>
                  <td>{item['Gender']}</td>
                </tr>
              )):<tr>
              <td className='text-center' colSpan={7}>{isLocalhost? 'No Data Found!':'Sorry raw datas are only available locally!'}</td>
              </tr>}
            </tbody>
          </table>
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
        <ProvinceDataModal isOpen={showProvinceDataModal} isClose={()=> setShowProvinceDataModal(!showProvinceDataModal)} data={data}/>
      </div>
    );
  }

