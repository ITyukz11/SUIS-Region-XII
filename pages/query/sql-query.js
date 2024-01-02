import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import { useDatas } from '../api/Datas';
import Swal from 'sweetalert2';
import InsertScript from '../../components/modal/insertscript';
import GeneralTable from '../../components/generaltable';
import ViewScriptsModal from '../../components/modal/viewscriptsmodal';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import UtilsQueryErrorAlert from '../../components/utils/query-error-alert';
import UtilsSuccessAlert from '../../components/utils/success-alert';
import UtilsErrorAlert from '../../components/utils/error-alert';
export default function sqlquery() {
  const { isLocalhost, isMobile, isLaptop } = useDatas();

  const [showInsertScript, setShowInsertScript] = useState(false);
  const [showViewScript, setShowViewScript] = useState(false);

  const [query, setQuery] = useState('');
  const [tableData, setTableData] = useState([]);
  const [style, setStyle] = useState()

  useEffect(() => {
    import('react-syntax-highlighter/dist/esm/styles/prism/material-dark')
      .then(mod => setStyle(mod.default));
  }, []);
  const tables = [
    "ccis_north_cotabato",
    "ccis_sarangani",
    "ccis_south_cotabato",
    "ccis_sultan_kudarat",
    
    "ess_3a_north_cotabato",
    "ess_3a_south_cotabato",
    "ess_3a_sarangani",
    "ess_3a_sultan_kudarat",
    "ess_3b_north_cotabato",
    "ess_3b_south_cotabato",
    "ess_3b_sarangani",
    "ess_3b_sultan_kudarat",
  ];

  const addToQuery = (text) => {
    // Update the query state with the new content
    setQuery((prevQuery) => prevQuery + text);
  };

  const handleQuery = async () => {

    let url = `${process.env.NEXT_PUBLIC_URL}/api/`; // Initialize with the base API URL
    let endPointTable = "";


    for (let index = 0; index < tables.length; index++) {
      const table = tables[index];
      if (query.includes(table)) {
        endPointTable = table;
        break; // Exit the loop if a match is found
      }
    }
    switch (endPointTable) {
      //ESS 3A
      case "ess_3a_north_cotabato":
        url += "ess/3a/north-cotabato"
        break;

      case "ess_3a_sarangani":
        url += "ess/3a/sarangani"
        break;

      case "ess_3a_south_cotabato":
        url += "ess/3a/south-cotabato"
        break;

      case "ess_3a_sultan_kudarat":
        url += "ess/3a/sultan-kudarat"
        break;
      //ESS 3B 
      case "ess_3b_north_cotabato":
        url += "ess/3b/north-cotabato"
        break;

      case "ess_3b_sarangani":
        url += "ess/3b/sarangani"
        break;
      case "ess_3b_south_cotabato":
        url += "ess/3b/south-cotabato"
        break;

      case "ess_3b_sultan_kudarat":
        url += "ess/3b/sultan-kudarat"
        break;
      //CCIS
      case "ccis_north_cotabato":
        url += "ccis/north-cotabato"
        break;
      case "ccis_sarangani":
        url += "ccis/sarangani"
        break;
      case "ccis_south_cotabato":
        url += "ccis/south-cotabato"
        break;
      case "ccis_sultan_kudarat":
        url += "ccis/sultan-kudarat"
        break;
      default:
        break;
    }
    if (query === '') UtilsQueryErrorAlert('Your script is blank.');
    else if (endPointTable) {
      // Append the endpoint to the base URL
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sql: query,
            values: [], // You may need to adjust this based on your query
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setTableData(result);
        } else {
          const errorMessage = await response.text();
          console.error(`Failed to execute query. Server response: ${errorMessage}`);
          UtilsQueryErrorAlert(errorMessage);
        }
      } catch (error) {
        console.error('An error occurred while executing the query:', error);
        UtilsQueryErrorAlert('An error occurred while executing the query.');
      }
    } else {
      UtilsQueryErrorAlert('Invalid Table Name. Please enter a valid table name.');
    }

    console.log(`API Endpoint: ${url}`);

  };

  const tablesButton = () => (
    tables.map((table, index) => (
      <button key={index} className="bg-navy-primary text-black px-4 py-2 rounded-md bg-opacity-20 hover:bg-opacity-10" onClick={() => addToQuery("suis." + table)}>
        +suis.{table}
      </button>
    ))
  );

  // Function to show an error message


  async function uploadNewScriptData(sql, values) {
    console.log("values: ", values);
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sql-query-scripts`, postData);
      const response = await res.json();
      console.log("response: ", response);
      if (!res.ok) {
        // Handle server error here (e.g., res.status >= 400)
        const errorResponse = await res.json();
        const errorMessage = errorResponse.error || "Server error occurred";
        console.log("Error Message: ", errorMessage);
        return false;
      } else {
        console.log("Success", response);
        return true;
      }

    } catch (error) {
      console.error("Fetch error:", error);
      return false;
    }
  }

  const handleSaveScript = async () => {
    // Use SweetAlert to confirm the save
    Swal.fire({
      title: 'Save SQL Script?',
      text: 'Do you want to save the SQL script?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      confirmButtonColor: '#053B50',
      cancelButtonText: 'No, cancel!',
      cancelButtonColor: 'red',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Prompt for description
        const { value: description } = await Swal.fire({
          title: 'Save SQL Script?',
          text: 'Please input the description of the SQL Script',
          icon: 'info',
          input: 'text',
          inputPlaceholder: 'Enter description',
          showCancelButton: true,
          confirmButtonText: 'Submit it!',
          confirmButtonColor: '#053B50',
          cancelButtonText: 'Cancel!',
          cancelButtonColor: 'red',
          inputValidator: (value) => {
            // Validate input, you can customize this function as needed
            if (!value) {
              return 'Please enter a description';
            }
          },
        });

        if (description) {
          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          console.log("formatted:",formattedDate)
          // User entered a description, proceed with saving
          const sql = 'INSERT INTO suis.sql_query_scripts(description, script, "user", date)VALUES ($1, $2, $3, $4);';
          const values = [description, query, 'Admin', formattedDate];

          try {
            const success = await uploadNewScriptData(sql, values);

            if (success) {
              UtilsSuccessAlert('Saved!', 'Your SQL script has been saved.');
            } else {
              UtilsErrorAlert('Error', 'Your SQL script is not saved.');
            }
          } catch (error) {
            console.error('Error during save:', error);
            UtilsErrorAlert('Error', 'Your SQL script is not saved. ' + error);
          }
        }
      } else {
        // You can customize the Cancelled Swal here
        UtilsErrorAlert('Cancelled', 'Your SQL script is not saved.');
      }
    });
  };

  const handleSaveScriptResult = async () => {
    Swal.fire({
      title: 'Save Result?',
      text: 'Do you want to save the SQL script result?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      confirmButtonColor: '#053B50',
      cancelButtonText: 'No, cancel!',
      cancelButtonColor: 'red',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Prompt for description
        const { value: description } = await Swal.fire({
          title: 'Save SQL Script?',
          text: 'Please input the description of the table',
          icon: 'info',
          input: 'text',
          inputPlaceholder: 'Enter description',
          showCancelButton: true,
          confirmButtonText: 'Submit it!',
          confirmButtonColor: '#053B50',
          cancelButtonText: 'Cancel!',
          cancelButtonColor: 'red',
          inputValidator: (value) => {
            // Validate input, you can customize this function as needed
            if (!value) {
              return 'Please enter a description';
            }
          },
        });

        if (description) {
          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });

          const jsonString = JSON.stringify(tableData);

          const query = `
          INSERT INTO suis.dynamic_query_results(date,description, result_data)
          VALUES ($1, $2, $3);`;

          const values = [formattedDate,description, jsonString];
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sql-queries/dynamic-query-results`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                sql:query,
                values:values,
              }),
            });
  
            const data = await response.json();
            console.log(data);
            if(data.message === "Success"){
              UtilsSuccessAlert('Saved!', `The ${description} table has been successfully saved`);
            }else{
              UtilsErrorAlert('Error!', data.message);
            }
          } catch (error) {
            UtilsErrorAlert('Error!', error);
          }
     

        }
      } else {
        // You can customize the Cancelled Swal here
        UtilsErrorAlert('Cancelled', 'Your SQL script is not saved.');
      }
    });
  };

  console.log("tableData: ", tableData.length)
  return (
    <div className={`${isMobile ? 'ml-5 mr-5' : isLaptop ? 'ml-40 mr-40' : 'ml-56 mr-56'}`}>
      <Layout>
        <div className='flex flex-col gap-1 w-full'>


          <div className='flex justify-center gap-5 md:gap-6 xl:gap-9 2xl:gap-16 bg-white rounded-3xl h-fit p-4 shadow-md overflow-x-auto overflow-y-hidden mb-5 items-center'>
            <div className='flex gap-3 overflow-auto'>
              {tablesButton()}
            </div>
            <div className='flex gap-3'>



            </div>
          </div>
          <div className='flex justify-center gap-9 md:gap-6 xl:gap-9 2xl:gap-16 bg-white rounded-3xl h-fit p-4 shadow-md overflow-x-auto overflow-y-hidden mb-5 items-center'>
            <div className='flex flex-col w-full relative'>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2"
                rows="2"
                placeholder='/* Enter your script here */'
              ></textarea>
              <SyntaxHighlighter language="sql" style={style}>
                {query}
              </SyntaxHighlighter>
              <div className='flex justify-end'>

              </div>

            </div>
          </div>

          <div className='flex justify-between gap-3  bg-white rounded-3xl h-fit p-4 shadow-md overflow-x-auto overflow-y-hidden mb-5'>
            <div className='flex gap-3'>

              <button
                className="bg-navy-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 disabled:bg-gray-300"
                disabled={tableData.length === 0 ? true : false}
              >Print</button>
              <button
                className="bg-navy-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 disabled:bg-gray-300"
                disabled={tableData.length === 0 ? true : false}
              >Export to EXCEL</button>
              <button
                className="bg-navy-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 disabled:bg-gray-300"
                disabled={tableData.length === 0 ? true : false}
              >Export to CSV</button>
            </div>
            <div className='flex gap-3'>
              <button
                className="bg-navy-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 disabled:bg-gray-300"
                onClick={handleSaveScriptResult}
                disabled={tableData.length === 0 ? true : false}>Save Result</button>
              <button
                className="bg-navy-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 disabled:bg-gray-300"
                onClick={handleSaveScript}
                disabled={query ? false : true}>Save Script</button>
              <button
                className="bg-navy-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 disabled:bg-gray-300"
                onClick={() => setShowViewScript(true)}>View Scripts</button>
              <button
                className="bg-navy-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80"
                onClick={handleQuery}>GO</button>
            </div>


          </div>


          <GeneralTable tableData={tableData} disable={true} />

        </div>
      </Layout>

      <InsertScript
        isOpen={showInsertScript}
        isClose={() => setShowInsertScript(!showInsertScript)} />
      <ViewScriptsModal
        isOpen={showViewScript}
        isClose={() => setShowViewScript(!showViewScript)}
        setQuery={(data) => setQuery(data)}
      />

    </div>
  );
}
