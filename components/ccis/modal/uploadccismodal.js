import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useRef, useState } from 'react';
import { MdUpload } from 'react-icons/md';
import DisableModal from '../../ess/3a/modals/disablemodal';
import { useDatas } from '../../../pages/api/Datas';
import csv from 'csv-parser';
import Swal from 'sweetalert2';

export default function UploadCCISModal(props) {
  const { isLocalhost, isLaptop } = useDatas();
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [uploadingStatus, setUploadingStatus] = useState(false);

  const openFileInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadingStatus(true);
  };

  async function uploadNewCCISDatas(sql, values) {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ccis`, postData);

      if (!res.ok) {
        const errorResponse = await res.json();
        const errorMessage = errorResponse.error || "Server error occurred";
        console.log("Error Message: ", errorMessage);
        throw new Error(errorMessage);
      }

      const response = await res.json();
      console.log("response: ", response);

      if (response.message === "Success") {
        console.log("Success: ", response);
        return true;
      } else {
        console.log("Failed", response);
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }

  }
  const handleUpload = () => {
    console.log(selectedFile);
    // if (!selectedFile) {
    //   return;
    // } else {
    //   Swal.fire({
    //     title: 'Uploading...',
    //     html: `${selectedFile.name} please wait!`,
    //     timerProgressBar: true,
    //     didOpen: async () => {
    //       Swal.showLoading();
    const reader = new FileReader();
    const results = [];

    reader.onload = async (event) => {
      const fileContent = event.target.result;
      console.log("help")
    }
    //     },
    //   });
    // }
  };

  async function printColumns(file) {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const lines = event.target.result.split('\n');

      // Log the header row (assuming it's the first row with column names)
      const header = lines[0].split(',');
      console.log('Columns:', header);

      // Insert column names into the database
      await createColumnsIfNeeded(header);
    };

    reader.readAsText(file);
  }

  async function createColumnsIfNeeded(columnNames) {
    const existingColumns = await fetchExistingColumns(); // Implement a function to fetch existing columns

    const columnsToCreate = columnNames.filter((column) => !existingColumns.includes(column));

    if (columnsToCreate.length > 0) {
      // Dynamically create the SQL query to add columns to the table
      const addColumnQuery = columnsToCreate.map((columnName) => `"${columnName}" VARCHAR(255)`).join(', ');

      // Execute the query to add columns
      const alterTableQuery = `ALTER TABLE suis.ccis ADD COLUMN IF NOT EXISTS ${addColumnQuery}`;
      await uploadNewCCISDatas(alterTableQuery, []);
    }
  }

  async function fetchExistingColumns() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ccis`); // Modify the API endpoint accordingly

      if (!response.ok) {
        throw new Error(`Error fetching existing columns: ${response.status}`);
      }

      const data = await response.json();

      // Check if the response is an array and not empty
      if (Array.isArray(data) && data.length > 0) {
        return Object.keys(data[0]); // Assuming the API returns an array of objects with the table's columns
      } else {
        throw new Error('Empty or unexpected response format from the API');
      }
    } catch (error) {
      console.error('Error fetching existing columns:', error);
      throw error;
    }
  }





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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className='flex justify-center align-middle mb-5 '>
                      Last Upload: <h1 className='text-red-400 text-center'>December 12, 2023</h1>
                    </div>
                  </Dialog.Title>
                  <div className={`flex justify-center gap-5 ${isLaptop ? 'flex-wrap' : ''}`}>
                    {selectedFile && uploadingStatus && (
                      <>
                        <button
                          className='flex items-center justify-center rounded-3xl h-12 w-fit pl-2 pr-2 border-2 mt-4 bg-navy-primary text-grey-primary font-semibold shadow-sm cursor-pointer border-1 border-solid hover:border-white hover:rounded-full'
                          onClick={() => printColumns(selectedFile)}>
                          Upload
                        </button>
                        <p className="ml-2 mt-3 text-sm text-green-700">
                          <b>Selected file:</b> <i>{selectedFile.name}</i>
                        </p>
                      </>
                    )}
                    <div
                      className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={isLocalhost ? openFileInput : () => setShowDisableModal(true)}
                    >
                      <MdUpload className='text-2xl' />
                      <label className='cursor-pointer'>
                        Browse...
                      </label>
                      <input
                        ref={inputRef}
                        type='file'
                        accept='.csv'
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={!isLocalhost}
                      />
                    </div>
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
