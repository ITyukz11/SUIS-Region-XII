import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/layout'
import { MdFace3, MdFace6, MdFormatListNumbered, MdGroups2, MdMap, MdSearch, MdUpload, MdClose } from 'react-icons/md'
import { Tab } from '@headlessui/react'
import Image from 'next/image'
import csv from 'csv-parser'; // Import the csv-parser library
import Swal from 'sweetalert2'
import CountBlankModal from '../../components/ess/3a/modals/countblankmodal'
import DisableModal from '../../components/ess/3a/modals/disablemodal'
import Ess3aTable from '../../components/ess/3a/tables/ess3atable'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ThreeA() {
  const [southCotData, setSouthCotData] = useState([]);
  const [northCotData, setNorthCotData] = useState([]);
  const [saranganiData, setSaranganiData] = useState([]);
  const [sultanKudaratData, setSultanKudaratData] = useState([]);

  const [localStorageTotalSeqNo, setLocalStorageTotalSeqNo] = useState()
  const [localStorageTotalArea, setLocalStorageTotalArea] = useState()
  const [localStorageTotalMale, setLocalStorageTotalMale] = useState()
  const [localStorageTotalFemale, setLocalStorageTotalFemale] = useState()
  const [localStorageTotalARB, setLocalStorageTotalARB] = useState()

  const [totalSeqNo, setTotalSeqNo] = useState()
  const [totalArea, setTotalArea] = useState()
  const [totalMale, setTotalMale] = useState()
  const [totalFemale, setTotalFemale] = useState()
  const [totalARB, setTotalARB] = useState()

  const [isMobile, setIsMobile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingStatus, setUploadingStatus] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');

  //Modal for counting blanks
  const [showCountBlankModal, setShowCountBlankModal] = useState(false)
  const [showDisableModal, setShowDisableModal] = useState(false)

  const inputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('north-cotabato'); // Initialize with the index of the default active tab

  //Define the pronvinces 
  const provinces = ['north-cotabato', 'sarangani', 'south-cotabato', 'sultan-kudarat'];

  //Getting the error message from api
  const [errorPostReq, setErrorPostReq] = useState('')
  const [errorActive, setErrorActive] = useState(false)

  //Check if batches are complete uploading
  const [batchUploadStatus, setBatchUploadStatus] = useState(false)
  const [uploadingSuccess, setUploadingSuccess] = useState(false)

  //CHECK IF LOCALHOST OR ONLINE
  const isLocalhost = process.env.NEXT_PUBLIC_URL.includes('localhost');

  // Define a function to handle tab selection
  const handleTabChange = (menu) => {
    setActiveTab(menu); // Update the active tab index when a tab is selected
  };

  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768 for mobile devices)
    const isMobileDevice = window.innerWidth < 1025;

    setIsMobile(isMobileDevice);

    // Listen for window resize events to update the state when the screen size changes
    const handleResize = () => {
      const isMobileDevice = window.innerWidth < 1025;
      setIsMobile(isMobileDevice);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //FOR ONLINE 
  async function getEss3ADatasTest2() {
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    const provinces = ['test-north-cotabato', 'test-sarangani', 'test-south-cotabato', 'test-sultan-kudarat'];

    provinces.forEach(async (province) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3a/${province}`, postData);
      const response = await res.json();
      if (!response.error) {
        switch (province) { // Use `province` instead of `provinces[index]`
          case 'test-north-cotabato':
            setNorthCotData(response);
            break;
          case 'test-sarangani':
            setSaranganiData(response);
            break;
          case 'test-south-cotabato':
            setSouthCotData(response);
            break;
          case 'test-sultan-kudarat':
            setSultanKudaratData(response);
            break;
          default:
            break;
        }
        console.log(`response for ${province}: `, response);
      }
    });
  }



  async function getEss3ADatas() {
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };

    provinces.forEach(async (province) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3a/${province}`, postData);
      const response = await res.json();
      if (!response.error) {
        switch (province) { // Use `province` instead of `provinces[index]`
          case 'north-cotabato':
            setNorthCotData(response);
            break;
          case 'sarangani':
            setSaranganiData(response);
            break;
          case 'south-cotabato':
            setSouthCotData(response);
            break;
          case 'sultan-kudarat':
            setSultanKudaratData(response);
            break;
          default:
            break;
        }
        console.log(`response for ${province}: `, response);
      }
    });
  }



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
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3a/${activeTab}`, postData);

      if (!res.ok) {
        // Handle server error here (e.g., res.status >= 400)
        const errorResponse = await res.json();
        const errorMessage = errorResponse.error || "Server error occurred";
        console.log("Error MessageZXC: ", errorMessage);
        setErrorPostReq(await errorMessage); // Set the error message in state

        setErrorActive(true)

        return;

      }

      const response = await res.json();
      console.log("response: ", response)
      if (response.message === "Success") {
        console.log("Success: ", response)

        setUploadingSuccess(true)

        console.log("help uploadingSuccess:", uploadingSuccess)
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3a/${activeTab}`, postData);

      if (!res.ok) {
        // Handle server error here (e.g., res.status >= 400)
        const errorResponse = await res.json();
        const errorMessage = errorResponse.error || "Server error occurred";
        console.log("Error MessageZXC: ", errorMessage);
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3a/test-${activeTab}`, postData);

      if (!res.ok) {
        // Handle server error here (e.g., res.status >= 400)
        const errorResponse = await res.json();
        const errorMessage = errorResponse.error || "Server error occurred";
        console.log("Error MessageZXC: ", errorMessage);
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3a/test-${activeTab}`, postData);

      if (!res.ok) {
        // Handle server error here (e.g., res.status >= 400)
        const errorResponse = await res.json();
        const errorMessage = errorResponse.error || "Server error occurred";
        console.log("Error MessageZXC: ", errorMessage);
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

  //FETCH DATAS
  useEffect(() => {
    if (isLocalhost) {
      getEss3ADatas()
    } else {
      getEss3ADatasTest2()
    }
  }, []);

  //Handling Upload Success
  useEffect(() => {
    console.log("help errorActive:", errorActive)
    console.log("help uploadingSuccess:", uploadingSuccess)

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
    if (isLocalhost) {
      seqNoCount = datas.reduce((count, item) => {
        // Check if the item has a SeqNo property
        if (item['Collective CLOA Sequence Number']) {
          // Increment the count by 1 for each occurrence of SeqNo
          return count + 1;
        }
        return count;
      }, 0);
    } else {
      seqNoCount = datas[0].seqno
      console.log("datas: ", datas)
    }


    return seqNoCount;
  };


  // Function to count the occurrences of CLOA AREA
  const countAreas = (datas) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return <div role="status" className="max-w-sm animate-pulse">
        <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
      </div>; // return '-' if datas is not an array or is empty
    }
    let cloaAreaCount = 0
    if (isLocalhost) {
      cloaAreaCount = datas ? datas.reduce((count, item) => {
        // Check if the item has CLOA AREA data

        const area = item['Actual area of tillage/cultivation (in square meters)']
        if (area && area != 0) {
          // Increment the count by 1 for each occurrence of CLOA AREA
          return count + 1;
        }
        return count;
      }, 0) : '';
    } else {
      cloaAreaCount = datas[0].area
    }
    return cloaAreaCount;
  };

  const countTotalMales = (datas) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return <div role="status" className="max-w-sm animate-pulse">
        <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
      </div>; // return '-' if datas is not an array or is empty
    }
    let maleNoCount = 0
    if (isLocalhost) {
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
    } else {
      maleNoCount = datas[0].male
    }
    return maleNoCount;
  }


  const countTotalFemales = (datas) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return <div role="status" className="max-w-sm animate-pulse">
        <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
      </div>; // return '-' if datas is not an array or is empty
    }
    let femaleNoCount = 0
    if (isLocalhost) {
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
    } else {
      femaleNoCount = datas[0].female
    }
    return femaleNoCount;
  }

  const countTotalARBs = (datas) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return <div role="status" className="max-w-sm animate-pulse">
        <div className="h-4 mt-auto bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
      </div>; // return '-' if datas is not an array or is empty
    }
    let totalARB = 0
    if (isLocalhost) {
      totalARB = datas ? datas.reduce((count, item) => {
        // Check if the item has a SeqNo property
        if (item['First Name']) {
          // Increment the count by 1 for each occurrence of SeqNo
          return count + 1;
        }
        return count;
      }, 0) : '';
    } else {
      totalARB = datas[0].totalarb
    }
    return totalARB;
  }
  const calculateTotalStatistics = async () => {
    let totalSeqNo = 0;
    let totalArea = 0;
    let totalMale = 0;
    let totalFemale = 0;
    let totalARB = 0;
  
    const dataSources = [northCotData, saranganiData, southCotData, sultanKudaratData];
  
    for (const data of dataSources) {
      if (data) {
        totalSeqNo += countSequenceNo(data);
        totalArea += countAreas(data);
        totalMale += countTotalMales(data);
        totalFemale += countTotalFemales(data);
        totalARB += countTotalARBs(data);
      }
    }
    if(!localStorageTotalSeqNo==undefined || localStorageTotalSeqNo !== totalSeqNo && !isNaN(totalSeqNo)){
      setTotalSeqNo(totalSeqNo)
      localStorage.setItem('totalSeqNo', totalSeqNo);
    }
    if(!localStorageTotalSeqNo==undefined || localStorageTotalSeqNo !== totalSeqNo && !isNaN(totalSeqNo)){
      setTotalArea(totalArea)
      localStorage.setItem('totalArea', totalArea);
    }
    if(!localStorageTotalSeqNo==undefined || localStorageTotalSeqNo !== totalSeqNo && !isNaN(totalSeqNo)){
      setTotalMale(totalMale)
      localStorage.setItem('totalMale', totalMale);
    }
    if(!localStorageTotalSeqNo==undefined || localStorageTotalSeqNo !== totalSeqNo && !isNaN(totalSeqNo)){
      setTotalFemale(totalFemale)
      localStorage.setItem('totalFemale', totalFemale);
    }
    if(!localStorageTotalSeqNo==undefined || localStorageTotalSeqNo !== totalSeqNo && !isNaN(totalSeqNo)){
      setTotalARB(totalARB)
      localStorage.setItem('totalARB', totalARB);
    }
    // Save the totals in local storage
  };
  console.log("localStorageTotalSeqNo: ", localStorageTotalSeqNo)

  useEffect(() => {

    const totalSeqNo = localStorage.getItem('totalSeqNo');
    const totalArea = localStorage.getItem('totalArea');
    const totalMale = localStorage.getItem('totalMale');
    const totalFemale = localStorage.getItem('totalFemale');
    const totalARB = localStorage.getItem('totalARB');

    setLocalStorageTotalSeqNo(totalSeqNo)
    setLocalStorageTotalArea(totalArea)
    setLocalStorageTotalMale(totalMale)
    setLocalStorageTotalFemale(totalFemale)
    setLocalStorageTotalARB(totalARB)
  }, []);
  
  useEffect(() => {
    calculateTotalStatistics();
    },[northCotData, saranganiData, southCotData, sultanKudaratData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadingStatus(true);
  };


  const handleUpload = () => {
    if (!selectedFile) {
      return
    } else {
      if (!selectedFile.name.includes("3A")) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please upload ESS 3A File only!',
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
                    'phonenumber': rowDataArray[5],
                    'audit': rowDataArray[6],
                    'audit_URL': rowDataArray[7],
                    'Collective CLOA Sequence Number': rowDataArray[9],
                    'OCT/TCT Number': rowDataArray[10],
                    'Collective CLOA Number': rowDataArray[11],
                    'First Name': rowDataArray[13],
                    'Middle Name': rowDataArray[14],
                    'Last Name': rowDataArray[15],
                    'Actual area of tillage/cultivation (in square meters)': rowDataArray[17],
                    'Gender': rowDataArray[23],
                    'Educational Attainment': rowDataArray[46],
                    'Civil Status': rowDataArray[47],

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
              let currentTab = activeTab == 'north-cotabato' ? northCotData : activeTab == "sarangani" ? saranganiData : activeTab == "south-cotabato" ? southCotData : activeTab == "sultan-kudarat" ? sultanKudaratData : ''

              if (currentTab.length > 1) {
                const sql = `DELETE FROM suis.ess_3a_${activeTab.replace(/-/g, "_")}`;
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


                const sql = `INSERT INTO suis.ess_3a_${activeTab.replace(/-/g, "_")} (${columnsWithDoubleQuote.join(', ')}) VALUES ${placeholders}`;
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
                      await getEss3ADatas().then(async () => {

                        //QUERY ONLINE for every newly uploaded do upload in online vercel postgres too
                        const onlineColumns = ['SeqNo', 'Area', 'Male', 'Female', 'TotalARB']

                        let values = [];
                        onlineColumns.forEach(column => {
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
                          }
                        });

                        // If none of the conditions match, values will be an empty array

                        if (currentTab.length > 1) {
                          const sql = `DELETE FROM ess_3a_${activeTab.replace(/-/g, "_")}`;
                          console.log('SQL:', sql);
                          await deleteOldDatasOnline(sql)

                        }

                        const sqlOnline = `INSERT INTO ess_3a_${activeTab.replace(/-/g, "_")} (${onlineColumns}) VALUES ($1,$2,$3,$4,$5)`;

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

  const gridClassName = isMobile ? 'flex flex-wrap gap-5 text-xs' : 'grid grid-rows-2 grid-flow-col gap-5 justify-items-center';

  const openFileInput = () => {
    // Click the hidden file input when the div is clicked
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handlesSearchQuery = (e) => {
    setSearchQuery(e.target.value)
  };
  const filteredNorthCotData = northCotData ? northCotData.filter((item) => {
    const values = Object.values(item);
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
    }
    return false;
  }) : '';


  const filteredSaranganiData = saranganiData ? saranganiData.filter((item) => {
    const values = Object.values(item);
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
    }
    return false;
  }) : '';


  const filteredSouthCotData = southCotData ? southCotData.filter((item) => {
    const values = Object.values(item);
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
    }
    return false;
  }) : '';

  const filteredSultanKudaratData = sultanKudaratData ? sultanKudaratData.filter((item) => {
    const values = Object.values(item);
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
    }
    return false;
  }) : '';

  const overviewData = (image, title, data) => (
    
    <div className="w-fit flex flex-col gap-3 text-left items-center">
      <div className="flex flex-col items-center">
        {image}
        <label className="font-bold text-navy-primary">{title}</label>
        {isNaN(data) ? (
          <div role="status" className="max-w-sm animate-pulse">
            <div className="h-7 bg-gray-200 rounded-md dark:bg-gray-700 w-14 mb-4"></div>
          </div>
        ) : (
          <label className="font-semibold text-4xl mt-auto">{data ? Number(data).toLocaleString():''}</label>
        )}
      </div>
    </div>
  );
  
  
  const overviewProvinceData = (image, title, color, data) => {
    return (
      <div className='w-fit flex flex-col text-left justify-start items-center'>
        {image}
        <label className='font-bold text-navy-primary'>{title}</label>
        <label className={`font-semibold ${color} text-2xl mt-auto`}>{data}</label>
      </div>
    )
  }
  console.log("localStorageTotalSeqNo: ", typeof localStorageTotalSeqNo)
  return (
    <div className={`${isMobile ? '' : 'ml-56 mr-56'}`}>
      <Layout>
        <div className='flex justify-around gap-16 bg-white rounded-3xl h-52 p-4 shadow-md overflow-x-auto overflow-y-hidden mb-5'>
          {isMobile ? null : <Image width={180} height={170} src="/images/dar-region12-logo.png" alt='dar region 12 logo' />}
          <div className='flex flex-row justify-center gap-16 items-center'>
            {overviewData(<MdFormatListNumbered className='text-7xl' />, 'Seq No:', localStorageTotalSeqNo==undefined? totalSeqNo: localStorageTotalSeqNo)}
            {overviewData(<MdMap className='text-7xl' />, 'Area:', localStorageTotalArea==undefined? totalArea: localStorageTotalArea)}
            {overviewData(<MdFace6 className='text-7xl' />, 'Male:', localStorageTotalMale==undefined? totalMale : localStorageTotalMale)}
            {overviewData(<MdFace3 className='text-7xl' />, 'Female:', localStorageTotalFemale==undefined? totalFemale : localStorageTotalFemale)}
            {overviewData(<MdGroups2 className='text-7xl' />, 'Total ARBs:', localStorageTotalARB ==undefined? totalARB: localStorageTotalARB)}
          </div>
          {isMobile ? null : <h1 className='font-black text-7xl flex items-center'>ESS</h1>}
        </div>

        <div className={gridClassName}>
          {/**NORTH COTABATO */}
          <div className='flex justify-between gap-10 bg-white rounded-3xl h-32 w-full p-4 shadow-md overflow-x-auto overflow-y-hidden'>
            <Image width={100} height={100} src="/images/cotabato.png" alt='DAR North Cotabato Logo' />
            {overviewProvinceData(<MdFormatListNumbered className='text-5xl' />, 'SeqNo.', 'text-green-700', countSequenceNo(northCotData))}
            {overviewProvinceData(<MdMap className='text-5xl' />, 'Area', 'text-green-700', countAreas(northCotData))}
            {overviewProvinceData(<MdFace6 className='text-5xl' />, 'Male', 'text-green-700', countTotalMales(northCotData))}
            {overviewProvinceData(<MdFace3 className='text-5xl' />, 'Female', 'text-green-700', countTotalFemales(northCotData))}
            {overviewProvinceData(<MdGroups2 className='text-5xl' />, 'ARBs', 'text-green-700', countTotalARBs(northCotData))}
          </div>

          {/**SOUTH COTABATO */}
          <div className='flex justify-between gap-10 bg-white rounded-3xl h-32 w-full p-4 shadow-md overflow-x-auto overflow-y-hidden'>
            <Image width={100} height={100} src="/images/south-cotabato.png" alt='DAR South Cotabato Logo' />
            {overviewProvinceData(<MdFormatListNumbered className='text-5xl' />, 'SeqNo.', 'text-blue-700', countSequenceNo(southCotData))}
            {overviewProvinceData(<MdMap className='text-5xl' />, 'Area', 'text-blue-700', countAreas(southCotData))}
            {overviewProvinceData(<MdFace6 className='text-5xl' />, 'Male', 'text-blue-700', countTotalMales(southCotData))}
            {overviewProvinceData(<MdFace3 className='text-5xl' />, 'Female', 'text-blue-700', countTotalFemales(southCotData))}
            {overviewProvinceData(<MdGroups2 className='text-5xl' />, 'ARBs', 'text-blue-700', countTotalARBs(southCotData))}

          </div>

          <div className='flex justify-between gap-10 bg-white rounded-3xl h-32 w-full p-4 shadow-md overflow-x-auto overflow-y-hidden'>
            <Image width={100} height={100} src="/images/sarangani.png" alt='DAR sarangani Logo' />
            {overviewProvinceData(<MdFormatListNumbered className='text-5xl' />, 'SeqNo.', 'text-yellow-600', countSequenceNo(saranganiData))}
            {overviewProvinceData(<MdMap className='text-5xl' />, 'Area', 'text-yellow-600', countAreas(saranganiData))}
            {overviewProvinceData(<MdFace6 className='text-5xl' />, 'Male', 'text-yellow-600', countTotalMales(saranganiData))}
            {overviewProvinceData(<MdFace3 className='text-5xl' />, 'Female', 'text-yellow-600', countTotalFemales(saranganiData))}
            {overviewProvinceData(<MdGroups2 className='text-5xl' />, 'ARBs', 'text-yellow-600', countTotalARBs(saranganiData))}
          </div>

          <div className='flex justify-between gap-10 bg-white rounded-3xl h-32 w-full p-4 shadow-md overflow-x-auto overflow-y-hidden'>
            <Image width={100} height={100} src="/images/sultan-kudarat.png" alt='DAR Sultan Kudarat Logo' />
            {overviewProvinceData(<MdFormatListNumbered className='text-5xl' />, 'SeqNo.', 'text-gray-600', countSequenceNo(sultanKudaratData))}
            {overviewProvinceData(<MdMap className='text-5xl' />, 'Area', 'text-gray-600', countAreas(sultanKudaratData))}
            {overviewProvinceData(<MdFace6 className='text-5xl' />, 'Male', 'text-gray-600', countTotalMales(sultanKudaratData))}
            {overviewProvinceData(<MdFace3 className='text-5xl' />, 'Female', 'text-gray-600', countTotalFemales(sultanKudaratData))}
            {overviewProvinceData(<MdGroups2 className='text-5xl' />, 'ARBs', 'text-gray-600', countTotalARBs(sultanKudaratData))}
          </div>
        </div>
    
          <div className='bg-white rounded-3xl mt-10 pl-5 pr-5 shadow-md max-w-full'>
            <div className={`flex justify-between ${isMobile ? 'flex-wrap' : ''}`}>
              <div className={`flex items-center ${isMobile ? 'flex-wrap' : ''}`}>
                <div className={`flex  ${isMobile ? 'flex-wrap' : ''}`}>
                  <div className='flex items-center'>
                    <MdSearch className='absolute mt-4 ml-2 text-2xl' />
                    <input
                      className='rounded-3xl h-12 w-auto border-2 mt-4 pl-8 align-middle pr-3'
                      type='text'
                      placeholder='Search'
                      value={searchQuery}
                      onChange={handlesSearchQuery} />
                    <MdClose
                      className='absolute mt-4 ml-48 text-2xl hover:bg-gray-300 hover:cursor-pointer rounded-full'
                      onClick={() => setSearchQuery('')} />

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
              <div className={`flex items-center gap-5 ${isMobile ? 'flex-wrap' : ''}`}>
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

              <Tab.Group>
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
                    onClick={() => handleTabChange('north-cotabato')}
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
                    selected={activeTab === 'sarangani'}
                    onClick={() => handleTabChange('sarangani')}
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
                    onClick={() => handleTabChange('south-cotabato')}
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
                    onClick={() => handleTabChange('sultan-kudarat')}
                  >
                    Sultan Kudarat
                  </Tab>
                </Tab.List>
                <Tab.Panels className="mt-2  ">
                  <Tab.Panel><Ess3aTable tableData={northCotData ? filteredNorthCotData : []} isMobile={isMobile} /></Tab.Panel>
                  <Tab.Panel><Ess3aTable tableData={saranganiData ? filteredSaranganiData : []} isMobile={isMobile} /></Tab.Panel>
                  <Tab.Panel><Ess3aTable tableData={southCotData ? filteredSouthCotData : []} isMobile={isMobile} /></Tab.Panel>
                  <Tab.Panel><Ess3aTable tableData={sultanKudaratData ? filteredSultanKudaratData : []} isMobile={isMobile} /></Tab.Panel>
                </Tab.Panels>
              </Tab.Group>

            </div>

          </div>
 
      </Layout>
      <CountBlankModal
        isOpen={showCountBlankModal}
        isClose={() => setShowCountBlankModal(!showCountBlankModal)}
        southCotData={southCotData}
        northCotData={northCotData}
        saranganiData={saranganiData}
        sultanKudaratData={sultanKudaratData} />
      <DisableModal
        isOpen={showDisableModal}
        isClose={() => setShowDisableModal(!showDisableModal)} />
    </div>
  )
}
