// Datas.js
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

const Datas = createContext();

export function DatasProvider({ children }) {
      //CHECK IF LOCALHOST OR ONLINE
  const isLocalhost = process.env.NEXT_PUBLIC_URL.includes('localhost');
    //Define the pronvinces 
    const provinces = ['north-cotabato', 'sarangani', 'south-cotabato', 'sultan-kudarat'];

    const [ess3AnorthCotData, setEss3ANorthCotData] = useState([]);
    const [ess3AsaranganiData, setEss3ASaranganiData] = useState([]);
    const [ess3AsouthCotData, setEss3ASouthCotData] = useState([]);
    const [ess3AsultanKudaratData, setEss3ASultanKudaratData] = useState([]);

    const [localStorageEss3ATotalSeqNo, setLocalStorageEss3ATotalSeqNo] = useState()
    const [localStorageEss3ATotalArea, setLocalStorageEss3ATotalArea] = useState()
    const [localStorageEss3ATotalMale, setLocalStorageEss3ATotalMale] = useState()
    const [localStorageEss3ATotalFemale, setLocalStorageEss3ATotalFemale] = useState()
    const [localStorageEss3ATotalARB, setLocalStorageEss3ATotalARB] = useState()

    const [localStorageEss3aYesPossession, setLocalStorageEss3aYesPossession] = useState()
    const [localStorageEss3aNoPossession, setLocalStorageEss3aNoPossession] = useState()

    const [isMobile, setIsMobile] = useState(false)
    const [isLaptop, setIsLaptop] = useState(false)

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
      const response = await res.json();
      if (!response.error) {
        switch (province) { // Use `province` instead of `provinces[index]`
          case 'test-north-cotabato':
            setEss3ANorthCotData(response);
            break;
          case 'test-sarangani':
            setEss3ASaranganiData(response);
            break;
          case 'test-south-cotabato':
            setEss3ASouthCotData(response);
            break;
          case 'test-sultan-kudarat':
            setEss3ASultanKudaratData(response);
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
        } else {
            getEss3ADatasTest2()
        }
    }, []);

    useEffect(() => {
        setLocalStorageEss3ATotalSeqNo(localStorage.getItem('ess3aTotalSeqNo'))
        setLocalStorageEss3ATotalArea(localStorage.getItem('ess3aTotalArea'))
        setLocalStorageEss3ATotalMale(localStorage.getItem('ess3aTotalMale'))
        setLocalStorageEss3ATotalFemale(localStorage.getItem('ess3aTotalFemale'))
        setLocalStorageEss3ATotalARB(localStorage.getItem('ess3aTotalARB'))
        setLocalStorageEss3aYesPossession(localStorage.getItem('ess3aYesArbInPossession'))
        setLocalStorageEss3aNoPossession(localStorage.getItem('ess3aNoArbInPossession'))
      }, []);
    return (
        <Datas.Provider
            value={{
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
                getEss3ADatas,
                ess3AnorthCotData,
                ess3AsaranganiData,
                ess3AsouthCotData,
                ess3AsultanKudaratData
            }}>
            {children}
        </Datas.Provider>
    );
}

export function useDatas() {
    return useContext(Datas);
}
