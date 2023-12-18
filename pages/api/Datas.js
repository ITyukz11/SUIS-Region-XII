// Datas.js
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

const Datas = createContext();

export function DatasProvider({ children }) {
      //CHECK IF LOCALHOST OR ONLINE
  const isLocalhost = true //process.env.NEXT_PUBLIC_URL.includes('localhost');
   
  //SQL SCRIPTS
  const[sqlQueryScripts, setSqlQueryScripts] = useState([]);
    //Define the pronvinces 
    const provinces = ['north-cotabato', 'sarangani', 'south-cotabato', 'sultan-kudarat'];

    //DYNAMIC QUERIES
    const [dynamicQueryResultsData, setDynamicQueryResultsData] = useState([])

    //ESS 3A
    const [ess3AnorthCotData, setEss3ANorthCotData] = useState([]);
    const [ess3AsaranganiData, setEss3ASaranganiData] = useState([]);
    const [ess3AsouthCotData, setEss3ASouthCotData] = useState([]);
    const [ess3AsultanKudaratData, setEss3ASultanKudaratData] = useState([]);

    const [localStorageEss3ATotalSeqNo, setLocalStorageEss3ATotalSeqNo] = useState()
    const [localStorageEss3ATotalArea, setLocalStorageEss3ATotalArea] = useState()
    const [localStorageEss3ATotalMale, setLocalStorageEss3ATotalMale] = useState()
    const [localStorageEss3ATotalFemale, setLocalStorageEss3ATotalFemale] = useState()
    const [localStorageEss3ATotalARB, setLocalStorageEss3ATotalARB] = useState()

    const [localStorageEss3AnorthCotData, setLocalStorageEss3AnorthCotData] = useState()
    const [localStorageEss3AsaranganiData, setLocalStorageEss3AsaranganiData] = useState()
    const [localStorageEss3AsoutCotData, setLocalStorageEss3AsoutCotData] = useState()
    const [localStorageEss3AsultanKudaratData, setLocalStorageEss3AsultanKudaratData] = useState()

    const [localStorageEss3aYesPossession, setLocalStorageEss3aYesPossession] = useState()
    const [localStorageEss3aNoPossession, setLocalStorageEss3aNoPossession] = useState()

    //ESS 3B
    const [ess3BnorthCotData, setEss3BNorthCotData] = useState([]);
    const [ess3BsaranganiData, setEss3BSaranganiData] = useState([]);
    const [ess3BsouthCotData, setEss3BSouthCotData] = useState([]);
    const [ess3BsultanKudaratData, setEss3BSultanKudaratData] = useState([]);


    const [localStorageEss3BTotalSeqNo, setLocalStorageEss3BTotalSeqNo] = useState()
    const [localStorageEss3BTotalArea, setLocalStorageEss3BTotalArea] = useState()
    const [localStorageEss3BTotalMale, setLocalStorageEss3BTotalMale] = useState()
    const [localStorageEss3BTotalFemale, setLocalStorageEss3BTotalFemale] = useState()
    const [localStorageEss3BTotalARB, setLocalStorageEss3BTotalARB] = useState()

    const [localStorageEss3BnorthCotData, setLocalStorageEss3BnorthCotData] = useState()
    const [localStorageEss3BsaranganiData, setLocalStorageEss3BsaranganiData] = useState()
    const [localStorageEss3BsoutCotData, setLocalStorageEss3BsoutCotData] = useState()
    const [localStorageEss3BsultanKudaratData, setLocalStorageEss3BsultanKudaratData] = useState()

    const [isMobile, setIsMobile] = useState(false)
    const [isLaptop, setIsLaptop] = useState(false)

    async function getSqlScriptsDatas(){
      const postData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
    
    
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sql-query-scripts`, postData);
          const response = await res.json();
          setSqlQueryScripts(response)
        } catch (error) {
          // Handle the fetch error here
          console.error(`${process.env.NEXT_PUBLIC_URL}/api/sql-query-scripts`, postData, error);
          // Set the data to an empty array or handle it as needed
        }
    
    }

    async function getSqlDynamicQueryResultsDatas(){
      const postData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
    
    
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sql-queries/dynamic-query-results`, postData);
          const response = await res.json();
          setDynamicQueryResultsData(response)
        } catch (error) {
          // Handle the fetch error here
          console.error(`${process.env.NEXT_PUBLIC_URL}/api/sql-queries/dynamic-query-results`, postData, error);
          // Set the data to an empty array or handle it as needed
        }
    
    }

    async function getEss3ADatas() {
      const postData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
    
      provinces.forEach(async (province) => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3a/${province}`, postData);
          const response = await res.json();
          if (!response.error) {
            switch (province) {
              case 'north-cotabato':
                setEss3ANorthCotData(response);
                break;
              case 'sarangani':
                setEss3ASaranganiData(response);
                break;
              case 'south-cotabato':
                setEss3ASouthCotData(response);
                break;
              case 'sultan-kudarat':
                setEss3ASultanKudaratData(response);
                break;
              default:
                break;
            }
            console.log(`response for ${province}: `, response);
          } else {
            // Handle the case when the response contains an error
            console.log(`Failed to fetch data for ${province}`);
            // You can set the data to an empty array or handle it as needed
          }
        } catch (error) {
          // Handle the fetch error here
          console.error(`Error fetching data for ${province} URL: ${process.env.NEXT_PUBLIC_URL}/api/ess/3a/${province}, postData `, error);
          // Set the data to an empty array or handle it as needed
        }
      });
    }
    
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
      //online
      const response = await res.json();
      if (!response.error) {
        switch (province) { // Use `province` instead of `provinces[index]`
          case 'test-north-cotabato':
              setEss3ANorthCotData(response);   
              localStorage.setItem('ess3aNorthCot', response);  
            break;
          case 'test-sarangani':
            setEss3ASaranganiData(response);
            localStorage.setItem('ess3aSarangani', response);

            break;
          case 'test-south-cotabato':
            setEss3ASouthCotData(response);
            localStorage.setItem('ess3aSoutCot', response);

            break;
          case 'test-sultan-kudarat':
            setEss3ASultanKudaratData(response);
            localStorage.setItem('ess3aSultanKudarat', response);

            break;
          default:
            break;
        }
        console.log(`response for ${province}: `, response);
      }
    });
  }

  async function getEss3BDatas() {
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    provinces.forEach(async (province) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3b/${province}`, postData);
        const response = await res.json();
        if (!response.error) {
          switch (province) {
            case 'north-cotabato':
              setEss3BNorthCotData(response);
              break;
            case 'sarangani':
              setEss3BSaranganiData(response);
              break;
            case 'south-cotabato':
              setEss3BSouthCotData(response);
              break;
            case 'sultan-kudarat':
              setEss3BSultanKudaratData(response);
              break;
            default:
              break;
          }
          console.log(`response for ${province}: `, response);
        } else {
          // Handle the case when the response contains an error
          console.log(`Failed to fetch data for ${province}`);
          // Set the data to an empty array or handle it as needed
        }
      } catch (error) {
        // Handle the fetch error here
        console.error(`Error fetching data for ${province}: `, error);
        // Set the data to an empty array or handle it as needed
      }
    });
  }

  async function getSqlQueryScripts(){
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
  
  
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sql-query-scripts`, postData);
        const response = await res.json();
        if (!response.error) {
          setSqlQueryScripts(response)
          console.log(`response: `, response);
        } else {
          console.error(`Error fetching data for sql-query-scripts!`);
        }
      } catch (error) {
        // Handle the fetch error here
        console.error(`Error fetching data for sql-query-scripts: `, error);
        // Set the data to an empty array or handle it as needed
      }
 
  }
  
    //FOR ONLINE 
async function getEss3BDatasTest2() {
const postData = {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
};
const provinces = ['test-north-cotabato', 'test-sarangani', 'test-south-cotabato', 'test-sultan-kudarat'];

provinces.forEach(async (province) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ess/3b/${province}`, postData);
  const response = await res.json();
  if (!response.error) {
    switch (province) { // Use `province` instead of `provinces[index]`
      case 'test-north-cotabato':
          setEss3BNorthCotData(response);   
          localStorage.setItem('ess3aNorthCot', response);  
        break;
      case 'test-sarangani':
        setEss3BSaranganiData(response);
        localStorage.setItem('ess3aSarangani', response);

        break;
      case 'test-south-cotabato':
        setEss3BSouthCotData(response);
        localStorage.setItem('ess3aSoutCot', response);

        break;
      case 'test-sultan-kudarat':
        setEss3BSultanKudaratData(response);
        localStorage.setItem('ess3aSultanKudarat', response);

        break;
      default:
        break;
    }
    console.log(`response for ${province}: `, response);
  }
});
}
  
  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768 for mobile devices)
    const isMobileDevice = window.innerWidth < 640;
    const isLaptopDevice = window.innerWidth < 1492
    setIsMobile(isMobileDevice);
    setIsLaptop(isLaptopDevice)
    // Listen for window resize events to update the state when the screen size changes
    const handleResize = () => {
      const isMobileDevice = window.innerWidth < 640;
      const isLaptopDevice = window.innerWidth < 1492
      setIsMobile(isMobileDevice);
      setIsLaptop(isLaptopDevice)
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    //FETCH DATAS
    useEffect(() => {
        if (isLocalhost) {
            getEss3ADatas()
            getEss3BDatas()
            getSqlScriptsDatas()
            getSqlDynamicQueryResultsDatas()
        } else {
            // getEss3ADatasTest2()
            // getEss3BDatasTest2()
        }
    }, []);

  useEffect(() => {
    //3a
    setLocalStorageEss3ATotalSeqNo(localStorage.getItem('ess3aTotalSeqNo'))
    setLocalStorageEss3ATotalArea(localStorage.getItem('ess3aTotalArea'))
    setLocalStorageEss3ATotalMale(localStorage.getItem('ess3aTotalMale'))
    setLocalStorageEss3ATotalFemale(localStorage.getItem('ess3aTotalFemale'))
    setLocalStorageEss3ATotalARB(localStorage.getItem('ess3aTotalARB'))
    setLocalStorageEss3aYesPossession(localStorage.getItem('ess3aYesArbInPossession'))
    setLocalStorageEss3aNoPossession(localStorage.getItem('ess3aNoArbInPossession'))

    setLocalStorageEss3AnorthCotData(localStorage.getItem('ess3aNorthCot'))
    setLocalStorageEss3AsaranganiData(localStorage.getItem('ess3aSarangani'))
    setLocalStorageEss3AsoutCotData(localStorage.getItem('ess3aSoutCot'))
    setLocalStorageEss3AsultanKudaratData(localStorage.getItem('ess3aSultanKudarat'))
    //3b
    setLocalStorageEss3BnorthCotData(localStorage.getItem('ess3bNorthCot'))
    setLocalStorageEss3BsaranganiData(localStorage.getItem('ess3bSarangani'))
    setLocalStorageEss3BsoutCotData(localStorage.getItem('ess3bSoutCot'))
    setLocalStorageEss3BsultanKudaratData(localStorage.getItem('ess3bSultanKudarat'))

    

      }, []);

    return (
        <Datas.Provider
            value={{
              getSqlScriptsDatas,
                sqlQueryScripts,
                isLocalhost,
                isMobile,
                isLaptop,
                localStorageEss3ATotalSeqNo,
                localStorageEss3ATotalArea,
                localStorageEss3ATotalMale,
                localStorageEss3ATotalFemale,
                localStorageEss3ATotalARB,
                localStorageEss3aYesPossession,
                localStorageEss3aNoPossession,
                localStorageEss3AnorthCotData,
                localStorageEss3AsaranganiData,
                localStorageEss3AsoutCotData,
                localStorageEss3AsultanKudaratData,

                localStorageEss3BTotalSeqNo,
                localStorageEss3BTotalArea,
                localStorageEss3BTotalMale,
                localStorageEss3BTotalFemale,
                localStorageEss3BTotalARB,

                localStorageEss3BnorthCotData,
                localStorageEss3BsaranganiData,
                localStorageEss3BsoutCotData,
                localStorageEss3BsultanKudaratData,

                getSqlDynamicQueryResultsDatas,
                dynamicQueryResultsData,

                getEss3ADatas,
                ess3AnorthCotData,
                ess3AsaranganiData,
                ess3AsouthCotData,
                ess3AsultanKudaratData,

                getEss3BDatas,
                ess3BnorthCotData,
                ess3BsaranganiData,
                ess3BsouthCotData,
                ess3BsultanKudaratData,            
            }}>
            {children}
        </Datas.Provider>
        
    );
  
}

export function useDatas() {
    return useContext(Datas);
}
