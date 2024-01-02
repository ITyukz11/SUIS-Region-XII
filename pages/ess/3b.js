import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/layout'
import { MdFace3, MdFace6, MdFormatListNumbered, MdGroups2, MdMap, MdSearch, MdUpload, MdClose, MdThumbUpAlt, MdThumbDownAlt, MdChevronRight, MdChevronLeft } from 'react-icons/md'
import { Tab, Transition } from '@headlessui/react'
import csv from 'csv-parser'; // Import the csv-parser library
import Swal from 'sweetalert2'
import CountBlankModal from '../../components/ess/3a/modals/countblankmodal'
import DisableModal from '../../components/ess/3a/modals/disablemodal'
import Ess3aTable from '../../components/ess/3a/tables/ess-3a-table'
import Counter from '../../components/Counter'
import { useDatas } from '../api/Datas'
import TableModal from '../../components/ess/3a/modals/table-modal'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ThreeB() {
  const { isLocalhost, isMobile, isLaptop,    
    localStorageEss3BTotalSeqNo,
    localStorageEss3BTotalArea,
    localStorageEss3BTotalMale,
    localStorageEss3BTotalFemale,
    localStorageEss3BTotalARB,
    getEss3BDatas, ess3BnorthCotData, ess3BsaranganiData, ess3BsouthCotData, ess3BsultanKudaratData } = useDatas();


  const [totalSeqNo, setTotalSeqNo] = useState()
  const [totalArea, setTotalArea] = useState()
  const [totalMale, setTotalMale] = useState()
  const [totalFemale, setTotalFemale] = useState()
  const [totalARB, setTotalARB] = useState()

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingStatus, setUploadingStatus] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');

  
  //file name required 3a or 3b
  const [fileName, setFileName] = useState();


  //Modal for counting blanks
  const [showCountBlankModal, setShowCountBlankModal] = useState(false)
  const [showDisableModal, setShowDisableModal] = useState(false)

  //Show Yes ARB possession data
  const [yesARBPosShow, setYesARBPosShow] = useState(false)
  //Show No ARB possession data
  const [noARBPosShow, setNoARBPosShow] = useState(false)

  //ARB Possession data
  const [southCotARBPosData, setSouthCotARBPosData] = useState([]);
  const [northCotARBPosData, setNorthCotARBPosData] = useState([]);
  const [saranganiARBPosData, setSaranganiARBPosData] = useState([]);
  const [sultanKudaratARBPosData, setSultanKudaratARBPosData] = useState([]);

  //Raw Datas for ARB Still in Possession for table 
  const [data, setData] = useState()

  //Show arb possession raw datas modal
  const [showTableModal, setShowTableModal] = useState(false)
  const [provinceArb, setProvinceArb] = useState('')
  const [provinceImage, setProvinceImage] =useState('')

  const [showProvincialDatas, setShowProvincialDatass] = useState(false)

  const inputRef = useRef(null);

  const [activeTab, setActiveTab] = useState(''); // Initialize with the index of the default active tab NOT WORKING, I created tabIndex instead
  const [tabIndex, setTabIndex] = useState(0)
  //Getting the error message from api
  const [errorPostReq, setErrorPostReq] = useState('')
  const [errorActive, setErrorActive] = useState(false)

  //Check if batches are complete uploading
  const [batchUploadStatus, setBatchUploadStatus] = useState(false)
  const [uploadingSuccess, setUploadingSuccess] = useState(false)
  // Define a function to handle tab selection
  const handleTabChange = (menu) => {
    setActiveTab(menu); // Update the active tab index when a tab is selected3
  };

  async function uploadNewDatas(sql, values) {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sql: sql,
        values: values
      })
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3b/${activeTab}`, postData);

      if (!res.ok) {
        // Handle server error here (e.g., res.status >= 400)
        const errorResponse = await res.json();
        const errorMessage = errorResponse.error || "Server error occurred";
        console.log("Error Message: ", errorMessage);
        setErrorPostReq(await errorMessage); // Set the error message in state

        setErrorActive(true)

        return;

      }

      const response = await res.json();
      console.log("response: ", response)
      if (response.message === "Success") {
        console.log("Success: ", response)

        setUploadingSuccess(true)

        console.log("uploadingSuccess:", uploadingSuccess)
      } else {
        console.log("Failed", response)
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  async function deleteOldDatas(sql) {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sql: sql,
      })
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3b/${activeTab}`, postData);

      if (!res.ok) {
        // Handle server error here (e.g., res.status >= 400)
        const errorResponse = await res.json();
        const errorMessage = errorResponse.error || "Server error occurred";
        console.log("Error Message: ", errorMessage);
        setErrorPostReq(await errorMessage); // Set the error message in state

        setErrorActive(true)

        return;

      }

      const response = await res.json();
      console.log("response: ", response)
      if (response.message === "Success") {
        console.log("Success: ", response)
        console.log("Deleted Success:")
      } else {
        console.log("Failed", response)
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  async function deleteOldDatasOnline(sql) {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sql: sql,
      })
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3b/test-${activeTab}`, postData);

      if (!res.ok) {
        // Handle server error here (e.g., res.status >= 400)
        const errorResponse = await res.json();
        const errorMessage = errorResponse.error || "Server error occurred";
        console.log("Error Message: ", errorMessage);
        setErrorPostReq(await errorMessage); // Set the error message in state

        setErrorActive(true)

        return;

      }

      const response = await res.json();
      console.log("response: ", response)
      if (response.message === "Success") {
        console.log("Success: ", response)
        console.log("Deleted Success:")
      } else {
        console.log("Failed", response)
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  async function uploadToOnline(sql, values) {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sql: sql,
        values: values
      })
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3b/test-${activeTab}`, postData);

      if (!res.ok) {
        // Handle server error here (e.g., res.status >= 400)
        const errorResponse = await res.json();
        const errorMessage = errorResponse.error || "Server error occurred";
        console.log("Error Message: ", errorMessage);
        setErrorPostReq(await errorMessage); // Set the error message in state

        setErrorActive(true)

        return;

      }

      const response = await res.json();
      console.log("response: ", response)
      if (response.message === "Success") {
        console.log("Success Uploading online: ", response)
        console.log("Deleted Success:")
      } else {
        console.log("Failed", response)
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }


  //Handling Upload Success
  useEffect(() => {
    console.log("errorActive:", errorActive)
    console.log("uploadingSuccess:", uploadingSuccess)

    if (batchUploadStatus) {
      if (!errorActive && uploadingSuccess) {

        Swal.fire({
          title: 'Uploaded Successfully!',
          text: `${selectedFile ? selectedFile.name : ''}`,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#053B50'
        }).then((result) => {
          if (result.isConfirmed) {
            setUploadingStatus(!uploadingStatus)
            setBatchUploadStatus(false)
          }
        });
      } else {

        Swal.fire({
          title: 'Upload Failed!',
          html: `${selectedFile ? selectedFile.name : ''} <br> Error Message: <div style="max-height: 200px; overflow-y: auto;">${errorPostReq}</div>`,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#053B50',
        }).then((result) => {
          if (result.isConfirmed) {
            setErrorActive(false)
            setBatchUploadStatus(false)
          }
        });

      }
    }
  }, [batchUploadStatus])

  //Counting Sequence Number Function
  const countSequenceNo = (datas) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return <div role="status" className="max-w-sm animate-pulse" >
        <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-8 mb-4"></div>
      </div>;
    }

    let seqNoCount = 0
   // if (isLocalhost) {
      seqNoCount = datas.reduce((count, item) => {
        const seqNo = item['Collective CLOA Sequence Number']
        // Check if the item has a SeqNo property
        if (seqNo && seqNo>0)  {
          // Increment the count by 1 for each occurrence of SeqNo
          return count + 1;
        }
        return count;
      }, 0);
    // } else {
    //   seqNoCount = datas[0].seqno
    //   console.log("datas: ", datas)
    // }


    return seqNoCount;
  };
  // Function to count how many CLOA AREA
  const countAreas = (datas) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return <div role="status" className="max-w-sm animate-pulse">
        <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
      </div>; // return '-' if datas is not an array or is empty
    }
    let cloaAreaCount = 0
   
  //if (isLocalhost) {
    cloaAreaCount = datas ? datas.reduce((count, item) => {
      const area = item['Actual area of tillage/cultivation (in square meters)'];
      if (area && !isNaN(area) && area.length <8) {
        return count + parseFloat(area); // Parse and add the area value
      }
      return count;
    }, 0) : 0; // Set initial value to 0
  // } else {
  //     cloaAreaCount = datas[0].area
  //   }

    const finalArea = cloaAreaCount / 10000 //HAS hectare unit
    return finalArea;
  };
  const countTotalMales = (datas) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return <div role="status" className="max-w-sm animate-pulse">
        <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
      </div>; // return '-' if datas is not an array or is empty
    }
    let maleNoCount = 0
   // if (isLocalhost) {
      maleNoCount = datas ? datas.reduce((count, item) => {
        // Check if the item has a SeqNo property

        //Change to lowercase to match other cases
        const gender = item.Gender != null ? item.Gender.toLowerCase() : ''
        if (gender == "male") {
          // Increment the count by 1 for each occurrence of SeqNo
          return count + 1;
        }
        return count;
      }, 0) : '';
    // } else {
    //   maleNoCount = datas[0].male
    // }
    return maleNoCount;
  }
  const countTotalFemales = (datas) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return <div role="status" className="max-w-sm animate-pulse">
        <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
      </div>; // return '-' if datas is not an array or is empty
    }
    let femaleNoCount = 0
   // if (isLocalhost) {
      femaleNoCount = datas ? datas.reduce((count, item) => {
        // Check if the item has a SeqNo property

        //Change to lowercase to match other cases
        const gender = item.Gender != null ? item.Gender.toLowerCase() : ''
        if (gender == "female") {
          // Increment the count by 1 for each occurrence of SeqNo
          return count + 1;
        }
        return count;
      }, 0) : '';
    // } else {
    //   femaleNoCount = datas[0].female
    // }
    return femaleNoCount;
  }
  const countTotalARBs = (datas) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return (
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-4 mt-auto bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
        </div>
      );
    }
  
    // Create a Set to store unique names
    const uniqueNames = new Set();
  
    let totalARB = 0;
  
    //if (isLocalhost) {
      datas.forEach((item) => {
        const firstName =  item['First Name']
        const lastName =item['Last Name']
        if (firstName && lastName) {
          const fullName = `${firstName} ${lastName}`;
  
          // Check if the name is unique in the Set, then increment the count
          if (!uniqueNames.has(fullName)) {
            uniqueNames.add(fullName);
            totalARB += 1;
          }
        }
      });
    // } else {
    //   totalARB = datas[0].totalarb;
    // }
  
    return totalARB;
  };
  

  const countTotalYesOrNoArbInPos = (datas, possession) => {    
    let total = 0
        total += datas ? datas.reduce((count, item) => {
          //Change to lowercase to match other cases
          const arbStillInPossession = item['Is the ARB still in possession?'] != null ? item['Is the ARB still in possession?'].toLowerCase() : ''
          if (arbStillInPossession == possession) {
            // Increment the count by 1 for each occurrence of SeqNo && yes arb possession
            return count + 1;
          }
          return count;
        }, 0) : 0;
    
    return total; 
  }

  const calculateTotalStatistics = async () => {
    let totalSeqNo = 0;
    let totalArea = 0;
    let totalMale = 0;
    let totalFemale = 0;
    let totalARB = 0;

    const dataSources = [ess3BnorthCotData, ess3BsaranganiData, ess3BsouthCotData, ess3BsultanKudaratData];

    for (const data of dataSources) {
      if (data) {
        totalSeqNo += countSequenceNo(data);
        totalArea += countAreas(data);
        totalMale += countTotalMales(data);
        totalFemale += countTotalFemales(data);
        totalARB += countTotalARBs(data);
      }
    }
    if (!localStorageEss3BTotalSeqNo == undefined || localStorageEss3BTotalSeqNo !== totalSeqNo && !isNaN(totalSeqNo)) {
      setTotalSeqNo(totalSeqNo)
      localStorage.setItem('ess3bTotalSeqNo', totalSeqNo);
    }
    if (!localStorageEss3BTotalSeqNo == undefined || localStorageEss3BTotalSeqNo !== totalSeqNo && !isNaN(totalSeqNo)) {
      setTotalArea(totalArea)
      localStorage.setItem('ess3bTotalArea', totalArea);
    }
    if (!localStorageEss3BTotalSeqNo == undefined || localStorageEss3BTotalSeqNo !== totalSeqNo && !isNaN(totalSeqNo)) {
      setTotalMale(totalMale)
      localStorage.setItem('ess3bTotalMale', totalMale);
    }
    if (!localStorageEss3BTotalSeqNo == undefined || localStorageEss3BTotalSeqNo !== totalSeqNo && !isNaN(totalSeqNo)) {
      setTotalFemale(totalFemale)
      localStorage.setItem('ess3bTotalFemale', totalFemale);
    }
    if (!localStorageEss3BTotalSeqNo == undefined || localStorageEss3BTotalSeqNo !== totalSeqNo && !isNaN(totalSeqNo)) {
      setTotalARB(totalARB)
      localStorage.setItem('ess3bTotalARB', totalARB);
    }
    // Save the totals in local storage
  };

  const overviewData = (image, title, data) => {
    const styledImage = React.cloneElement(image, {
      className: 'sm:text-xl md:text-2xl lg:text-5xl xl:text-6xl 2xl:text-7xl',
    });
    return (
      <div className="w-fit flex flex-col gap-3 text-left items-center">
        <div className="flex flex-col items-center">
          {styledImage}
          <label className="font-bold text-navy-primary cursor-pointer">{title}</label>
          {isNaN(data) ? (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-7 bg-gray-200 rounded-md dark:bg-gray-700 w-14 mb-4"></div>
            </div>
          ) : (
            <label className="font-semibold mt-auto  sm:text-xs md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl cursor-pointer">{data ? Math.floor(data).toLocaleString() : ''}</label>
          )}
        </div>
      </div>
    )
  };
  const overviewProvinceData = (image, title, color, data) => {
    const styledImage = React.cloneElement(image, {
      className: 'sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl',
    });
    return (
      <div className='w-fit flex flex-col text-left justify-start items-center cursor-pointer'>
        {styledImage}
        <label className='font-bold text-navy-primary cursor-pointer'>{title}</label>
        <label className={`font-semibold ${color} mt-auto sm:text-xs md:text-base lg:text-base xl:text-lg 2xl:text-xl cursor-pointer`}>{Math.round(data) || data == 0 ? Math.round(data).toLocaleString() :
          <div role="status" className="max-w-sm animate-pulse">
            <div className="h-4 mt-auto bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
          </div>}</label>
      </div>
    )
  }
  //Function to count all ARB still in possession
  const countProvincesArbPossession = (possession) => {
      const datas = [ess3BnorthCotData ? ess3BnorthCotData : 0, ess3BsaranganiData ? ess3BsaranganiData : 0, ess3BsouthCotData ? ess3BsouthCotData : 0, ess3BsultanKudaratData ? ess3BsultanKudaratData : 0]
    
      if (!Array.isArray(datas) || datas.length === 0) {
        return <div role="status" className="max-w-sm animate-pulse">
          <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
        </div>; // return '-' if datas is not an array or is empty
      }
  
      let total = 0
      datas.forEach(data => {
        if (isLocalhost) {
          total += data ? data.reduce((count, item) => {
            //Change to lowercase to match other cases
            const arbStillInPossession = item['Is the ARB still in possession?'] != null ? item['Is the ARB still in possession?'].toLowerCase() : ''
            if (arbStillInPossession == possession) {
              // Increment the count by 1 for each occurrence of SeqNo && yes arb possession
              return count + 1;
            }
            return count;
          }, 0) : 0;
        } else {
          if (possession == 'yes') {
            total += data[0] ? data[0].yes_arb_in_possession : 0
          } else {
            total += data[0] ? data[0].no_arb_in_possession : 0
          }
        }
  
      });
  
      try {
        
          if(localStorageEss3bYesPossession != total  && possession == 'yes'){
            localStorage.setItem('ess3bYesArbInPossession', total);
            
          }
      
          if(localStorageEss3bNoPossession != total  && possession == 'no'){
            localStorage.setItem('ess3bNoArbInPossession', total)
            
          }
        
      } catch (e) {
        console.error("Error accessing localStorage: " + e);
      }
      return total;
    
  }
  //Function to count Seq No with YES ARB Possession
  const countARBPosSeqNo = (datas, possession) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return <div role="status" className="max-w-sm animate-pulse" >
        <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-8 mb-4"></div>
      </div>;
    }

    let total = 0
    if (isLocalhost) {
      total = datas.reduce((count, item) => {
        const CLOASeqNo = item['Collective CLOA Sequence Number']
        const arbStillInPossession = item['Is the ARB still in possession?'] != null ? item['Is the ARB still in possession?'].toLowerCase() : ''
        // Check if the item has a SeqNo property
        if (CLOASeqNo && arbStillInPossession == possession) {
          // Increment the count by 1 for each occurrence of SeqNo
          return count + 1;
        }
        return count;
      }, 0);
    } else {
      if(possession=='yes'){
        total = datas[0].seqno_yes_arb_in_possession
      }else{
        total = datas[0].seqno_no_arb_in_possession
      }
    }


    return total;
  };
  //Function to count Area with YES ARB Possession
  const countARBPosAreas = (datas, possession) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return <div role="status" className="max-w-sm animate-pulse">
        <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
      </div>; // return '-' if datas is not an array or is empty
    }
    let total = 0
    if (isLocalhost) {
      total = datas ? datas.reduce((count, item) => {
        // Check if the item has CLOA AREA data

        const area = item['Actual area of tillage/cultivation (in square meters)']
        const arbStillInPossession = item['Is the ARB still in possession?'] != null ? item['Is the ARB still in possession?'].toLowerCase() : ''
        if (area && area != 0 && arbStillInPossession == possession) {
          // Increment the count by 1 for each occurrence of CLOA AREA
          return count + 1;
        }
        return count;
      }, 0) : '';
    } else {
      if(possession=='yes'){
        total = datas[0].area_yes_arb_in_possession
      }else{
        total = datas[0].area_no_arb_in_possession
      }
    }
    return total;
  };
  //Function to count Males with YES ARB Possession
  const countARBPosMales = (datas, possession) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return <div role="status" className="max-w-sm animate-pulse">
        <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
      </div>; // return '-' if datas is not an array or is empty
    }
    let total = 0
    if (isLocalhost) {
      total = datas ? datas.reduce((count, item) => {
        // Check if the item has a SeqNo property

        //Change to lowercase to match other cases
        const gender = item.Gender != null ? item.Gender.toLowerCase() : ''
        const arbStillInPossession = item['Is the ARB still in possession?'] != null ? item['Is the ARB still in possession?'].toLowerCase() : ''
        if (gender == "male" && arbStillInPossession == possession) {
          // Increment the count by 1 for each occurrence of SeqNo
          return count + 1;
        }
        return count;
      }, 0) : '';
    } else {
      if(possession=='yes'){
        total = datas[0].male_yes_arb_in_possession
      }else{
        total = datas[0].male_no_arb_in_possession
      }
    }


    return total;
  }
  //Function to count Females with YES ARB Possession
  const countARBPosFemales = (datas, possession) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return <div role="status" className="max-w-sm animate-pulse">
        <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
      </div>; // return '-' if datas is not an array or is empty
    }
    let total = 0
    if (isLocalhost) {
      total = datas ? datas.reduce((count, item) => {
        // Check if the item has a SeqNo property

        //Change to lowercase to match other cases
        const gender = item.Gender != null ? item.Gender.toLowerCase() : ''
        const arbStillInPossession = item['Is the ARB still in possession?'] != null ? item['Is the ARB still in possession?'].toLowerCase() : ''
        if (gender == "female" && arbStillInPossession == possession) {
          // Increment the count by 1 for each occurrence of SeqNo
          return count + 1;
        }
        return count;
      }, 0) : '';
    } else {
      if(possession=='yes'){
        total = datas[0].female_yes_arb_in_possession
      }else{
        total = datas[0].female_no_arb_in_possession
      }
    }


    return total;
  }
  //Function to count Total ARBs with YES ARB Possession
  const countARBPosTotalARBs = (datas, possession) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return <div role="status" className="max-w-sm animate-pulse">
        <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
      </div>; // return '-' if datas is not an array or is empty
    }

    let total = 0
    if(isLocalhost){
      total += datas ? datas.reduce((count, item) => {
        //Change to lowercase to match other cases
        const arbStillInPossession = item['Is the ARB still in possession?'] != null ? item['Is the ARB still in possession?'].toLowerCase() : ''
        if (arbStillInPossession == possession) {
          // Increment the count by 1 for each occurrence of SeqNo
          return count + 1;
        }
        return count;
      }, 0) : '';
    }else{
      if(possession=='yes'){
        total = datas[0].totalarb_yes_arb_in_possession
      }else{
        total = datas[0].totalarb_no_arb_in_possession
      }
    }



    return total;
  }

// Function to get ARBs that are still in possession
const ARBPossessionRawDatas = (datas, possession) => {
  // Change to lowercase to match other cases
  const filteredData = datas ? datas.filter((item) => {
    if (item['Is the ARB still in possession?']?item['Is the ARB still in possession?'].toLowerCase() === possession:'') {
      return true;
    }
    return false;
  }) : '';
  return filteredData;
}

  useEffect(() => {
    calculateTotalStatistics();
  }, [ess3BnorthCotData, ess3BsaranganiData, ess3BsouthCotData, ess3BsultanKudaratData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadingStatus(true);
  };


  const handleUpload = () => {
    if (!selectedFile) {
      return
    } else {
      if (!selectedFile.name.includes("3b")) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please upload ESS 3B File only!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#053B50'
        })
      } else {
        Swal.fire({
          title: 'Uploading...',
          html: `${selectedFile.name} please wait!`,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            // Read the selected CSV file using FileReader
            const reader = new FileReader();

            reader.onload = async (event) => {
              const fileContent = event.target.result;

              // Parse the CSV content
              const datas = [];

              csv({ separator: ',' }) // You can specify the separator here if it's not a comma
                .on('data', (row) => {
                  const rowDataArray = Object.values(row);
                  const selectedData = {  // Use the found index, or an empty string if not found
                    'start': rowDataArray[0],
                    'end': rowDataArray[1],
                    'today': rowDataArray[2],
                    'username': rowDataArray[3],
                    'phonenumber': rowDataArray[4],
                    'audit': rowDataArray[5],
                    'Collective CLOA Sequence Number': rowDataArray[6],
                    'OCT/TCT Number': rowDataArray[7],
                    'Collective CLOA Number': rowDataArray[8],
                    'First Name': rowDataArray[9],
                    'Middle Name': rowDataArray[10],
                    'Last Name': rowDataArray[11],
                    'Actual area of tillage/cultivation (in square meters)': rowDataArray[12],
                    'Is the ARB still in possession?': rowDataArray[13],
                    'Gender': rowDataArray[14],
                    'Educational Attainment': rowDataArray[15],
                    'Civil Status': rowDataArray[16],
                  };
                  datas.push(selectedData);
                })
                .on('end', () => {

                  // Execute the SQL query with your database connection
                  // You can use your MySQL connection to execute the query here
                })
                .write(fileContent);
              const batchSize = 100; // Choose an appropriate batch size

              // Split the datas array into batches
              const batches = [];
              for (let i = 0; i < datas.length; i += batchSize) {
                batches.push(datas.slice(i, i + batchSize));
              }

              // Initialize a counter variable
              let completedBatches = 0;
              let parameterIndex = 1; // Initialize the parameter index

              // Loop through batches and insert data
              let currentTab = activeTab == 'north-cotabato' ? ess3BnorthCotData : activeTab == "sarangani" ? ess3BsaranganiData : activeTab == "south-cotabato" ? ess3BsouthCotData : activeTab == "sultan-kudarat" ? ess3BsultanKudaratData : ''

              if (currentTab.length > 1) {
                const sql = `DELETE FROM suis.ess_3b_${activeTab.replace(/-/g, "_")}`;
                console.log('SQL:', sql);
                await deleteOldDatas(sql)
              }

              for (const batch of batches) {
                const columns = Object.keys(batch[0]); // Assuming all objects have the same keys
                const columnsWithDoubleQuote = columns.map((column) => `"${column}"`);
                const placeholders = batch
                  .map(() =>
                    `(${columns.map(() => `$${parameterIndex++}`).join(', ')})`
                  )
                  .join(', ');

                // Reset the parameterIndex to 1 when it reaches 100
                if (parameterIndex > 100) {
                  parameterIndex = 1;
                }

                const values = batch.flatMap((obj) => columns.map((col) => obj[col]));


                const sql = `INSERT INTO suis.ess_3b_${activeTab.replace(/-/g, "_")} (${columnsWithDoubleQuote.join(', ')}) VALUES ${placeholders}`;
                console.log('SQL:', sql);
                console.log('values: ', values)
                console.log('Batch Size:', batch.length);


                // Execute the SQL query with your database connection here
                await uploadNewDatas(sql, values)
                  .then(async () => {
                    // Increment the counter when the batch is completed
                    completedBatches++;

                    // Check if all batches are completed
                    if (completedBatches === batches.length) {
                      // Perform any actions you need after all batches are done
                      setBatchUploadStatus(true);
                      console.log('All batches completed');
                      await getEss3BDatas().then(async () => {

                        //QUERY ONLINE for every newly uploaded do upload in online vercel postgres too
                        const onlineColumns = [
                        'SeqNo', //0
                        'Area', //1
                        'Male', //2
                        'Female', //3
                        'TotalARB',//4

                        'Yes_arb_in_possession',//5
                        'No_arb_in_possession',//6

                        'SeqNo_yes_arb_in_possession ',//7
                        'Area_yes_arb_in_possession',//8
                        'Male_yes_arb_in_possession',//9
                        'Female_yes_arb_in_possession',//10
                        'TotalARB_yes_arb_in_possession',//11

                        'SeqNo_no_arb_in_possession ',//12
                        'Area_no_arb_in_possession',//13
                        'Male_no_arb_in_possession',//14
                        'Female_no_arb_in_possession',//15
                        'TotalARB_no_arb_in_possession'//16
                      ]

                        let values = [];
                        onlineColumns.forEach(column => {
                          console.log('Processing column:', column);
                          if (column === 'SeqNo') {
                            values.push(countSequenceNo(datas).toString());
                          } else if (column === 'Area') {
                            values.push(countAreas(datas).toString());
                          } else if (column === 'Male') {
                            values.push(countTotalMales(datas).toString());
                          } else if (column === 'Female') {
                            values.push(countTotalFemales(datas).toString());
                          } else if (column === 'TotalARB') {
                            values.push(countTotalARBs(datas).toString());

                          } else if (column ==='Yes_arb_in_possession'){
                            values.push(countTotalYesOrNoArbInPos(datas,'yes').toString());  
                          } else if (column ==='No_arb_in_possession'){
                            values.push(countTotalYesOrNoArbInPos(datas,'no').toString());

                          } else if (column === 'SeqNo_yes_arb_in_possession ') {
                            values.push(countARBPosSeqNo(datas,'yes').toString());
                          } else if (column === 'Area_yes_arb_in_possession') {
                            values.push(countARBPosAreas(datas,'yes').toString());
                          } else if (column === 'Male_yes_arb_in_possession') {
                            values.push(countARBPosMales(datas,'yes').toString());
                          } else if (column === 'Female_yes_arb_in_possession') {
                            values.push(countARBPosFemales(datas,'yes').toString());
                          } else if (column === 'TotalARB_yes_arb_in_possession') {
                            values.push(countTotalYesOrNoArbInPos(datas,'yes').toString());
                           
                          } else if (column === 'SeqNo_no_arb_in_possession ') {
                            values.push(countARBPosSeqNo(datas,'no').toString());
                          } else if (column === 'Area_no_arb_in_possession') {
                            values.push(countARBPosAreas(datas,'no').toString());
                          } else if (column === 'Male_no_arb_in_possession') {
                            values.push(countARBPosMales(datas,'no').toString());
                          } else if (column === 'Female_no_arb_in_possession') {
                            values.push(countARBPosFemales(datas,'no').toString());
                          } else if (column === 'TotalARB_no_arb_in_possession') {
                            values.push(countTotalYesOrNoArbInPos(datas,'no'));
                          }
                        });

                        // If none of the conditions match, values will be an empty array

                        if (currentTab.length > 1) {
                          const sql = `DELETE FROM ess_3b_${activeTab.replace(/-/g, "_")}`;
                          console.log('SQL:', sql);
                          await deleteOldDatasOnline(sql)

                        }
                        let valuesColumnIndex = 1
                        const valuesColumn = onlineColumns.map(() => `$${valuesColumnIndex++}`).join(', ')
                        const sqlOnline = `INSERT INTO ess_3b_${activeTab.replace(/-/g, "_")} (${onlineColumns}) VALUES (${valuesColumn})`;

                        console.log("sqlOnline: ", sqlOnline)
                        console.log("sqlOnline values: ", values)
                        uploadToOnline(sqlOnline, values)
                      })



                      console.log("help batchUploadStatus: ", batchUploadStatus)
                      Swal.close(); // Close the Swal dialog

                    }
                  }).catch((error) => {
                    // Handle errors if needed
                    console.error('Error:', error);
                    Swal.fire({
                      title: 'Error!',
                      text: `Error occured while uploading...  ${error}`,
                      icon: 'error',
                      confirmButtonText: 'OK',
                      confirmButtonColor: '#053B50'
                    });
                  });

              }
            };
            reader.readAsText(selectedFile); // Read the file as text
          },
        })
      }
    }
  };

  const gridClassName = isLaptop ? 'flex flex-wrap gap-5 text-xs' : 'grid grid-rows-2 grid-flow-col gap-5 justify-items-center';

  const openFileInput = () => {
    // Click the hidden file input when the div is clicked
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handlesSearchQuery = (e) => {
    setSearchQuery(e.target.value)
  };
  const filteredNorthCotData = ess3BnorthCotData ? ess3BnorthCotData.filter((item) => {
    const values = Object.values(item);
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
    }
    return false;
  }) : '';

  const filteredSaranganiData = ess3BsaranganiData ? ess3BsaranganiData.filter((item) => {
    const values = Object.values(item);
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
    }
    return false;
  }) : '';

  const filteredSouthCotData = ess3BsouthCotData ? ess3BsouthCotData.filter((item) => {
    const values = Object.values(item);
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
    }
    return false;
  }) : '';

  const filteredSultanKudaratData = ess3BsultanKudaratData ? ess3BsultanKudaratData.filter((item) => {
    const values = Object.values(item);
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
    }
    return false;
  }) : '';



  const handlesShowARBposDatas = (possession) => {
    const datas = [
      ess3BnorthCotData ? ess3BnorthCotData : [],
      ess3BsaranganiData ? ess3BsaranganiData : [],
      ess3BsouthCotData ? ess3BsouthCotData : [],
      ess3BsultanKudaratData ? ess3BsultanKudaratData : [],
    ];

    if (yesARBPosShow || noARBPosShow) {
      for (let index = 0; index < datas.length; index++) {
        const province = datas[index];

        // Filter the data for 'yes' or 'no' value
        const ARBPossessionData = province.filter((data) => data['Is the ARB still in possession?'] ? data['Is the ARB still in possession?'].toLowerCase() == possession : []
        );

      
        switch (index) {
          case 0:
            setNorthCotARBPosData(ARBPossessionData);
            break;
          case 1:
            setSaranganiARBPosData(ARBPossessionData);
            break;
          case 2:
            setSouthCotARBPosData(ARBPossessionData);
            break;
          case 3:
            setSultanKudaratARBPosData(ARBPossessionData);
            break;
          default:
            break;
        }
      }
    }

    if (possession == 'yes') {
      setYesARBPosShow(!yesARBPosShow);
      setNoARBPosShow(false);
    } else {
      setYesARBPosShow(false);
      setNoARBPosShow(!noARBPosShow);
    }
  };

console.log("ess3BnorthCotData: ",ess3BnorthCotData)
const handlesTableModal = (province, provinceLogo,datas,possession,fileName) => {
  setProvinceArb(province)
  setProvinceImage(provinceLogo)
  setShowTableModal(!showTableModal)
  setFileName(fileName)
  setData(possession ? ARBPossessionRawDatas(datas, possession) : datas);
}
const tableSectionRef = useRef(null);

const scrollToSection = (ref) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth' }); 
  }
};

  const imgClassName = `${isMobile ? 'w-[50px] h-[50px]' : 'w-[100px] h-[100px]'} sm:w-[50px] md:w-[70px] lg:w-[80px] xl:w-[90px] 2xl:w-[100px] sm:h-[50px] md:h-[70px] lg:h-[80px] xl:h-[90px] 2xl:h-[100px]`
  const containerChildClassName = 'flex justify-around gap-2 bg-white rounded-3xl h-fit w-full p-4 shadow-md overflow-x-auto overflow-y-hidden cursor-pointer hover:bg-grey-primary'
  return (
    <div className={`${isMobile ? 'ml-5 mr-5' : isLaptop ? 'ml-40 mr-40' : 'ml-56 mr-56'}`}>
      <Layout>
        {/**Overall Overview of Provincial Datas CONTAINER */}
        <div className='flex justify-center gap-9 md:gap-6 xl:gap-9 2xl:gap-16 bg-white rounded-3xl h-fit p-4 shadow-md overflow-x-auto overflow-y-hidden mb-5 items-center cursor-pointer hover:bg-grey-primary' onClick={() => setShowProvincialDatass(!showProvincialDatas)}>
          {/* <Image width={180} height={170} src="/images/dar-region12-logo.png" alt='dar region 12 logo' /> */}
          <img className={`${isMobile ? 'w-[80px] h-[80px]' : 'w-[170px] h-[170px]'} sm:w-[70px] md:w-[80px] lg:w-[100px] xl:w-[120px] 2xl:w-[140px] sm:h-[70px] md:h-[80px] lg:h-[100px] xl:h-[120px] 2xl:h-[140px] `} src="/images/dar-region12-logo.png" alt='dar region 12 logo' />
          <div className='flex flex-row justify-center gap-9 md:gap-9 xl:gap-12 2xl:gap-16 items-center'>
            {overviewData(<MdFormatListNumbered />, 'SeqNo:', localStorageEss3BTotalSeqNo == undefined ? totalSeqNo : localStorageEss3BTotalSeqNo)}
            {overviewData(<MdMap />, 'Area:', localStorageEss3BTotalArea == undefined ? totalArea : localStorageEss3BTotalArea)}
            {overviewData(<MdFace6 />, 'Male:', localStorageEss3BTotalMale == undefined ? totalMale : localStorageEss3BTotalMale)}
            {overviewData(<MdFace3 />, 'Female:', localStorageEss3BTotalFemale == undefined ? totalFemale : localStorageEss3BTotalFemale)}
            {overviewData(<MdGroups2 />, 'ARBs:', localStorageEss3BTotalARB == undefined ? totalARB : localStorageEss3BTotalARB)}
          </div>
          <div className='flex flex-col justify-center items-center'>
            {isMobile ? '' : <label className='font-black flex items-center text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl cursor-pointer'>ESS</label>}
            {isMobile ? '' : <label className='font-black flex items-center text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl cursor-pointer'>3B</label>}
          </div>
        </div>
        {/**Provincial Datas Overview CONTAINER */}
        <Transition
          show={showProvincialDatas}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
               <div className={gridClassName}>
          {/**NORTH COTABATO */}
          <div className={containerChildClassName} onClick={()=> {handlesTableModal('North Cotabato',"/images/cotabato.png",ess3BnorthCotData,'','3B');setActiveTab('north-cotabato')}}>
            <img className={imgClassName} src="/images/cotabato.png" alt='dar region 12 logo' />
            {/* <Image width={100} height={100} src="/images/cotabato.png" alt='DAR North Cotabato Logo' /> */}

            {overviewProvinceData(<MdFormatListNumbered />, 'SeqNo.', 'text-green-700', countSequenceNo(ess3BnorthCotData?ess3BnorthCotData:[]))}
            {overviewProvinceData(<MdMap />, 'Area', 'text-green-700', countAreas(ess3BnorthCotData))}
            {overviewProvinceData(<MdFace6 />, 'Male', 'text-green-700', countTotalMales(ess3BnorthCotData))}
            {overviewProvinceData(<MdFace3 />, 'Female', 'text-green-700', countTotalFemales(ess3BnorthCotData))}
            {overviewProvinceData(<MdGroups2 />, 'ARBs', 'text-green-700', countTotalARBs(ess3BnorthCotData))}
          </div>

          {/**SOUTH COTABATO */}
          <div className={containerChildClassName} onClick={()=> {handlesTableModal('South Cotabato',"/images/south-cotabato.png",ess3BsouthCotData,'','3B');setActiveTab('south-cotabato')}}>
            <img className={imgClassName} src="/images/south-cotabato.png" alt='dar region 12 logo' />
            {/* <Image width={120} height={20} src="/images/south-cotabato.png" alt='DAR South Cotabato Logo' /> */}
            {overviewProvinceData(<MdFormatListNumbered />, 'SeqNo.', 'text-blue-700', countSequenceNo(ess3BsouthCotData))}
            {overviewProvinceData(<MdMap />, 'Area', 'text-blue-700', countAreas(ess3BsouthCotData))}
            {overviewProvinceData(<MdFace6 />, 'Male', 'text-blue-700', countTotalMales(ess3BsouthCotData))}
            {overviewProvinceData(<MdFace3 />, 'Female', 'text-blue-700', countTotalFemales(ess3BsouthCotData))}
            {overviewProvinceData(<MdGroups2 />, 'ARBs', 'text-blue-700', countTotalARBs(ess3BsouthCotData))}
          </div>
          {/**SARANGANI */}
          <div className={containerChildClassName} onClick={()=> {handlesTableModal('Sarangani',"/images/sarangani.png",ess3BsaranganiData,'','3B');setActiveTab('sarangani')}}>
            <img className={imgClassName} src="/images/sarangani.png" alt='dar region 12 logo' />
            {/* <Image width={100} height={100} src="/images/sarangani.png" alt='DAR sarangani Logo' /> */}
            {overviewProvinceData(<MdFormatListNumbered />, 'SeqNo.', 'text-yellow-600', countSequenceNo(ess3BsaranganiData))}
            {overviewProvinceData(<MdMap />, 'Area', 'text-yellow-600', countAreas(ess3BsaranganiData))}
            {overviewProvinceData(<MdFace6 />, 'Male', 'text-yellow-600', countTotalMales(ess3BsaranganiData))}
            {overviewProvinceData(<MdFace3 />, 'Female', 'text-yellow-600', countTotalFemales(ess3BsaranganiData))}
            {overviewProvinceData(<MdGroups2 />, 'ARBs', 'text-yellow-600', countTotalARBs(ess3BsaranganiData))}
          </div>
          {/**SULTAN KUDARAT */}
          <div className={containerChildClassName} onClick={()=> {handlesTableModal('Sultan Kudarat',"/images/sultan-kudarat.png",ess3BsultanKudaratData,'','3B');setActiveTab('sultan-kudarat')}}>
            <img className={imgClassName} src="/images/sultan-kudarat.png" alt='dar region 12 logo' />
            {/* <Image width={100} height={100} src="/images/sultan-kudarat.png" alt='DAR Sultan Kudarat Logo' /> */}
            {overviewProvinceData(<MdFormatListNumbered />, 'SeqNo.', 'text-gray-600', countSequenceNo(ess3BsultanKudaratData))}
            {overviewProvinceData(<MdMap />, 'Area', 'text-gray-600', countAreas(ess3BsultanKudaratData))}
            {overviewProvinceData(<MdFace6 />, 'Male', 'text-gray-600', countTotalMales(ess3BsultanKudaratData))}
            {overviewProvinceData(<MdFace3 />, 'Female', 'text-gray-600', countTotalFemales(ess3BsultanKudaratData))}
              {overviewProvinceData(<MdGroups2 />, 'ARBs', 'text-gray-600', countTotalARBs(ess3BsultanKudaratData))}
            </div>
          </div>
        </Transition>

        {/**TABLE CONTAINER */}
        <div className='bg-white rounded-3xl mt-10 pl-5 pr-5 shadow-md max-w-full overflow-x-auto' ref={tableSectionRef}>
          <div className={`flex justify-between ${isLaptop ? 'flex-wrap' : ''}`}>
            <div className={`flex items-center ${isLaptop ? 'flex-wrap' : ''}`}>
              <div className={`flex  ${isLaptop ? 'flex-wrap' : ''}`}>
                <div className='flex items-center mb-2 relative'>
                  <MdSearch className='absolute mt-4 ml-2 text-2xl' />
                  <input
                    className='rounded-3xl h-12 w-auto border-2 mt-4 pl-8 align-middle pr-3'
                    type='text'
                    placeholder='Search'
                    value={searchQuery}
                    onChange={handlesSearchQuery}
                  />
                  <MdClose
                    className='absolute mt-4 right-5 text-2xl hover:bg-gray-300 hover:cursor-pointer rounded-full'
                    onClick={() => setSearchQuery('')}
                  />
                </div>

                <div
                  className='flex items-center justify-center 
              rounded-3xl h-12 w-fit pl-2 pr-2 border-2 mt-4 bg-navy-primary
               text-grey-primary font-semibold shadow-sm cursor-pointer border-1 
               border-solid hover:border-white hover:rounded-full hover:bg-opacity-95'
                  onClick={isLocalhost ? () => setShowCountBlankModal(true) : () => setShowDisableModal(true)}

                >Count Blanks
                </div>
              </div>


            </div>
            <div className={`flex items-center gap-5 ${isLaptop ? 'flex-wrap' : ''}`}>
              {selectedFile && uploadingStatus && (
                <>
                  <button className='flex items-center justify-center rounded-3xl h-12 w-fit pl-2 pr-2 border-2 mt-4 bg-navy-primary text-grey-primary font-semibold shadow-sm cursor-pointer border-1 border-solid hover:border-white hover:rounded-full' onClick={handleUpload}>Upload</button>
                  <p className="ml-2 mt-3 text-sm text-green-700">
                    <b>Selected file:</b> <i>{selectedFile.name}</i>
                  </p>
                </>

              )}
              <div
                className='flex items-center justify-center rounded-3xl h-12 w-fit pl-2 pr-2 border-2 mt-4 bg-navy-primary text-grey-primary font-semibold shadow-sm cursor-pointer border-1 border-solid hover:border-white hover:rounded-full hover:bg-opacity-95'
                onClick={isLocalhost ? openFileInput : () => setShowDisableModal(true)} // Disable the onClick event if isLocalhost is false
              >
                <MdUpload className='text-2xl' />
                <label className='cursor-pointer'>
                  Upload New Data
                </label>
                <input
                  ref={inputRef}
                  type='file'
                  accept='.csv'
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={!isLocalhost} // Disable the input element if isLocalhost is false
                />
              </div>
            </div>


          </div>

          <div className=" my-4 border-t border-navy-primary pb-4">

            <Tab.Group defaultIndex={2} selectedIndex={tabIndex}>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mt-4 overflow-x-auto">

                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-navy-primary focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-navy-primary'
                    )
                  }
                  selected={activeTab === 'north-cotabato'}
                  onClick={() => {handleTabChange('north-cotabato');setTabIndex(0)}}
                  
                >
                  North Cotabato
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-navy-primary focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-navy-primary'
                    )
                  }
                  selected={activeTab.toLowerCase() === 'sarangani'}
                  onClick={() => {handleTabChange('sarangani');setTabIndex(1)}}
                >
                  Sarangani
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-navy-primary focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-navy-primary'
                    )
                  }
                  selected={activeTab === 'south-cotabato'}
                  onClick={() => {handleTabChange('south-cotabato');setTabIndex(2)}}
                >
                  South Cotabato
                </Tab>
                <Tab
                
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-navy-primary focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-navy-primary'
                    )
                  }
                  selected={activeTab === 'sultan-kudarat'}
                  onClick={() => {handleTabChange('sultan-kudarat');setTabIndex(3)}}
                >
                  Sultan Kudarat
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2  ">
                {yesARBPosShow ?
                  <>
                    <Tab.Panel><Ess3aTable tableData={southCotARBPosData ? filteredNorthCotData : []} isLaptop={isLaptop} /></Tab.Panel>
                    <Tab.Panel><Ess3aTable tableData={northCotARBPosData ? filteredSaranganiData : []} isLaptop={isLaptop} /></Tab.Panel>
                    <Tab.Panel><Ess3aTable tableData={saranganiARBPosData ? filteredSouthCotData : []} isLaptop={isLaptop} /></Tab.Panel>
                    <Tab.Panel><Ess3aTable tableData={sultanKudaratARBPosData ? filteredSultanKudaratData : []} isLaptop={isLaptop} /></Tab.Panel>
                  </> :
                  <>
                    <Tab.Panel><Ess3aTable tableData={southCotARBPosData ? filteredNorthCotData : []} isLaptop={isLaptop} /></Tab.Panel>
                    <Tab.Panel><Ess3aTable tableData={northCotARBPosData ? filteredSaranganiData : []} isLaptop={isLaptop} /></Tab.Panel>
                    <Tab.Panel><Ess3aTable tableData={saranganiARBPosData ? filteredSouthCotData : []} isLaptop={isLaptop} /></Tab.Panel>
                    <Tab.Panel><Ess3aTable tableData={sultanKudaratARBPosData ? filteredSultanKudaratData : []} isLaptop={isLaptop} /></Tab.Panel>
                  </>

                }
                <Tab.Panel><Ess3aTable tableData={ess3BnorthCotData ? filteredNorthCotData : []} isLaptop={isLaptop}/></Tab.Panel>
                <Tab.Panel><Ess3aTable tableData={ess3BsaranganiData ? filteredSaranganiData : []} isLaptop={isLaptop}/></Tab.Panel>
                <Tab.Panel><Ess3aTable tableData={ess3BsouthCotData ? filteredSouthCotData : []} isLaptop={isLaptop}/></Tab.Panel>
                <Tab.Panel><Ess3aTable tableData={ess3BsultanKudaratData ? filteredSultanKudaratData : []} isLaptop={isLaptop}/></Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

          </div>

        </div>

      </Layout>
      <CountBlankModal
        isOpen={showCountBlankModal}
        isClose={() => setShowCountBlankModal(!showCountBlankModal)}
        ess3AsouthCotData={ess3BsouthCotData}
        ess3AnorthCotData={ess3BnorthCotData}
        ess3AsaranganiData={ess3BsaranganiData}
        ess3AsultanKudaratData={ess3BsultanKudaratData} />
      <DisableModal
        isOpen={showDisableModal}
        isClose={() => setShowDisableModal(!showDisableModal)} />
      <TableModal
        isOpen={showTableModal}
        isClose={() => setShowTableModal(false)}
        fileName={fileName? fileName:''}
        tableData={data ? data : []} 
        provinceArb={provinceArb}
        provinceImage={provinceImage}
        provinceActive={activeTab}/>       
    </div>
  )
}
