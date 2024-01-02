import React, { useEffect, useState } from 'react'
import { useDatas } from '../api/Datas'
import Layout from '../../components/layout'
import { Transition } from '@headlessui/react'
import Counter from '../../components/Counter'
import { TbTargetArrow } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { CgNotes } from "react-icons/cg";
import { MdGroups2, MdMap } from 'react-icons/md'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function FVR() {
    const {
      isMobile, isLaptop,

      localStorageCCISTotalNoOfCCLOA,
      localStorageCCISTotalArea,
      localStorageCCISAnnotatedTotalNoOfArbs,

      CCISAnnotatedARBsData,

      getCCISDatas,
      CCISNorthCotData,
      CCISSaranganiData,
      CCISSouthCotData,
      CCISSultanKudaratData} = useDatas()

      const [showProvincialDatas, setShowProvincialDatass] = useState(false)

      const [totalNoCCLOA, setTotalNoCCLOA] = useState()
      const [totalArea, setTotalArea] = useState()
      const [totalNoARBs, setTotalNoARBs] = useState()
    // console.log("CCISNorthCotData: ", CCISNorthCotData?CCISNorthCotData:'')
    // console.log("CCISSaranganiData: ", CCISSaranganiData?CCISSaranganiData:'')
    // console.log("CCISSouthCotData: ", CCISSouthCotData?CCISSouthCotData:'')
    // console.log("CCISSultanKudaratData: ", CCISSultanKudaratData?CCISSultanKudaratData:'')

  const containerChildClassName = 'flex justify-around gap-2 bg-white rounded-3xl h-fit w-full p-4 shadow-md overflow-x-auto overflow-y-hidden cursor-pointer hover:bg-grey-primary'
  const gridClassName = isLaptop ? 'flex flex-wrap gap-5 text-xs' : 'grid grid-rows-2 grid-flow-col gap-5 justify-items-center';

  useEffect(() => {
    calculateTotalStatistics();
  }, [CCISNorthCotData,
    CCISSaranganiData,
    CCISSouthCotData,
    CCISSultanKudaratData]);
      
  const countNoOfCCLOA = (datas) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return <div role="status" className="max-w-sm animate-pulse" >
        <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-8 mb-4"></div>
      </div>;
    }

    let noOfCCLOA = 0
   // if (isLocalhost) {
    noOfCCLOA = datas.reduce((count, item) => {
        const year = item['p_DateFieldValidationCompleted']
        // Check if the item has a SeqNo property
        if (year.includes("2021") || year.includes("2022") || year.includes("2023"))  {
          // Increment the count by 1 for each occurrence of SeqNo
          return count + 1;
        }
        return count;
      }, 0);
    // } else {
    //   seqNoCount = datas[0].seqno
    //   console.log("datas: ", datas)
    // }


    return noOfCCLOA;
  };

  const countAreas = (datas) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return (
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
        </div>
      );
    }
  
    let cloaAreaCount = datas ? datas.reduce((count, item) => {
      const year = item['p_DateFieldValidationCompleted'];
      const area = item['RealWorkableArea'];
  
      try {
        if (year.includes("2021") || year.includes("2022") || year.includes("2023"))  {
          const areaWithoutComma = area.replace(/,/g, ''); // Remove commas
          return count + parseFloat(areaWithoutComma);
        }
      } catch (error) {
        console.error('Error parsing area:', error);
      }
  
      return count;
    }, 0) : 0;
  
    const finalArea = cloaAreaCount / 10000; // HAS hectare unit
    return finalArea;
  };
  
  const countNoOfARBs = (datas) => {
    if (!Array.isArray(datas) || datas.length === 0) {
      return (
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
        </div>
      );
    }
    const seqNoArray =[]
    try {
      datas.map((data)=>{
        const year = data['p_DateFieldValidationCompleted']
        if (year.includes("2021") || year.includes("2022") || year.includes("2023"))seqNoArray.push(data['SeqNo'])
    })

      const noOfArbs = CCISAnnotatedARBsData.reduce((count, item) => {      
        const seqNo = item['SeqNo'];
  
        if (seqNoArray.includes(seqNo)) {
        
            return count + 1;
          
        }
  
        return count;
      }, 0);
     // return seqNoArray
      return noOfArbs;
    } catch (error) {
      console.error('Error counting ARBs:', error);
      return 0; // Return 0 in case of an error
    }
  };
  
  const calculateTotalStatistics = async () => {
    let totalNoCCLOA = 0;
    let totalArea = 0;
    let totalNoARBs = 0;

    const dataSources = [CCISNorthCotData, CCISSaranganiData, CCISSouthCotData, CCISSultanKudaratData];

    for (const data of dataSources) {
      if (data) {
        totalNoCCLOA += countNoOfCCLOA(data);
        totalArea += countAreas(data);
        totalNoARBs += countNoOfARBs(data)
      }
    }
    if (!localStorageCCISTotalNoOfCCLOA == undefined || localStorageCCISTotalNoOfCCLOA !== totalNoCCLOA && !isNaN(totalNoCCLOA)) {
      setTotalNoCCLOA(totalNoCCLOA)
      localStorage.setItem('ccisTotalNoCCLOA', totalNoCCLOA);
    }
    if (!localStorageCCISTotalArea == undefined || localStorageCCISTotalArea !== totalArea && !isNaN(totalArea)) {
      setTotalArea(totalArea)
      localStorage.setItem('ccisTotalArea', totalArea);
    }
    if (!localStorageCCISAnnotatedTotalNoOfArbs == undefined || localStorageCCISAnnotatedTotalNoOfArbs !== totalArea && !isNaN(totalArea)) {
      setTotalNoARBs(totalNoARBs)
      localStorage.setItem('ccisAnnotatedTotalNoOfArbs', totalNoARBs);
    }
    // Save the totals in local storage
  };

  const imgClassName = `${isMobile ? 'w-[50px] h-[50px]' : 'w-[100px] h-[100px]'} sm:w-[50px] md:w-[70px] lg:w-[80px] xl:w-[90px] 2xl:w-[100px] sm:h-[50px] md:h-[70px] lg:h-[80px] xl:h-[90px] 2xl:h-[100px]`
  const overviewProvinceData = (image, title, color, data) => {
    const styledImage = React.cloneElement(image, {
      className: 'sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl',
    });
    return (
      <div className='w-fit flex flex-col text-left justify-start items-center cursor-pointer'>
        {styledImage}
        <label className='font-bold text-navy-primary cursor-pointer'>{title}</label>
        <label className={`font-semibold ${color} mt-auto sm:text-xs md:text-base lg:text-base xl:text-lg 2xl:text-xl cursor-pointer`}>{Math.round(data) || data == 0? title == "Area(Has)" ? data.toFixed(2).toLocaleString() : data:
          <div role="status" className="max-w-sm animate-pulse">
            <div className="h-4 mt-auto bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4"></div>
          </div>}</label>
      </div>
    )
  }

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
            <label className="font-semibold mt-auto  sm:text-xs md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl cursor-pointer">{data ? data.toLocaleString() : ''}</label>
          )}
        </div>
      </div>
    )
  };
console.log("countNoOfARBs(CCISNorthCotData): ", countNoOfARBs(CCISNorthCotData))
    return (
      <div className={`${isMobile ? 'ml-5 mr-5' : isLaptop ? 'ml-40 mr-40' : 'ml-56 mr-56'}`}>
        <Layout>
        <div className='flex justify-center gap-9 md:gap-6 xl:gap-9 2xl:gap-16 bg-white rounded-3xl h-fit p-4 shadow-md overflow-x-auto overflow-y-hidden mb-5 items-center cursor-pointer hover:bg-grey-primary' onClick={()=> setShowProvincialDatass(!showProvincialDatas)}>
 <label className='font-black flex items-center text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl cursor-pointer'>FVT ACCOMPLISHMENT</label>   
</div>
          {/**Overall Overview of Provincial Datas CONTAINER */}
          <div className='flex justify-center gap-9 md:gap-6 xl:gap-9 2xl:gap-16 bg-white rounded-3xl h-fit p-4 shadow-md overflow-x-auto overflow-y-hidden mb-5 items-center cursor-pointer hover:bg-grey-primary' onClick={()=> setShowProvincialDatass(!showProvincialDatas)}>
            {/* <Image width={180} height={170} src="/images/dar-region12-logo.png" alt='dar region 12 logo' /> */}
            <img className={`${isMobile ? 'w-[80px] h-[80px]' : 'w-[170px] h-[170px]'} sm:w-[70px] md:w-[80px] lg:w-[100px] xl:w-[120px] 2xl:w-[140px] sm:h-[70px] md:h-[80px] lg:h-[100px] xl:h-[120px] 2xl:h-[140px] `} src="/images/dar-region12-logo.png" alt='dar region 12 logo' />
            {overviewData(<TbTargetArrow />, 'Global Target',179394.17)}
            {overviewData(<GiMoneyStack />, 'Funded Target',111820)}
            {overviewData(<CgNotes />, 'No. of CCLOA',totalNoCCLOA)}
            {overviewData(<MdMap />, 'Area(Has)',totalArea)}
            {overviewData(<MdGroups2 />, 'No. of ARBs',totalNoARBs)}        
            <div className='flex flex-col justify-center items-center'>
            {isMobile ? '' : <label className='font-black flex items-center text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl cursor-pointer'>CCIS</label>}

         
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
            leaveTo="opacity-0">            
             <div className={gridClassName}>
            {/**NORTH COTABATO */}
            <div className={containerChildClassName}>
              <img className={imgClassName} src="/images/cotabato.png" alt='dar region 12 logo' />
              {overviewProvinceData(<CgNotes />, 'No. of CCLOA','text-green-700',countNoOfCCLOA(CCISNorthCotData))}
              {overviewProvinceData(<MdMap />, 'Area(Has)','text-green-700',countAreas(CCISNorthCotData))}
              {overviewProvinceData(<MdGroups2 />, 'No. of ARBs','text-green-700',countNoOfARBs(CCISNorthCotData))}
            </div>
  
            {/**SOUTH COTABATO */}
            <div className={containerChildClassName}>
              <img className={imgClassName} src="/images/south-cotabato.png" alt='dar region 12 logo' />
              {overviewProvinceData(<CgNotes />, 'No. of CCLOA','text-blue-700',countNoOfCCLOA(CCISSouthCotData))}
              {overviewProvinceData(<MdMap />, 'Area(Has)','text-blue-700',countAreas(CCISSouthCotData))}
              {overviewProvinceData(<MdGroups2 />, 'No. of ARBs','text-blue-700',countNoOfARBs(CCISSouthCotData))}
            </div>
            {/**SARANGANI */}
            <div className={containerChildClassName}>
              <img className={imgClassName} src="/images/sarangani.png" alt='dar region 12 logo' />
              {overviewProvinceData(<CgNotes />, 'No. of CCLOA','text-yellow-600',countNoOfCCLOA(CCISSaranganiData))}
              {overviewProvinceData(<MdMap />, 'Area(Has)','text-yellow-600',countAreas(CCISSaranganiData))}
              {overviewProvinceData(<MdGroups2 />, 'No. of ARBs','text-yellow-600',countNoOfARBs(CCISSaranganiData))}
            </div>
            {/**SULTAN KUDARAT */}
            <div className={containerChildClassName}>
              <img className={imgClassName} src="/images/sultan-kudarat.png" alt='dar region 12 logo' />
              {overviewProvinceData(<CgNotes />, 'No. of CCLOA','text-gray-600',countNoOfCCLOA(CCISSultanKudaratData))}
              {overviewProvinceData(<MdMap />, 'Area(Has)','text-gray-600',countAreas(CCISSultanKudaratData))}
              {overviewProvinceData(<MdGroups2 />, 'No. of ARBs','text-gray-600',countNoOfARBs(CCISSultanKudaratData))}
            </div>
          </div>
            </Transition>
       
        </Layout>
         
      </div>
    )
}
