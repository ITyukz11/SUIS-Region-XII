import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useRef, useState } from 'react';
import { MdUpload } from 'react-icons/md';
import DisableModal from '../../ess/3a/modals/disablemodal';
import { useDatas } from '../../../pages/api/Datas';
import csv from 'csv-parser';
import Swal from 'sweetalert2';
import UtilsErrorAlert from '../../utils/error-alert';

export default function UploadCCISModal(props) {
  const { isLocalhost, isLaptop, 
          getCCISDatas,CCISNorthCotData,CCISSaranganiData,CCISSouthCotData,CCISSultanKudaratData,
          getCCISAnnotatedDatas, CCISAnnotatedARBsData} = useDatas();

  const inputNorthCotRef = useRef(null);
  const inputSaranganiRef= useRef(null);
  const inputSouthCotRef = useRef(null);
  const inputSultanKudaratRef = useRef(null);

  const inputAnnotatedArbsRef = useRef(null);

  const [selectedFileNorthCot, setSelectedFileNorthCot] = useState(null);
  const [selectedFileSarangani, setSelectedFileSarangani] = useState(null);
  const [selectedFileSouthCot, setSelectedFileSouthCot] = useState(null);
  const [selectedFileSultanKudarat, setSelectedFileSultanKudarat] = useState(null);

  const [selectedFileAnnotatedArbs, setSelectedFileAnnotatedArbs] = useState(null);


  const [showDisableModal, setShowDisableModal] = useState(false);
 // const [uploadingStatus, setUploadingStatus] = useState(false);

 const [endPoint, setEndPoint] = useState()
  const openFileInput = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
  const handleFileChange = (e,setSelectedFile,endPoint, description) => {
    const file = e.target.files[0];
    setSelectedFile(file);
   // setUploadingStatus(true);
  handleUpload(file, endPoint, description);

  };

  async function uploadNewCCISDatas(sql, values) {
    console.log("uploadNewCCISDatas sql:  ",sql)
    console.log("uploadNewCCISDatas values:  ",values)
    console.log("uploadNewCCISDatas endPoint:  ",endPoint)

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

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ccis/${endPoint.replace(/_/g, "-")}`, postData);
      console.log("uploadNewCCISDatas fetch: ",`${process.env.NEXT_PUBLIC_URL}/api/ccis/${endPoint.replace(/_/g, "-")}`)
      // Check for successful HTTP status
      if (res.ok) {
        console.log("Success: ", res);
        getCCISDatas()
        getCCISAnnotatedDatas()
        return true;
      } else {
        // Handle non-successful HTTP status
        const errorResponse = await res.json();
        const errorMessage = errorResponse.error || "Server error occurred";
        console.error("Error Message: ", errorMessage);
        return false;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return false;
    }
  }

  async function handleUpload (selectedFile, description) {
    if (!selectedFile) {
      return;
    } else {
      Swal.fire({
        title: 'Uploading...',
        html: `${selectedFile.name} please wait!`,
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: async () => {
          Swal.showLoading();
  
          try {
            const columns = await uploadColumns(selectedFile);
            if (columns) {
              console.log('Columns uploaded successfully.');
              const reader = new FileReader();
  
              reader.onload = async (event) => {
                console.log("READER");
                const fileContent = event.target.result;
                const datas = [];
  
                csv({ separator: ',' })
                  .on('data', async (row) => {
                    const rowDataArray = Object.values(row);
                    datas.push(rowDataArray);
                  })
                  .on('end', async () => {
                    console.log("CSV parsing completed");
  
                  })
                  .write(fileContent);
  
                if (datas.length > 0) {
                  console.log("Data length: ", datas.length);
                  const batchSize = 100;
                  const batches = [];
                  let parameterIndex = 1;
  
                  for (let i = 0; i < datas.length; i += batchSize) {
                    batches.push(datas.slice(i, i + batchSize));
                  }
  
                  for (let i = 0; i < batches.length; i++) {
                    const batch = batches[i];
                    console.log("Processing batch", i + 1, "of", batches.length);
  
                    const CCIS_VALUES = Object.keys(batch[0]);
                    const columnsWithDoubleQuote = columns.map((column) => `"${column}"`);
                    const placeholders = batch
                      .map(() => `(${CCIS_VALUES.map(() => `$${parameterIndex++}`).join(', ')}, $${parameterIndex++})`)
                      .join(', ');
  
                    if (parameterIndex > 100) {
                      parameterIndex = 1;
                    }
  
                    const dateNow = new Date();
                    const formattedDate = dateNow.toLocaleString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    });
  
                    const values = batch.flatMap((obj) => CCIS_VALUES.map((col) => obj[col]).concat([formattedDate]));
                    console.log("values: ", values);
  
                    const sql = `INSERT INTO suis.ccis_${endPoint} (${columnsWithDoubleQuote.join(', ')}) VALUES ${placeholders}`; 
                    try {
                     
                      await uploadNewCCISDatas(sql, values);
                   
                      // Calculate progress and update the progress bar
                      const progress = ((i + 1) / batches.length) * 100;
                      Swal.update({
                        title: 'Uploading...',
                        html: `
                          <div>
                          <labe>Please wait!</label>
                            <br>
                            <div style="width: 100%; background-color: #e0e0e0; height: 20px; border-radius: 10px;">
                              <div style="height: 100%; width: ${progress}%; background-color: #4caf50; border-radius: 10px;"></div>
                            </div>
                            <div style="margin-top: 10px; text-align: center;">${progress.toFixed(2)}%</div>
                          </div>
                        `,
                        timerProgressBar: true,
                        allowOutsideClick: false,  
                       showConfirmButton:false           
                      });
                    
                      if (i === batches.length - 1) {
                        Swal.hideLoading();
                        // If it's the last batch, update the success message
                        Swal.update({
                          title: 'Success!',
                          html: `
                          <div>
                            <label>Successfully Uploaded ${description}!</label>             
                            <div style="width: 100%; background-color: #e0e0e0; height: 20px; border-radius: 10px; overflow: hidden;">
                                <div style="height: 100%; width: 100%; background-color: #4caf50; border-radius: 10px;"></div>
                            </div>
                            <div style="text-align: center; font-weight: bold;">100%</div>
                          </div>
                        `,
                          icon: 'success',
                          confirmButtonColor: '#053B50',
                          allowOutsideClick: false,
                          showConfirmButton:true
                        });
                      }
                    } catch (error) {
                      console.error('Error:', error);
                      UtilsErrorAlert('Error!',`Error occurred while uploading...  ${error.message}`)                 
                      return;
                    }
                    
                  }
  
                 
                } else {
                  UtilsErrorAlert('Error!','No data in the CSV file.')    
                  console.log('No data in the CSV file.');
                  // Handle the case when there is no data in the CSV file
                  Swal.close();
                }
              };
  
              reader.readAsText(selectedFile); // Read the file as text
            } else {
              UtilsErrorAlert('Error!','Columns upload failed.')  
              console.log('Columns upload failed.');
            }
          } catch (error) {
            UtilsErrorAlert('Error!',`Error during column upload:, ${error}`)  
            console.error('Error during column upload:', error);
          }
        },
      });
    }
  };

  async function uploadColumns(file) {
    console.log("uploadColumns endPoint: ", endPoint)
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const lines = event.target.result.split('\n');

        // Log the header row (assuming it's the first row with column names)
        const header = lines[0].split(',');
        console.log('Columns:', header);

        // Add "Last Update" to the column names
        const columns = [...header, 'Last Update'];

        try {
          // Insert column names into the database
          await createColumnsIfNeeded(columns);
          resolve(columns);
        } catch (error) {
          console.error('Error creating columns:', error);
          reject(false);
        }
      };

      reader.readAsText(file);
    });
  }

  async function createColumnsIfNeeded(columnNames) {
    console.log("createColumnsIfNeeded endPoint: ", endPoint)
    // Dynamically create the SQL query to add columns to the table
    const addColumnQuery = columnNames.map((columnName) => `ADD COLUMN IF NOT EXISTS "${columnName}" VARCHAR(3000)`).join(', ');

    // Execute the query to add columns
    const alterTableQuery = `ALTER TABLE suis.ccis_${endPoint} ${addColumnQuery}`;
    console.log("alterTableQuery: ", alterTableQuery);
    await uploadNewCCISDatas(alterTableQuery, []);
  }

  const browseButton = (description, inputRef, openFileInputFn, selectedFile, setSelectedFile, endPointData) => {
      return (
        <div
          className={`cursor-pointer h-full inline-flex justify-start rounded-md border 
            border-transparent px-4 py-2 text-sm font-medium text-blue-900 ${selectedFile ? 'bg-blue-300' : 'bg-blue-100'}
            hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
          onClick={isLocalhost ? () => {openFileInputFn(inputRef);setEndPoint(endPointData);} : () => setShowDisableModal(true)}
        >
          <MdUpload className='text-2xl' />
          <label className='cursor-pointer' >
            Upload
          </label>
          <input
            ref={inputRef}
            type='file'
            accept='.csv'
            className="hidden"
            onChange={(e) => handleFileChange(e, setSelectedFile,endPoint, description)}
            disabled={!isLocalhost}
          />
        </div>
      );
    }
 
  
  

  const data = [
    { label: 'North Cotabato', lastUpload:  CCISNorthCotData.length >0? CCISNorthCotData[0]['Last Update']:'', inputRef: inputNorthCotRef, selectedFile: selectedFileNorthCot, setSelectedFile: setSelectedFileNorthCot, endPointData: 'north_cotabato'},
    { label: 'Sarangani', lastUpload:  CCISSaranganiData.length >0? CCISSaranganiData[0]['Last Update']:'', inputRef: inputSaranganiRef, selectedFile: selectedFileSarangani, setSelectedFile: setSelectedFileSarangani, endPointData: 'sarangani' },
    { label: 'South Cotabato', lastUpload:  CCISSouthCotData.length >0? CCISSouthCotData[0]['Last Update']:'', inputRef: inputSouthCotRef, selectedFile: selectedFileSouthCot, setSelectedFile: setSelectedFileSouthCot, endPointData: 'south_cotabato' },
    { label: 'Sultan Kudarat', lastUpload:  CCISSultanKudaratData.length >0? CCISSultanKudaratData[0]['Last Update']:'', inputRef: inputSultanKudaratRef, selectedFile: selectedFileSultanKudarat, setSelectedFile: setSelectedFileSultanKudarat, endPointData: 'sultan_kudarat' },
    { label: 'Annotated ARBs', lastUpload:  CCISAnnotatedARBsData.length >0? CCISAnnotatedARBsData[0]['Last Update']:'', inputRef: inputAnnotatedArbsRef, selectedFile: selectedFileAnnotatedArbs, setSelectedFile: setSelectedFileAnnotatedArbs, endPointData: 'annotated_arbs' },
  ];
  console.log("react endPoint: ",endPoint)

  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.isClose}>
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

          <div className="fixed inset-0 overflow-y-auto">
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
                <Dialog.Panel className="w-[50%] transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className='flex font-bold justify-center align-middle mb-5 '>
                      Collective CLOA Inventory System - CCIS Upload Data
                    </div>
                  </Dialog.Title>
                  <div className='flex flex-col gap-2'>
                    <table className="border border-collapse w-full" style={{ borderCollapse: 'collapse' }}>
                      <thead>
                        <tr  className="md:text-base text-center" style={{ background: '#f2f2f2', border: '1px solid #ddd', fontWeight: 'bold', color: '#333' }}>
                          <th>Province</th>
                          <th>Last Upload</th>
                          <th rowSpan={2}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                            <td>{item.label}</td>
                            <td>{item.lastUpload}</td>
                            <td className='flex justify-center'>                         
                              {browseButton(item.label, item.inputRef, openFileInput, item.selectedFile, item.setSelectedFile, item.endPointData)}
                            </td>
                          </tr>
                        ))}
  
                      </tbody>
                    </table>

                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <DisableModal
        isOpen={showDisableModal}
        isClose={() => setShowDisableModal(!showDisableModal)} />
    </>
  );
}
