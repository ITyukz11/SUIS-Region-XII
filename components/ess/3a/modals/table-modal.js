import { Dialog, Tab, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'
import Ess3aTable from '../tables/ess-3a-table'
import CountBlankSoloModal from './countblanksolomodal';
import DisableModal from './disablemodal';
import { useDatas } from '../../../../pages/api/Datas';
import { MdSearch, MdUpload, MdClose } from 'react-icons/md'
import Swal from 'sweetalert2';
import csv from 'csv-parser'; // Import the csv-parser library
import { ToastContainer, toast } from 'react-toastify';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function TableModal(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDisableModal, setShowDisableModal] = useState(false)
  const { isLocalhost, isLaptop, getEss3ADatas, getEss3BDatas } = useDatas()

  const inputRef = useRef(null);
console.log("islocalhost: ",isLocalhost)

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingStatus, setUploadingStatus] = useState(false)

  //Getting the error message from api
  const [errorPostReq, setErrorPostReq] = useState('')

  //Getting the error message from api
  const [errorPostReqLocal, setErrorPostReqLocal] = useState('')
  const [errorActiveLocal, setErrorActiveLocal] = useState(false)

  //Getting the error message from api
  const [errorPostReqOnline, setErrorPostReqOnline] = useState('')
  const [errorActiveOnline, setErrorActiveOnline] = useState(false)

  //Check if batches are complete uploading
  const [batchUploadStatus, setBatchUploadStatus] = useState(false)
  const [uploadingSuccess, setUploadingSuccess] = useState(false)

  const [localUploadTest, setLocalUploadTest] = useState(false)
  const [onlineUploadTest, setOnlineUploadTest] = useState(false)

  const [testUploadOnlineErrorMessage, setTestUploadOnlineErrorMessage] = useState('')
  const [testUploadLocalErrorMessage, setTestUploadLocalErrorMessage] = useState('')

  const handlesSearchQuery = (e) => {
    setSearchQuery(e.target.value)
  };

  const filteredData = props.tableData ? props.tableData.filter((item) => {
    const values = Object.values(item);
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
    }
    return false;
  }) : '';


  function generateTabClassName(selected) {
    const commonClasses = [
      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black',
      'ring-white ring-opacity-60 ring-offset-2 ring-offset-navy-primary focus:outline-none focus:ring-2',
    ];

    if (selected) {
      return classNames(
        ...commonClasses,
        'bg-navy-primary text-grey-primary shadow'
      );
    } else {
      return classNames(
        ...commonClasses,
        'hover:bg-white/[0.12] hover:text-navy-primary'
      );
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadingStatus(true);
  };

  const openFileInput = () => {
    // Click the hidden file input when the div is clicked
    if (inputRef.current) {
      inputRef.current.click();
    }
  };


  async function deleteOldDatasLocal(sql) {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3a/${props.provinceActive}`, postData);

      if (!res.ok) {
        // Handle server error here (e.g., res.status >= 400)
        const errorResponse = await res.json();
        const errorMessage = errorResponse.error || "Server error occurred";
        console.log("Error Message Deleting Old Data Local: ", errorMessage);
        setErrorPostReq(await errorMessage); // Set the error message in state

        // setErrorActive(true)
        setErrorActiveLocal(true)
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3a/test-${props.provinceActive}`, postData);

      if (!res.ok) {
        // Handle server error here (e.g., res.status >= 400)
        const errorResponse = await res.json();
        const errorMessage = errorResponse.error || "Server error occurred";
        console.log("Error Message Deleting Datas Online: ", errorMessage);
        setErrorPostReq(await errorMessage); // Set the error message in state

        // setErrorActive(true)
        setErrorActiveOnline(true)
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

  async function uploadDataToOnline(sql, values) {
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

    if (!errorActiveOnline) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3a/test-${props.provinceActive}`, postData);

        if (!res.ok) {
          // Handle server error here (e.g., res.status >= 400)
          const errorResponse = await res.json();
          const errorMessage = errorResponse.error || "Server error occurred";
          console.log("Error Message Online: ", errorMessage);
          setTestUploadOnlineErrorMessage(errorMessage);
          setErrorActiveOnline(true)
          setErrorPostReqOnline(await errorMessage); // Set the error message in state
          //setErrorActive(true) 
        }

        const response = await res.json();
        console.log("online response: ", response)
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

  }

  async function uploadDataToLocal(sql, values) {
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
    if (!errorActiveLocal) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3a/${props.provinceActive}`, postData);

        if (!res.ok) {
          // Handle server error here (e.g., res.status >= 400)
          const errorResponse = await res.json();
          const errorMessage = errorResponse.error || "Server error occurred";
          console.log("Error Message Local: ", errorMessage);
          setErrorActiveLocal(true)
          setErrorPostReqLocal(await errorMessage); // Set the error message in state  
          // setErrorActive(true)
        }

        const response = await res.json();
        console.log("response: ", response)
        if (response.message === "Success") {
          console.log("Success: ", response)
          handlesSuccessToastMessage("Success Uploading Locally")
          setUploadingSuccess(true)

          console.log("uploadingSuccess:", uploadingSuccess)
        } else {
          console.log("Failed", response)
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

  }

  async function testUploadLocal(sql, values) {

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
    if (!errorActiveLocal) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3a/${props.provinceActive}`, postData);

        if (!res.ok) {
          // Handle server error here (e.g., res.status >= 400)
          const errorResponse = await res.json();
          const errorMessage = errorResponse.error || "Server error occurred";
          console.log("Error Message Uploading Locally: ", errorMessage);
          setTestUploadLocalErrorMessage(errorMessage)
        }
        const response = await res.json();
        console.log("test upload local response: ", response)
        if (response.message === "Success") {
          //set local upload test to TRUE if test is success
          setLocalUploadTest(true)

          console.log("Success Uploading Local Test: ", response)
        } else {
          console.log("Failed", response)
          setTestUploadLocalErrorMessage(response)
        }
      } catch (error) {
        console.error("Test Uploading Locally error:", error);
        setTestUploadLocalErrorMessage(error)
      }
    }
  }
  async function testUploadOnline(sql, values) {

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

    if (!errorActiveOnline) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3a/test-${props.provinceActive}`, postData);
    
        if (!res.ok) {
          // Handle server error here (e.g., res.status >= 400)
          const errorResponse = await res.json();
          const errorMessage = errorResponse.error || "Server error occurred";
          console.log("Error Message Online: ", errorMessage);
          setTestUploadOnlineErrorMessage(errorMessage);
        } else {
          // Read the response body as JSON once
          const response = await res.json();
          console.log("test upload online response: ", response);
    
          if (response.message === "Success") {
            // Set Online upload test to TRUE if the test is successful
            setOnlineUploadTest(true);
            console.log("Success Uploading Online Test: ", response);
          } else {
            console.log("Failed", response);
            setTestUploadOnlineErrorMessage(response);
          }
        }
      } catch (error) {
        console.error("Test Uploading Online error:", error);
        setTestUploadOnlineErrorMessage(error);
      }
    }
    
  }

  const handleUpload = () => {
    let start = 0
    let end = 0

    const fileName = props.fileName.toLowerCase()
    if (!selectedFile) {
      return
    } else {
      if (!selectedFile.name.includes(props.fileName)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Please upload ESS ${props.fileName} File only!`,
          confirmButtonText: 'OK',
          confirmButtonColor: '#053B50'
        })
      } else {
        Swal.fire({
          title: 'Uploading...',
          html: `${selectedFile.name} please wait! ${start} out of ${end}`,
          allowOutsideClick: false,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            // Read the selected CSV file using FileReader
            const reader = new FileReader();

            reader.onload = async (event) => {
              const fileContent = event.target.result;

              // Parse the CSV content
              const datas = [];
console.log("fileName: ", fileName)
              csv({ separator: ',' }) // You can specify the separator here if it's not a comma
                .on('data', (row) => {
                  const rowDataArray = Object.values(row);
                  
                    const selectedData =  fileName==="3a"?
                    {  // Use the found index, or an empty string if not found
                      'start': rowDataArray[0],
                      'end': rowDataArray[1],
                      'username': rowDataArray[2],
                      'phonenumber': rowDataArray[3],
                      'Collective CLOA Sequence Number': rowDataArray[4],
                      'OCT/TCT Number': rowDataArray[5],
                      'Collective CLOA Number': rowDataArray[6],
                      'First Name': rowDataArray[7],
                      'Middle Name': rowDataArray[8],
                      'Last Name': rowDataArray[9],
                      'Lot # of the actual area of tillage/cultivation (based on the Approved Subdivision Plan if available)':rowDataArray[10],
                      'Actual area of tillage/cultivation (in square meters)': rowDataArray[11],
                      'Is the ARB still in possession?': rowDataArray[12],
                      'Gender': rowDataArray[13],
                      'Educational Attainment': rowDataArray[14],
                      'Civil Status': rowDataArray[15],
                    }: {  // Use the found index, or an empty string if not found
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
                      'Gender': rowDataArray[13],
                      'Educational Attainment': rowDataArray[14],
                      'Civil Status': rowDataArray[15],
                    }
                  datas.push(selectedData);

                  
            
                })
                .on('end', () => {

                  // Execute the SQL query with your database connection
                  // You can use your MySQL connection to execute the query here
                })
                .write(fileContent);

                
              const batchSize = 100; // Choose an appropriate batch size
              const batches = [];

              // Split the datas array into batches
              for (let i = 0; i < datas.length; i += batchSize) {
                batches.push(datas.slice(i, i + batchSize));
              }

              // Initialize a counter variable
              let completedLocalBatches = 0;
              let completedOnlineBatches = 0
              let parameterIndex = 1; // Initialize the parameter index

              start += completedLocalBatches + completedOnlineBatches
              completedOnlineBatches
              // Loop through batches and insert data
              let currentTab = props.tableData



              //TEST LOCAL & ONLINE FIRST
              const testSqlLLocal = `INSERT INTO suis.ess_${fileName}_${props.provinceActive.replace(/-/g, "_")} ("Collective CLOA Sequence Number") VALUES ($1)`;
              const testSqlOnline = `INSERT INTO test_ess_${fileName}_${props.provinceActive.replace(/-/g, "_")} ("Collective CLOA Sequence Number") VALUES ($1)`
              const testValue = ['test']
              await testUploadLocal(testSqlLLocal, testValue).then(async ()=>{
              //IF test Local has no error in request POST then continue inserting datas
              
              console.log("localUploadTest: ",localUploadTest)
              //TEMPORARY localUploadTest FOR TOMORROWS JOB 
              if (1===1) {
                //before inserting go delete the current data first 
                if(currentTab.length >= 0){
                  const sqlDelete = `DELETE FROM suis.ess_${fileName}_${props.provinceActive.replace(/-/g, "_")}`;
                  await deleteOldDatasLocal(sqlDelete)

                  //set per batch of 100
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
  
  
                    const sql = `INSERT INTO suis.ess_${fileName}_${props.provinceActive.replace(/-/g, "_")} (${columnsWithDoubleQuote.join(', ')}) VALUES ${placeholders}`;
  
                    await uploadDataToLocal(sql, values)
                      .then(() => {
                        // Increment the counter when the batch is completed
                        completedLocalBatches++;
  
                        // Check if all batches are completed
                        if (completedLocalBatches === batches.length) {
                          // Perform any actions you need after all batches are done
                          console.log('All batches completed Locally');
                        }
                      })
                      .catch((error) => {
                        // Handle errors if needed
                        handlesErrorToastMessage('Catched error! ',error)
  
                      }).then(() => {
                        // Perform any actions you need after all batches are done
                        if (completedLocalBatches === batches.length) {
                          handlesSuccessToastMessage("Successfully uploaded locally!")  
                          getEss3ADatas();   
                          getEss3BDatas()
                          // if(fileName=="3A"){
                          //   getEss3ADatas(); // Restart the table   

                          // }else{
                          //   getEss3BDatas()
                          // }
                          
                          console.log("ALL BATCHES LOCALLY");
                        }
                      })
                      .catch((error) => {
                        // Handle any errors that might occur in either of the uploads
                        console.error('Error:', error);
                        Swal.fire({
                          title: 'Error!',
                          text: `Error occurred while uploading...  ${error}`,
                          icon: 'error',
                          confirmButtonText: 'OK',
                          confirmButtonColor: '#053B50',
                        });
                      });

                  }
                }
                setLocalUploadTest(false)
                handlesSuccessToastMessage("Successfully uploaded locally!")
              } else { 
                setErrorActiveLocal(true)              
                handlesErrorToastMessage("Error uploading locally! ", testUploadOnlineErrorMessage)
              }
              })

              await testUploadOnline(testSqlOnline, testValue).then(async ()=>{
                if (onlineUploadTest) {
                  // DELETE EXISTING DATAS ONLINE
                if (currentTab.length > 1) {       
                  const sql2 = `DELETE FROM test_ess_${fileName}_${props.provinceActive.replace(/-/g, "_")}`;
                await deleteOldDatasOnline(sql2)
  
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
                  const sqlOnline = `INSERT INTO test_ess_${fileName}_${props.provinceActive.replace(/-/g, "_")} (${columnsWithDoubleQuote.join(', ')}) VALUES ${placeholders}`
  
  
  
                  await uploadDataToOnline(sqlOnline, values)
                    .then(() => {
                      completedOnlineBatches++;
  
                      if (completedOnlineBatches === batches.length) {
                        console.log('uploadDataToOnline All completedOnlineBatches completed!!');
                      }
                    })
                    .catch((error) => {
                      // Handle errors if needed
                      console.error('Error:', error);
                     handlesErrorToastMessage('Catched error! ', error)
                    }).then(() => {
                      // Perform any actions you need after all batches are done
                      if (completedOnlineBatches === batches.length) {
                        getEss3ADatas(); // Restart the table    
                        getEss3BDatas()                           
                        console.log("ALL BATCHES ONLINE DONE!");
                        handlesSuccessToastMessage("Successfully uploaded onlline!")
                      }
  
                    })
                    .catch((error) => {
                      // Handle any errors that might occur in either of the uploads
                      console.error('Error:', error);
                      Swal.fire({
                        title: 'Error!',
                        text: `Error occurred while uploading...  ${error}`,
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#053B50',
                      });
                    });
  
                }
                }
                setOnlineUploadTest(false)
  
                } else {
                  setErrorActiveOnline(true)
                  handlesErrorToastMessage("Error uploading online! ",testUploadLocalErrorMessage)
                }
              })




              setBatchUploadStatus(true);
              Swal.close();
            };
            reader.readAsText(selectedFile); // Read the file as text
          },
        })
      }
    }
  };

  const uploadLastUpdateDate = (fileName, province) =>{
    const date = new Date()
    const sql = `INSERT INTO suis.ess_${fileName}_${province} (Last Update) VALUES($1)`
    const values = `['${date}']`
    uploadDataToLocal(sql,values)
  }
  //Handling Upload Success
  useEffect(() => {
    console.log("uploadingSuccess:", uploadingSuccess)

    if (batchUploadStatus) {
      if (!errorActiveLocal && !errorActiveOnline) {
        Swal.fire({
          title: 'Uploaded Successfully!',
          text: `${selectedFile ? selectedFile.name : ''}`,
          icon: 'success',
          allowOutsideClick: false,
          confirmButtonText: 'OK',
          confirmButtonColor: '#053B50'
        }).then((result) => {
          if (result.isConfirmed) {
            setUploadingStatus(!uploadingStatus)
            setBatchUploadStatus(false)
          }
        });
      }
      // else {
      //   Swal.fire({
      //     title: 'Upload Failed!',
      //     html: `${selectedFile ? selectedFile.name : ''} <br> Error Message: <div style="max-height: 200px; overflow-y: auto;">${errorPostReq}</div>`,
      //     icon: 'error',
      //     allowOutsideClick: false,
      //     confirmButtonText: 'OK',
      //     confirmButtonColor: '#053B50',
      //   }).then((result) => {
      //     if (result.isConfirmed) {

      //       setBatchUploadStatus(false)
      //     }
      //   });
      // }
    }
  }, [batchUploadStatus])

  // //Show error toast if there are error uploading locally
  // useEffect(() => {
  //   if(batchUploadStatus){
  //     if (errorActiveLocal){
  //       toast.error(errorPostReqLocal, {
  //         position: "top-right",
  //         autoClose: 10000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //         onClose: () => {
  //           setErrorActiveLocal(false);
  //         }
  //       })
  //     }else{
  //       toast.success(`Successfully uploaded locally`, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //         onClose: () => {
  //           setErrorActiveLocal(false);
  //         }
  //       }) 
  //     }
  //   }

  // },[errorActiveLocal,batchUploadStatus])

  // //Show error toast if there are error uploading online
  // useEffect(()=>{

  //   if(batchUploadStatus){
  //     if(errorActiveOnline) {
  //       toast.error(`Error occurred uploading online! ${errorPostReqOnline}`, {
  //         position: "top-right",
  //         autoClose: 10000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //         onClose: () => {
  //           setErrorActiveOnline(false);
  //         }
  //       })
  //     }else{
  //       toast.success(`Successfully uploaded online!`, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //         onClose: () => {
  //           setErrorActiveOnline(false);
  //         }
  //       })      
  //     }
  //   }

  // },[errorActiveOnline, batchUploadStatus])
  const handlesSuccessToastMessage = (message) => {
    if (errorActiveLocal) {
      toast.success(message, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
  }
  const handlesErrorToastMessage = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  }
  useEffect(() => {
    setSelectedFile()
    setSearchQuery('')
  }, [props.isOpen])

  return (
    <>

      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={props.isClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[80%] min-h-[550px] transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className='flex justify-between align-middle items-center'>


                      <Image src='/images/SUIS-Logo.png' width={50} height={50} alt='SUIS LOGO' />

                      <div className='flex justify-center items-center gap-2'>
                        <Image src={props.provinceImage} width={50} height={50} alt='Province Logo' />

                        {props.provinceArb}
                      </div>
                      <Image src='/images/RPS-Logo.png' width={50} height={50} alt='RPS LOGO' />

                    </div>

                  </Dialog.Title>

                  <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1 mt-4 overflow-x-auto">
                      <Tab className={({ selected }) => generateTabClassName(selected)}>
                        Raw Datas
                      </Tab>
                      <Tab className={({ selected }) => generateTabClassName(selected)}>
                        Count Blanks
                      </Tab>
                      <Tab className={({ selected }) => generateTabClassName(selected)}>
                        Duplicates Data
                      </Tab>
                    </Tab.List>
                    <Tab.Panels className="border-t-navy-primary rounded-lg min-h-[420px]">
                      {/**RAW DATAS */}
                      <Tab.Panel className="pr-4 pb-4 pl-4 border-2 border-gray-500q rounded-lg">
                        <div className='flex justify-between items-center'>

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

                          <label className='text-red-500 font-semibold'>Last Upload: {props.tableData[0] ? props.tableData[0]["Last Update"] : null}</label>
                          <div className={`flex items-center gap-5 ${isLaptop ? 'flex-wrap' : ''}`}>
                            {selectedFile && uploadingStatus && (
                              <>
                                <button className='flex items-center justify-center rounded-3xl h-12 w-fit pl-2 pr-2 border-2 mt-4 bg-navy-primary text-grey-primary font-semibold shadow-sm cursor-pointer border-1 border-solid hover:border-white hover:rounded-full' onClick={handleUpload}>Upload</button>
                                <p className="ml-2 mt-3 text-sm text-green-700">
                                  <b>Selected file:</b> <i>{selectedFile.name.slice(0, 7)}</i>
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

                        <div className='border-t border-navy-primary pt-2'>
                          <Ess3aTable tableData={filteredData} />

                        </div>
                      </Tab.Panel>

                      <Tab.Panel className="p-4 border-2 border-gray-500q rounded-lg"> <CountBlankSoloModal tableData={props.tableData} /></Tab.Panel>
                      {/**Duplicate datas */}
                      <Tab.Panel className="p-4 border-2 border-gray-500q rounded-lg">Duplicate datas</Tab.Panel>

                    </Tab.Panels>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <DisableModal
        isOpen={showDisableModal}
        isClose={() => setShowDisableModal(false)} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}
