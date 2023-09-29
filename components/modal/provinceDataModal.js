import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'
import { MdBrowserUpdated } from 'react-icons/md'

export default function ProvinceDataModal(props) {
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

                    <div className="fixed inset-0 overflow-y-auto ">
                        <div className="flex items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-screen-sm transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        <div className='flex align-middle justify-center gap-5'>
                                            <Image src='/images/SUIS-Logo.png' height={50} width={50} alt='SUIS-Logo'/>
                                           <label className='mt-2'>ESS 3A CCLOA Sequence Number: <i><b><u>{props.data? props.data['Collective CLOA Sequence Number']:''}</u></b></i></label>
                                           <Image src='/images/RPS-Logo.png' height={50} width={50} alt='RPS-Logo'/>
                                        </div>
                                    </Dialog.Title>
                                    <table className="border border-collapse">
                                        <thead>
                                            <tr className='border text-gray-700 uppercase bg-gray-200'>
                                                <th className='border p-2'>Particulars</th>
                                                <th className='border p-2'>Data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.data && typeof props.data === 'object'
                                                ? Object.entries(props.data).map(([property, value], index) => (
                                                    <tr key={index}  className={`border ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-grey-primary hover:cursor-pointer`}>
                                                        <td className="border p-2">{property}</td>
                                                        <td className="border p-2">{value}</td>
                                                    </tr>
                                                ))
                                                : <tr><td colSpan="2" className="border p-2">No data available</td></tr>}
                                        </tbody>
                                    </table>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-navy-primary px-4 py-2 text-sm font-medium text-grey-primary hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={props.isClose}
                                        >
                                            Close
                                        </button>
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
