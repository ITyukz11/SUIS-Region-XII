import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'

export default function CountBlankModal(props) {

    //TOTALS
    const [totalNorthCot, setTotalNorthCot] = useState(0)
    const [totalSarangani, setTotalSarangani] = useState(0)
    const [totalSouthCot, setTotalSouthCot] = useState(0)
    const [totalSultanKudarat, setTotalSultanKudarat] = useState(0)
    const [totalBlankData, setTotalBlankData] = useState(0)

    //North Cotabato
    const [northCotSeqNo, setNorthCotSeqNo] = useState(0)
    const [northCotArea, setNorthCotArea] = useState(0)
    const [northCotFirstName, setNorthCotFirstName] = useState(0)
    const [northCotMiddleName, setNorthCotMiddleName] = useState(0)
    const [northCotLastName, setNorthCotLastName] = useState(0)
    const [northCotGender, setNorthCotGender] = useState(0)

    //Sarangani
    const [saranganiSeqNo, setSaranganiSeqNo] = useState(0)
    const [saranganiArea, setSaranganiArea] = useState(0)
    const [saranganiFirstName, setSaranganiFirstName] = useState(0)
    const [saranganiMiddleName, setSaranganiMiddleName] = useState(0)
    const [saranganiLastName, setSaranganiLastName] = useState(0)
    const [saranganiGender, setSaranganiGender] = useState(0)

    //South Cotabato
    const [southCotSeqNo, setSouthCotSeqNo] = useState(0)
    const [southCotArea, setSouthCotArea] = useState(0)
    const [southCotFirstName, setSouthCotFirstName] = useState(0)
    const [southCotMiddleName, setSouthCotMiddleName] = useState(0)
    const [southCotLastName, setSouthCotLastName] = useState(0)
    const [southCotGender, setSouthCotGender] = useState(0)

    //Sultan Kudarat
    const [sultanKudaratSeqNo, setSultanKudaratSeqNo] = useState(0)
    const [sultanKudaratArea, setSultanKudaratArea] = useState(0)
    const [sultanKudaratFirstName, setSultanKudaratFirstName] = useState(0)
    const [sultanKudaratMiddleName, setSultanKudaratMiddleName] = useState(0)
    const [sultanKudaratLastName, setSultanKudaratLastName] = useState(0)
    const [sultanKudaratGender, setSultanKudaratGender] = useState(0)

    useEffect(() => {
        //Define first
        const seqNum = 'Collective CLOA Sequence Number'
        const area = 'Actual area of tillage/cultivation (in square meters)'
        const fn = 'First Name'
        const mn = 'Middle Name'
        const ln = 'Last Name'
        const gender = 'Gender'

        //North Cotabato Calculate blank counts
        const northcotseqnum = props.northCotData.filter(obj => obj[seqNum] === '' || obj[seqNum] === null || obj[seqNum] === undefined).length;
        const northcotarea = props.northCotData.filter(obj => obj[area] === '' || obj[area] === null || obj[area] === undefined).length;
        const northcotfn = props.northCotData.filter(obj => obj[fn] === '' || obj[fn] === null || obj[fn] === undefined).length;
        const northcotmd = props.northCotData.filter(obj => obj[mn] === '' || obj[mn] === null || obj[mn] === undefined).length;
        const northcotln = props.northCotData.filter(obj => obj[ln] === '' || obj[ln] === null || obj[ln] === undefined).length;
        const northcotgender = props.northCotData.filter(obj => obj[gender] === '' || obj[gender] === null || obj[gender] === undefined).length;

        //Sarangani Calculate blank counts
        const saranganiseqnum = props.saranganiData.filter(obj => obj[seqNum] === '' || obj[seqNum] === null || obj[seqNum] === undefined).length;
        const saranganiarea = props.saranganiData.filter(obj => obj[area] === '' || obj[area] === null || obj[area] === undefined).length;
        const saranganifn = props.saranganiData.filter(obj => obj[fn] === '' || obj[fn] === null || obj[fn] === undefined).length;
        const saranganimd = props.saranganiData.filter(obj => obj[mn] === '' || obj[mn] === null || obj[mn] === undefined).length;
        const saranganiln = props.saranganiData.filter(obj => obj[ln] === '' || obj[ln] === null || obj[ln] === undefined).length;
        const saranganigender = props.saranganiData.filter(obj => obj[gender] === '' || obj[gender] === null || obj[gender] === undefined).length;
        
        //South Cotabato Calculate blank counts
        const southcotseqnum = props.southCotData.filter(obj => obj[seqNum] === '' || obj[seqNum] === null || obj[seqNum] === undefined).length;
        const southcotarea = props.southCotData.filter(obj => obj[area] === '' || obj[area] === null || obj[area] === undefined).length;
        const southcotfn = props.southCotData.filter(obj => obj[fn] === '' || obj[fn] === null || obj[fn] === undefined).length;
        const southcotmd = props.southCotData.filter(obj => obj[mn] === '' || obj[mn] === null || obj[mn] === undefined).length;
        const southcotln = props.southCotData.filter(obj => obj[ln] === '' || obj[ln] === null || obj[ln] === undefined).length;
        const southcotgender = props.southCotData.filter(obj => obj[gender] === '' || obj[gender] === null || obj[gender] === undefined).length;

        //Sultan Kudarat Calculate blank counts
        const sultankudaratseqnum = props.sultanKudaratData.filter(obj => obj[seqNum] === '' || obj[seqNum] === null || obj[seqNum] === undefined).length;
        const sultankudaratarea = props.sultanKudaratData.filter(obj => obj[area] === '' || obj[area] === null || obj[area] === undefined).length;
        const sultankudaratfn = props.sultanKudaratData.filter(obj => obj[fn] === '' || obj[fn] === null || obj[fn] === undefined).length;
        const sultankudaratmd = props.sultanKudaratData.filter(obj => obj[mn] === '' || obj[mn] === null || obj[mn] === undefined).length;
        const sultankudaratln = props.sultanKudaratData.filter(obj => obj[ln] === '' || obj[ln] === null || obj[ln] === undefined).length;
        const sultankudaratgender = props.sultanKudaratData.filter(obj => obj[gender] === '' || obj[gender] === null || obj[gender] === undefined).length;



        //Total of all blanks
        const northCotTotal = northcotseqnum + northcotarea + northcotfn + northcotmd + northcotln + northcotgender 
        const saranganiTotal = saranganiseqnum + saranganiarea + saranganifn + saranganimd + saranganiln + saranganigender 
        const southCotTotal = southcotseqnum + southcotarea + southcotfn + southcotmd + southcotln + southcotgender 
        const sultanKudaratTotal = sultankudaratseqnum + sultankudaratarea + sultankudaratfn + sultankudaratmd + sultankudaratln + sultankudaratgender 
        
        const overallTotal = northCotTotal+saranganiTotal+southCotTotal+sultanKudaratTotal

        setTotalNorthCot(northCotTotal)
        setTotalSarangani(saranganiTotal)
        setTotalSouthCot(southCotTotal)
        setTotalSultanKudarat(sultanKudaratTotal)
        setTotalBlankData(overallTotal)

        // North Cotabato Update state variables with counts
        setNorthCotSeqNo(northcotseqnum);
        setNorthCotArea(northcotarea)
        setNorthCotFirstName(northcotfn)
        setNorthCotMiddleName(northcotmd)
        setNorthCotLastName(northcotln)
        setNorthCotGender(northcotgender)

        // Sarangani Update state variables with counts
        setSaranganiSeqNo(saranganiseqnum);
        setSaranganiArea(saranganiarea)
        setSaranganiFirstName(saranganifn)
        setSaranganiMiddleName(saranganimd)
        setSaranganiLastName(saranganiln)
        setSaranganiGender(saranganigender)

        // South Cotabato Update state variables with counts
        setSouthCotSeqNo(southcotseqnum);
        setSouthCotArea(southcotarea)
        setSouthCotFirstName(southcotfn)
        setSouthCotMiddleName(southcotmd)
        setSouthCotLastName(southcotln)
        setSouthCotGender(southcotgender)

        // Sultan Kudarat Update state variables with counts
        setSultanKudaratSeqNo(sultankudaratseqnum);
        setSultanKudaratArea(sultankudaratarea)
        setSultanKudaratFirstName(sultankudaratfn)
        setSultanKudaratMiddleName(sultankudaratmd)
        setSultanKudaratLastName(sultankudaratln)
        setSultanKudaratGender(sultankudaratgender)

    }, [props.isOpen]);
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
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        <div className='flex align-middle justify-center gap-5'>
                                            <Image src='/images/SUIS-Logo.png' height={50} width={50} alt='SUIS-Logo' />
                                            <label className='mt-2'>Total Blank Datas: <i><b><u>{totalBlankData}</u></b></i></label>
                                            <Image src='/images/RPS-Logo.png' height={50} width={50} alt='RPS-Logo' />
                                        </div>
                                    </Dialog.Title>

                                    <table className="border border-collapse w-full">
                                        <thead>
                                            <tr className='border text-gray-700 bg-gray-200'>
                                                <th className='border p-2 w-[25%]'>Particulars</th>
                                                <th className='border p-2 w-[19%]'>North Cotabato</th>
                                                <th className='border p-2 w-[19%]'>Sarangani</th>
                                                <th className='border p-2 w-[19%]'>South Cotabato</th>
                                                <th className='border p-2 w-[19%]'>Sultan Kudarat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='border bg-white hover:bg-grey-primary '>
                                                <td className="border p-2">CCLOA Seq. Number</td>
                                                <td className="border p-2">{northCotSeqNo}</td>
                                                <td className="border p-2">{saranganiSeqNo}</td>
                                                <td className="border p-2">{southCotSeqNo}</td>
                                                <td className="border p-2">{sultanKudaratSeqNo}</td>
                                            </tr>
                                            <tr className='border bg-gray-50 hover:bg-grey-primary '>
                                                <td className="border p-2">Actual Area</td>
                                                <td className="border p-2">{northCotArea}</td>
                                                <td className="border p-2">{saranganiArea}</td>
                                                <td className="border p-2">{southCotArea}</td>
                                                <td className="border p-2">{sultanKudaratArea}</td>
                                            </tr>
                                            <tr className='border bg-white hover:bg-grey-primary '>
                                                <td className="border p-2">First Name</td>
                                                <td className="border p-2">{northCotFirstName}</td>
                                                <td className="border p-2">{saranganiFirstName}</td>
                                                <td className="border p-2">{southCotFirstName}</td>
                                                <td className="border p-2">{sultanKudaratFirstName}</td>
                                            </tr>
                                            <tr className='border bg-gray-50 hover:bg-grey-primary '>
                                                <td className="border p-2">Middle Name</td>
                                                <td className="border p-2">{northCotMiddleName}</td>
                                                <td className="border p-2">{saranganiMiddleName}</td>
                                                <td className="border p-2">{southCotMiddleName}</td>
                                                <td className="border p-2">{sultanKudaratMiddleName}</td>
                                            </tr>
                                            <tr className='border bg-white hover:bg-grey-primary '>
                                                <td className="border p-2">Last Name</td>
                                                <td className="border p-2">{northCotLastName}</td>
                                                <td className="border p-2">{saranganiLastName}</td>
                                                <td className="border p-2">{southCotLastName}</td>
                                                <td className="border p-2">{sultanKudaratLastName}</td>
                                            </tr>
                                            <tr className='border bg-gray-50 hover:bg-grey-primary '>
                                                <td className="border p-2">Gender</td>
                                                <td className="border p-2">{northCotGender}</td>
                                                <td className="border p-2">{saranganiGender}</td>
                                                <td className="border p-2">{southCotGender}</td>
                                                <td className="border p-2">{sultanKudaratGender}</td>
                                            </tr>
                                            <tr className='border border-t-gray-500 border-t-2 bg-gray-100 hover:bg-grey-primary '>
                                                <td className="border p-2 font-bold">TOTAL</td>
                                                <td className="border p-2">{totalNorthCot}</td>
                                                <td className="border p-2">{totalSarangani}</td>
                                                <td className="border p-2">{totalSouthCot}</td>
                                                <td className="border p-2">{totalSultanKudarat}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="mt-4">
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
