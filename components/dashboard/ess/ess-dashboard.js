import { Transition } from '@headlessui/react';
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { MdPanoramaPhotosphereSelect } from 'react-icons/md';

export default function EssDashboard(props) {
    const data = {
        labels: ['Sequence No', 'Area', 'Male', 'Female', 'ARBs','Annotated ARBs', 'Actual Occupants'],
        datasets: [
          {
            label: 'North Cotabato',
            data: [550,222,150,260,150,321,190], // Replace with your actual data values
            backgroundColor: '#289616',
            borderColor: '#000000',
            borderWidth: 0.5,
          },
          {
            label: 'Sarangani',
            data: [111,551,221,441,72,144,10], // Replace with your actual data values
            backgroundColor: '#479f76',
            borderColor: '#000000',
            borderWidth: 0.5,
          },
          {
            label: 'South Cotabato',
            data: [550,222,150,260,100,321,240], // Replace with your actual data values
            backgroundColor: '#4dd4ac',
            borderColor: '#000000',
            borderWidth: 0.5,
          },
          {
            label: 'Sultan Kudarat',
            data: [550,222,150,260,400,321,510], // Replace with your actual data values
            backgroundColor: '#32cd32',
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
          },
          responsive:true

        },
     
    
    
      };
  const containerOverviewCss = 'flex h-fit justify-around bg-white w-full shadow-md overflow-x-auto overflow-y-hidden p-5 mb-5'
  return (
    <div>
              {/**BAR GRAPH */}
              <div className={`${containerOverviewCss} h-[70vh]`}>
                <div className='w-[80%]'>
          
          <Bar data={data} options={options} />



                    </div>
        </div>
    </div>
  )
}
