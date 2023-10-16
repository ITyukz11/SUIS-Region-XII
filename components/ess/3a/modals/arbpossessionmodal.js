import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment} from 'react'
import Ess3aTable from '../tables/ess-3a-table'

export default function ArbPossessionModal(props) {

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
                <Dialog.Panel className="w-[80%] transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className='flex justify-between align-middle items-center'>
                    <Image src='/images/SUIS-Logo.png' width={50} height={50} alt='SUIS LOGO'/>
                    <div className='flex justify-center items-center gap-2'>
                    <Image src={props.provinceImage} width={50} height={50} alt='Province Logo' />
                   
                     {props.provinceArb}
                    </div>
                    <Image src='/images/RPS-Logo.png' width={50} height={50} alt='RPS LOGO'/>

                    </div>
                  </Dialog.Title>

                  
                  <div className="mt-2">
                    <Ess3aTable tableData={props.tableData}/>
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
