'use client'

import React from 'react'
import Layout from '../../components/layout'
import { MdSearch } from 'react-icons/md'

export default function ThreeB() {
  return (
    <div>
      <Layout>
        <div className="grid grid-rows-2 grid-flow-col gap-5 mt-14  ml-5 mr-5  justify-items-center">
          <div className='bg-white rounded-3xl h-32 w-full p-4'>01</div>

          <div className='bg-white rounded-3xl h-32 w-full p-4'>02</div>

          <div className='bg-white rounded-3xl h-32 w-full p-4'>03</div>

          <div className='bg-white rounded-3xl h-32 w-full p-4'>04</div>
        </div>
        <div className='bg-white rounded-3xl mt-14 ml-5 mr-5 pl-5 pr-5'>
          <div className='flex justify-between'>
            <div className='flex'>
            <MdSearch/>

<input className='rounded-3xl h-9 w-36 border-2 mt-4'>
 </input>
            </div>
        
           <button className='rounded-3xl h-9 w-36 border-2 mt-4'>
           + Upload New File
           </button>
          </div>
       
          <div>
            {/* <table className="table-auto w-full ">
              <thead>
                <tr>
                  <th>Song</th>
                  <th>Artist</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>Malcolm Lockyer</td>
                  <td>1961</td>
                </tr>
                <tr>
                  <td>Witchy Woman</td>
                  <td>The Eagles</td>
                  <td>1972</td>
                </tr>
                <tr>
                  <td>Shining Star</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
              </tbody>
            </table> */}
          </div>

        </div>
      </Layout>
    </div>
  )
}
