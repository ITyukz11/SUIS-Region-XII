import { useEffect, useState } from 'react'

export default function CountBlankSoloModal(props) {

    //TOTALS
    const [totalBlankData, setTotalBlankData] = useState(0)


    //North Cotabato
    const [SeqNo, setSeqNo] = useState(0)
    const [Area, setArea] = useState(0)
    const [FirstName, setFirstName] = useState(0)
    const [MiddleName, setMiddleName] = useState(0)
    const [LastName, setLastName] = useState(0)
    const [Gender, setGender] = useState(0)

    useEffect(() => {
        //Define first
        const seqNum = 'Collective CLOA Sequence Number'
        const area = 'Actual area of tillage/cultivation (in square meters)'
        const fn = 'First Name'
        const mn = 'Middle Name'
        const ln = 'Last Name'
        const gender = 'Gender'

        //North Cotabato Calculate blank counts
        const countSeqnum = props.tableData.filter(obj => obj[seqNum] === '' || obj[seqNum] === null || obj[seqNum] === undefined || obj[seqNum] <=0|| isNaN(obj[seqNum])).length;
        const countArea = props.tableData.filter(obj => obj[area] === '' || obj[area] === null || obj[area] === undefined || obj[area] <= 0).length;
        const countFn = props.tableData.filter(obj => obj[fn] === '' || obj[fn] === null || obj[fn] === undefined || !isNaN(obj[fn])).length;
        const countMd = props.tableData.filter(obj => obj[mn] === '' || obj[mn] === null || obj[mn] === undefined || !isNaN(obj[mn])).length;
        const countLn = props.tableData.filter(obj => obj[ln] === '' || obj[ln] === null || obj[ln] === undefined || !isNaN(obj[ln])).length;
        const countGender = props.tableData.filter(obj => obj[gender] === '' || obj[gender] === null || obj[gender] === undefined || !isNaN(obj[gender])).length;

        //Total of all blanks
        const Total = countSeqnum + countArea + countFn + countMd + countLn + countGender
        const overallTotal = Total

        setTotalBlankData(overallTotal)

        // North Cotabato Update state variables with counts
        setSeqNo(countSeqnum);
        setArea(countArea)
        setFirstName(countFn)
        setMiddleName(countMd)
        setLastName(countLn)
        setGender(countGender)

    }, []);
    return (
        <>
            <div
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900">
            </div>
            <div className='overflow-x-auto rounded-lg'>
                <table className="border border-collapse w-full">
                    <thead>
                        <tr className='border text-gray-700 bg-gray-200'>
                            <th className='border p-2 w-[25%]'>Particulars</th>
                            <th className='border p-2 w-[19%]'>0 or Blank  Values</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border bg-white hover:bg-grey-primary '>
                            <td className="border p-2">CCLOA Seq. Number</td>
                            <td className="border p-2">{SeqNo}</td>

                        </tr>
                        <tr className='border bg-gray-50 hover:bg-grey-primary '>
                            <td className="border p-2">Actual Area</td>
                            <td className="border p-2">{Area}</td>

                        </tr>
                        <tr className='border bg-white hover:bg-grey-primary '>
                            <td className="border p-2">First Name</td>
                            <td className="border p-2">{FirstName}</td>

                        </tr>
                        <tr className='border bg-gray-50 hover:bg-grey-primary '>
                            <td className="border p-2">Middle Name</td>
                            <td className="border p-2">{MiddleName}</td>

                        </tr>
                        <tr className='border bg-white hover:bg-grey-primary '>
                            <td className="border p-2">Last Name</td>
                            <td className="border p-2">{LastName}</td>

                        </tr>
                        <tr className='border bg-gray-50 hover:bg-grey-primary '>
                            <td className="border p-2">Gender</td>
                            <td className="border p-2">{Gender}</td>

                        </tr>
                        <tr className='border border-t-gray-500 border-t-2 bg-gray-100 hover:bg-grey-primary '>
                            <td className="border p-2 font-bold">TOTAL</td>
                            <td className="border p-2">{totalBlankData}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
