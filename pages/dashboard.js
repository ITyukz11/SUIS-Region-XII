import React from 'react'
import Layout from '../components/layout'
import { useDatas } from './api/Datas'
import { MdFace3, MdFace6, MdFormatListNumbered, MdGroups2, MdMap } from 'react-icons/md';
import Link from 'next/link';

export default function dashboard() {

  const { isMobile, isLaptop,
    localStorageEss3ATotalSeqNo,
    localStorageEss3ATotalArea,
    localStorageEss3ATotalMale,
    localStorageEss3ATotalFemale,
    localStorageEss3ATotalARB, } = useDatas();

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

  const overviewCss = 'w-full flex justify-center'
  const containerOverviewCss = 'flex h-[75vh] justify-around bg-white rounded-3xl w-full p-4 shadow-md overflow-x-auto overflow-y-hidden mb-5'
  return (

    <Layout>
      <div className={`${isMobile ? 'ml-5 mr-5' : isLaptop ? 'ml-40 mr-40' : 'ml-56 mr-56'}`}>

        <div className='flex justify-around bg-white rounded-3xl w-full h-fit p-4 shadow-md overflow-x-auto overflow-y-hidden mb-5'>
          <div className={overviewCss}>
            <h1 className='font-bold text-2xl'>CCIS</h1>
          </div>
          <div className={`${overviewCss}`}>
            <h1 className='font-bold text-2xl'>Monitoring & Evaluation</h1>
          </div>
          <Link href='/ess/3a' className={`${overviewCss} cursor-pointer hover:bg-grey-primary`}  >
            <div onClick={handlesLinkToEss}>
              <h1 className='font-bold text-2xl'>ESS</h1>
            </div>
          </Link>
        </div>
        <div className='flex flex-row justify-center gap-5'>
          <div className={containerOverviewCss}>
          </div>
        
          
        </div>
      </div>

    </Layout>


  )
}
