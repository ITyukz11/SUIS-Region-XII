import React from 'react'
import Layout from '../components/layout'

export default function Logs() {
    return (
        <Layout >
            <div className='flex justify-center'>
                <div className='w-[100vh] h-[80vh] pb-10 rounded-3xl shadow-xl m-10 p-10 bg-white'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3">No.</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                    <th scope="col" className="px-6 py-3">Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='bg-white'>
                                    <td>1</td>
                                    <td>Bryan</td>
                                    <td>October 11, 2023</td>
                                    <td>Exported Dashboard</td>
                                    <td>For report purpose</td>

                                </tr>
                                <tr  className='bg-gray-50'>
                                    <td>2</td>
                                    <td>Ace</td>
                                    <td>September 25, 2023</td>
                                    <td>Uploaded New Data</td>
                                    <td>FVT</td>

                                </tr>
                                <tr  className='bg-white'>
                                    <td>3</td>
                                    <td>Ahmad</td>
                                    <td>September 29, 2023</td>
                                    <td>Deleted Data</td>
                                    <td>ESS 3A File</td>

                                </tr>
                                <tr className='bg-white'>
                                    <td>4</td>
                                    <td>Bryan</td>
                                    <td>October 11, 2023</td>
                                    <td>Exported Dashboard</td>
                                    <td>For report purpose</td>

                                </tr>
                                <tr className='bg-gray-50'>
                                    <td>5</td>
                                    <td>Ace</td>
                                    <td>September 25, 2023</td>
                                    <td>Uploaded New Data</td>
                                    <td>FVT</td>

                                </tr>
                                <tr className='bg-white'>
                                    <td>6</td>
                                    <td>Ahmad</td>
                                    <td>September 29, 2023</td>
                                    <td>Deleted Data</td>
                                    <td>ESS 3A File</td>

                                </tr>
                                <tr className='bg-white'>
                                    <td>7</td>
                                    <td>Bryan</td>
                                    <td>October 11, 2023</td>
                                    <td>Exported Dashboard</td>
                                    <td>For report purpose</td>

                                </tr>
                                <tr className='bg-gray-50'>
                                    <td>8</td>
                                    <td>Ace</td>
                                    <td>September 25, 2023</td>
                                    <td>Uploaded New Data</td>
                                    <td>FVT</td>
                                </tr>
                                <tr className='bg-white'>
                                    <td>9</td>
                                    <td>Ahmad</td>
                                    <td>September 29, 2023</td>
                                    <td>Deleted Data</td>
                                    <td>ESS 3A File</td>

                                </tr>
                                

                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 flex justify-center gap-10">
                        <button
                            className="bg-navy-primary text-white px-4 py-2 rounded-md disabled:bg-gray-300"
                        >
                            Previous
                        </button>
                        <label>
                        </label>
                        <button


                            className="bg-navy-primary text-white px-4 py-2 rounded-md disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

        </Layout>
    )
}
