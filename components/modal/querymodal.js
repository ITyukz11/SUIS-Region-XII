import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function QueryModal(props) {
    console.log(props.data)
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >

                                    </Dialog.Title>
                                    <div className='overflow-y-auto flex justify-center w-full h-[80vh]'>
                                        <table className="border border-collapse w-full">
                                            <thead>
                                            <tr className='border text-gray-700 uppercase bg-gray-200'>
                                                <th className='border p-2'>Particulars</th>
                                                <th className='border p-2'>Data</th>
                                            </tr>

                                            </thead>
                                            <tbody>
                                            {props.data && typeof props.data === 'object'
                                                ? Object.entries(props.data).map(([property, value], index) => (
                                                    property != 'Last Update'?
                                                    
                                                    <tr key={index}  className={`border ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-grey-primary hover:cursor-pointer`}>
                                                        <td className="border p-2">{property}</td>
                                                        <td className="border p-2">{property=='Actual area of tillage/cultivation (in square meters)'?Number(value).toLocaleString():value}</td>
                                                    </tr>:null
                                                    
                                                ))
                                                : <tr><td colSpan="2" className="border p-2">No data available</td></tr>}
                                            </tbody>
                                        </table>
                                    </div>



                                    <div className="flex justify-center mt-4 gap-5">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={props.isClose}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={props.isClose}
                                        >
                                            Save
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
