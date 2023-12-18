import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useDatas } from '../../pages/api/Datas';


export default function InsertScript(props) {

 
    const { sqlQueryScripts} = useDatas();

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
                        <div className="flex min-h-full  items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-screen-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900">
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        {sqlQueryScripts.length > 0 && (
                                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                                                <thead>
                                                    <tr>
                                                        {Object.keys(sqlQueryScripts[0]).map((column, index) => (
                                                            <th key={index} style={{ background: '#f2f2f2', padding: '8px', border: '1px solid #ddd', textAlign: 'left', fontWeight: 'bold', color: '#333' }}>
                                                                {column}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sqlQueryScripts.map((row, rowIndex) => (
                                                        <tr key={rowIndex} style={{ background: rowIndex % 2 === 0 ? '#f9f9f9' : '#ffffff', border: '1px solid #ddd' }}>
                                                            {Object.values(row).map((cell, cellIndex) => (
                                                                <td key={cellIndex} style={{ padding: '8px', border: '1px solid #ddd', color: cellIndex % 2 === 0 ? '#007BFF' : '#333' }}>
                                                                    {cell}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={props.isClose}
                                        >
                                            Okay
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
