import React, { useState } from 'react'
import Layout from '../components/layout'
import { useDatas } from './api/Datas'
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; //required to import for scales type category in chart
import { Transition } from '@headlessui/react';
import 'chartjs-plugin-datalabels';
import DashboardModal from '../components/dashboard/tables/modal/dashboard-modal';
import EssDashboard from '../components/dashboard/ess/ess-dashboard';

export default function dashboard() {

  const { isMobile, isLaptop,
    localStorageEss3ATotalSeqNo,
    localStorageEss3ATotalArea,
    localStorageEss3ATotalMale,
    localStorageEss3ATotalFemale,
    localStorageEss3ATotalARB, } = useDatas();

    //Dashboard Modal 
  const [showDashboardModal, setShowDashboardModal] = useState(false)
  const [title, setTitle] = useState('')

  const [ccisSelected, setCcisSelected] = useState(false)
  const [mneSelected, setMneSelected] = useState(false)
  const [essSelected, setEssSelected] = useState(false)

  const [selectWorkable, setSelectWorkable] = useState(true)

  const data = {
    labels: ['Sequence No', 'Area', 'Male', 'Female', 'ARBs'],
    datasets: [
      {
        label: 'CCIS',
        data: [550, 200, 300, 150, 100], // Replace with your actual data values
        backgroundColor: '#2F5597',
        borderColor: '#000000',
        borderWidth: 0.5,
      },
      {
        label: 'M&E',
        data: [400, 250, 100, 50, 300], // Replace with your actual data values
        backgroundColor: '#f8ba57',
        borderColor: '#000000',
        borderWidth: 0.5,
      },
      {
        label: 'ESS',
        data: [430, 100, 250, 50, 300], // Replace with your actual data values
        backgroundColor: '#8d9f85',
        borderColor: '#000000',
        borderWidth: 0.5,
      },
    ],
  };


  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    datalabels: {
      color: 'black',
      labels: {
        title: {
          font: {
            weight: 'bold'
          }
        },
        value: {
          color: 'green'
        }
      }
    },
    responsive: true,


  };


  const workable1stData = {
    labels: ['CCIS', 'M & E', 'ESS'],
    datasets: [
      {
        label: 'workable datas',
        data: [12, 19, 15],
        backgroundColor: [
          '#2F5597 ',
          '#f8ba57 ',
          '#8d9f85',
        ],
        borderColor: [
          '#1F7959',

        ],
        borderWidth: 2,
      },
    ],
  };

  const workable2ndData = {
    labels: ['CCIS', 'M & E', 'ESS'],
    datasets: [
      {
        label: 'workable datas',
        data: [12, 19, 15],
        backgroundColor: [
          '#2F5597 ',
          '#f8ba57 ',
          '#8d9f85',
        ],
        borderColor: [
          '#1F7959',

        ],
        borderWidth: 2,
      },
    ],
  };

  const workable3rdData = {
    labels: ['CCIS', 'M & E', 'ESS'],
    datasets: [
      {
        label: 'workable datas',
        data: [12, 19, 15],
        backgroundColor: [
          '#2F5597 ',
          '#f8ba57 ',
          '#8d9f85',
        ],
        borderColor: [
          '#1F7959',

        ],
        borderWidth: 2,
      },
    ],
  };

  const workable4thData = {
    labels: ['CCIS', 'M & E', 'ESS'],
    datasets: [
      {
        label: 'workable datas',
        data: [12, 19, 15],
        backgroundColor: [
          '#2F5597 ',
          '#f8ba57 ',
          '#8d9f85',
        ],
        borderColor: [
          '#1F7959',

        ],
        borderWidth: 2,
      },
    ],
  };

  const nonWorkable1stData = {
    labels: ['CCIS', 'M & E', 'ESS'],
    datasets: [
      {
        label: 'workable datas',
        data: [12, 19, 15],
        backgroundColor: [
          '#2F5597 ',
          '#f8ba57 ',
          '#8d9f85',
        ],
        borderColor: [
          '#BF5353',

        ],
        borderWidth: 2,
      },
    ],
  };

  const nonWorkable2ndData = {
    labels: ['CCIS', 'M & E', 'ESS'],
    datasets: [
      {
        label: 'workable datas',
        data: [12, 19, 15],
        backgroundColor: [
          '#2F5597 ',
          '#f8ba57 ',
          '#8d9f85',
        ],
        borderColor: [
          '#BF5353',

        ],
        borderWidth: 2,
      },
    ],
  };

  const nonWorkable3rdData = {
    labels: ['CCIS', 'M & E', 'ESS'],
    datasets: [
      {
        label: 'workable datas',
        data: [12, 19, 15],
        backgroundColor: [
          '#2F5597 ',
          '#f8ba57 ',
          '#8d9f85',
        ],
        borderColor: [
          '#BF5353',

        ],
        borderWidth: 2,
      },
    ],
  };

  const nonWorkable4thData = {
    labels: ['CCIS', 'M & E', 'ESS'],
    datasets: [
      {
        label: 'workable datas',
        data: [12, 19, 15],
        backgroundColor: [
          '#2F5597 ',
          '#f8ba57 ',
          '#8d9f85',
        ],
        borderColor: [
          '#BF5353',

        ],
        borderWidth: 2,
      },
    ],
  };

  const overviewData = (image, title, data) => {
    const styledImage = React.cloneElement(image, {
      className: 'sm:text-base md:text-base lg:text-lg xl:text-xl',
    });
    return (
      <div className="w-fit flex flex-col gap-1 text-left items-center">
        <div className="flex flex-col items-center">
          {styledImage}
          <label className="font-bold text-navy-primary cursor-pointer text-xs">{title}</label>
          {isNaN(data) ? (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-7 bg-gray-200 rounded-md dark:bg-gray-700 w-14 mb-4"></div>
            </div>
          ) : (
            <label className="font-semibold mt-auto  sm:text-xs md:text-base lg:text-xl xl:text-2xl 2xl:text-2xl">{data ? Number(data).toLocaleString() : 'No Data'}</label>
          )}
        </div>
      </div>
    )
  };

  const handlesLinkToEss = () => {

  }

  const handlesMenuSelected = (menu) => {
    switch (menu) {
      case 1:
        setCcisSelected(!ccisSelected)
        setMneSelected(false)
        setEssSelected(false)
        break;
      case 2:
        setCcisSelected(false)
        setMneSelected(!mneSelected)
        setEssSelected(false)
        break;
      case 3:
        setCcisSelected(false)
        setMneSelected(false)
        setEssSelected(!essSelected)
        break;
      default:
        break;
    }
  }
  const overviewCss = 'flex justify-center p-4 hover:bg-white cursor-pointer hover:inner-border-[10px] items-center transition-all shadow-md'
  const containerOverviewCss = 'flex h-fit justify-around bg-white w-full shadow-md overflow-x-auto overflow-y-hidden p-5 mb-5'
  return (

    <Layout>
      <div className={`${isMobile ? 'ml-5 mr-5' : isLaptop ? 'ml-40 mr-40' : 'ml-56 mr-56'}`}>
        <div className='flex justify-around bg-white w-full h-fit shadow-md overflow-x-auto overflow-y-hidden mb-5'>
          <div className={`${overviewCss} w-full hover:text-ccis-primary inner-border-ccis-primary ${ccisSelected ? 'text-ccis-primary bg-white inner-border-[10px]' : 'bg-ccis-primary text-white'}`} onClick={() => handlesMenuSelected(1)}>
            <h1 className='font-bold text-2xl '>CCIS</h1>
          </div>
          <div className={`${overviewCss} w-full   hover:text-mne-primary inner-border-mne-primary ${mneSelected ? 'text-mne-primary bg-white inner-border-[10px]' : 'bg-mne-primary text-white'}`} onClick={() => handlesMenuSelected(2)}>
            <h1 className='font-bold text-2xl'>M&E</h1>
          </div>
          <div className={`${overviewCss} w-full  hover:text-ess-primary inner-border-ess-primary ${essSelected ? 'text-ess-primary bg-white inner-border-[10px]' : 'bg-ess-primary text-white'}`} onClick={() => handlesMenuSelected(3)}>
            <h1 className='font-bold text-2xl'>ESS</h1>
          </div>
          {/* <Link href='/ess/3a' className={`${overviewCss} cursor-pointer hover:bg-grey-primary`}  >
            <div onClick={handlesLinkToEss}>
              <h1 className='font-bold text-2xl'>ESS</h1>
            </div>
          </Link> */}
        </div>
          
          {essSelected?<>
          <EssDashboard/>
          </>:
           <>
        <div className={`${containerOverviewCss} h-[70vh]`}>
             {/**BAR GRAPH */}
             <div className='w-[80%]'>
        <Bar data={data} options={options} />
        </div>
      </div>

              {/**WORKABLE & NOT WORKABLE PIE CHART */}
              <div className={`${containerOverviewCss}`}>
              <div className='flex flex-col w-full items-center'>
                <div className='flex justify-around bg-white w-[50%] h-fit shadow-md overflow-x-auto overflow-y-hidden mb-5'>
                  <div className={`${overviewCss} w-full  hover:text-[#1F7959] inner-border-[#1F7959] ${selectWorkable ? 'text-[#1F7959] bg-white inner-border-[10px]' : 'bg-[#1F7959] text-white'}`} onClick={() => setSelectWorkable(true)}>
                    <h1 className='font-bold text-2xl '>WORKABLE</h1>
                  </div>
                  <div className={`${overviewCss} w-full   hover:text-[#BF5353] inner-border-[#BF5353] ${!selectWorkable ? 'text-[#BF5353] bg-white inner-border-[10px]' : 'bg-[#BF5353] text-white'}`} onClick={() => setSelectWorkable(false)}>
                    <h1 className='font-bold text-2xl'>NOT WORKABLE</h1>
                  </div>
                </div>
                {/**WORKABLE */}
                <Transition
                  show={selectWorkable}
                  enter="transition-opacity duration-150"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className='flex justify-around gap-10 bg-red mt-5'>
                    <div className='flex flex-col justify-center items-center w-96 text-2xl bg-[#1F7959] p-2'>
                      <label className='text-white'>Target Landholdings Workable</label>
                      <label className='text-white font-bold text-3xl'>10,596</label>
                    </div>
                    <div className='flex flex-col justify-center items-center w-96 text-2xl bg-[#1F7959] p-2'>
                      <label className='text-white'>Target Area Workable</label>
                      <label className='text-white font-bold text-3xl'>161,080.5</label>
                    </div>
    
                  </div>
                  <div>
                    <div className='flex flex-wrap justify-center items-center gap-11 mt-5'>
                      <div className='grid grid-cols-2 gap-14 text-center'>
                        <div className='h-80 w-80'>
                          <label>Workable CCLOA (With eCopy of CTCT)</label>
                          <Pie data={workable1stData} />
                        </div>
                        <div className='h-80 w-80'>
                          <label>Workable CCLOA (Without eCopy of CTCT)</label>
                          <Pie data={workable2ndData} />
                        </div>
    
    
    
                        <div>
                          <label>Workable Area (With eCopy of CTCT)</label>
                          <Pie data={workable3rdData} />
                        </div>
                        <div>
                          <label>Workable Area (Without eCopy of CTCT)</label>
                          <Pie data={workable4thData} />
                        </div>
    
                      </div>
                    </div>
                  </div>
                </Transition>
                {/**NOT WORKABLE */}
                <Transition
                  show={!selectWorkable}
                  enter="transition-opacity duration-150"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className='flex justify-around gap-10 bg-red mt-5'>
    
                    <div className='flex flex-col justify-center items-center w-96 text-2xl bg-[#BF5353] p-2 cursor-pointer' onClick={()=> {setShowDashboardModal(true);setTitle('Target Landholdings Not Workable')}}>
                      <label className='text-white text-center text-xl cursor-pointer'>Target Landholdings Not Workable</label>
                      <label className='text-white font-bold text-3xl cursor-pointer'>10,596</label>
                    </div>
                    <div className='flex flex-col justify-center items-center w-96 text-2xl bg-[#BF5353] p-2 cursor-pointer' onClick={()=> {setShowDashboardModal(true);setTitle('Target Area Not Workable')}}>
                      <label className='text-white text-center cursor-pointer'>Target Area Not Workable</label>
                      <label className='text-white font-bold text-3xl cursor-pointer'>161,080.5</label>
                    </div>
                  </div>
    
    
    
                  <div>
                    <div className='flex flex-wrap justify-center items-center gap-11 mt-5'>
                      <div className='grid grid-cols-2 gap-14 text-center'>
                        <div className='h-80 w-80'>
                          <label>Problematic CCLOA</label>
                          <Pie data={nonWorkable1stData} />
                        </div>
                        <div className='h-80 w-80'>
                          <label>Problematic Area</label>
                          <Pie data={nonWorkable2ndData} />
                        </div>
    
                    
    
                        <div>
                          <label>Deductible CCLOA</label>
                          <Pie data={nonWorkable3rdData} />
                        </div>
                        <div>
                          <label>Deductible Area</label>
                          <Pie data={nonWorkable4thData} />
                        </div>
    
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
            </>
          }
    






      </div>

      <DashboardModal
        isOpen={showDashboardModal}
        closeModal={()=> setShowDashboardModal(false)}
        title={title} /> 
    </Layout>


  )











}
