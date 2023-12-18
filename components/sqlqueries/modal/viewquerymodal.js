import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import { MdClose, MdSearch } from 'react-icons/md'
import GeneralTable from '../../generaltable';
import { useDatas } from '../../../pages/api/Datas';

export default function ViewQueryModal(props) {
  const { isLaptop } = useDatas()
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = props.data.result_data ? props.data.result_data.filter((item) => {
    const values = Object.values(item);
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
    }
    return false;
  }) : '';

  const handlesSearchQuery = (e) => {
    setSearchQuery(e.target.value)
  };

  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={props.isClose}>
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

          <div className="fixed inset-0 overflow-y-auto ">
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
                <Dialog.Panel className="w-[80%] min-h-[550px] transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  {/* <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                       <MdClose
                        className='absolute right-5 text-4xl hover:bg-gray-300 hover:cursor-pointer rounded-full'
                        onClick={() => props.isClose()}
                      />
                  </Dialog.Title> */}

                  <div className='flex flex-wrap justify-between items-center'>

                    <div className='flex items-center mb-2 relative'>
                      <MdSearch className='absolute mt-4 ml-2 text-2xl' />
                      <input
                        className='rounded-3xl h-12 w-auto border-2 mt-4 pl-8 align-middle pr-3'
                        type='text'
                        placeholder='Search'
                        value={searchQuery}
                        onChange={handlesSearchQuery}
                      />
                      <MdClose
                        className='absolute mt-4 right-5 text-2xl hover:bg-gray-300 hover:cursor-pointer rounded-full'
                        onClick={() => setSearchQuery('')}
                      />
                    </div>
                    <div>Description: <label className='font-semibold shadow-sm'>{props.data.description}</label>
                    </div>
                    <div className='flex flex-row gap-2'><Image src='/images/RPS-Logo.png' height={50} width={50} alt='RPS-Logo' />
                      <Image src='/images/SUIS-Logo.png' height={50} width={50} alt='RPS-Logo' />
                      <MdClose
                        className=' text-4xl hover:bg-gray-300 hover:cursor-pointer rounded-full'
                        onClick={() => props.isClose()}
                      />
                      </div>
                    
                  </div>
                  <div className='border-t border-navy-primary pt-2'>
                    <GeneralTable tableData={filteredData} />
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
