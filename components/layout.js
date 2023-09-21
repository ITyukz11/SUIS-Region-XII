import React, { createContext, useState } from "react";
import { BsArrowLeftShort, BsX } from "react-icons/bs";
import { Disclosure, Transition } from "@headlessui/react";

import {
    MdOutlineSpaceDashboard,
    MdOutlineSettings,
    MdOutlineLogout,
    MdAssessment,
    MdHelp,
    MdChevronRight,
    MdAppRegistration,
    MdLandscape,
    MdDraw,
    MdExplicit,
    MdFileCopy,
    MdPeopleAlt,
    MdUploadFile,
    MdMenu,
    MdBrowserUpdated,

} from "react-icons/md";
import Link from "next/link";
import { useMenu } from "../pages/api/MenuContext";
import HelpModal from "./modal/helpmodal";
import Suis from "./modal/suismodal";


export default function Layout({ children }) {
    const { dashboardActive, prActive, ccisActive, essisActive, prActiveSubMenu, ccisActiveSubMenu, essisActiveSubMenu, prSubmenu, ccisSubmenu, essisSubmenu, menuActive } = useMenu();
    const [helpIsOpen, setHelpIsOpen] = useState(false);
    const [suisIsOpen, setSuisIsOpen] = useState(false);
    const [disclosureOpen, setDisclosureOpen] = useState(true); // Track the state of the Disclosure

    const toggleDisclosure = () => {
        setDisclosureOpen(!disclosureOpen);
        console.log(disclosureOpen)
    };

    return (
        <div className="min-h-screen flex flex-col">
           
            {disclosureOpen? <div className="h-screen w-screen bg-gray-600 bg-opacity-50 z-auto absolute"></div>:''}
            
        
            <header className="bg-navy-primary text-grey-primary sticky top-0 h-14 flex justify-center items-center font-bold uppercase">
            <MdMenu className="text-5xl p-2 mr-0 absolute bg-transparent text-grey-primary rounded-full left-1 top-1 cursor-pointer border-grey-primary border-solid hover:border-2 " onClick={toggleDisclosure}/> SPLIT Unified Info System
               
            </header>

            <div className="flex flex-col md:flex-row flex-1">
            <Disclosure>
                    <div style={{ width: disclosureOpen ? '' : '0' }} className={`w-1/2 h-screen bg-navy-primary z-20 fixed top-0 lg:left-0 lg:w-60 peer-focus:left-0 peer:transition ease-out delay-150 duration-200 overflow-hidden ${disclosureOpen?'p-6':'p-0'}`}>
                            
                      
                                <BsX className="bg-transparent text-grey-primary text-5xl rounded-full absolute right-1 top-4 cursor-pointer border-grey-primary border-solid hover:border-2 " onClick={toggleDisclosure} />:
                               
                   

                        <div className="flex flex-col justify-start item-center">
                           
                                <h1 className="flex text-base cursor-pointer font-bold text-grey-primary border-b border-gray-100 pb-4" onClick={()=> setSuisIsOpen(true)}>
                                <MdBrowserUpdated className="text-2xl text-grey-primary ml-12" />SUIS v0.01                             
                                </h1>
                        


                                <div className=" my-4 border-b border-gray-100 pb-4">
                                    {/**DASHBOARD */}
                                    <Link href="/dashboard">
                                        <div className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto duration-200 ${dashboardActive ? 'bg-gray-900 p-2 rounded-md group cursor-pointer shadow-lg m-auto' : 'bg-white'}`}
                                            onClick={() => menuActive(1)}>
                                            <MdOutlineSpaceDashboard className={`text-2xl text-gray-600 group-hover:text-white ${dashboardActive ? 'text-white' : 'text-black'}`} />
                                            <h3 className={`text-base text-navy-primary group-hover:text-white font-semibold ${dashboardActive ? 'text-white font-semibold' : 'text-black'}`}>
                                                Dashboard
                                            </h3>
                                        </div>
                                    </Link>
                                    {/**PROVINCIAL REPORT */}
                                    <div className={`flex justify-between mb-2 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto duration-200 ${prActive && prActiveSubMenu ? 'bg-gray-900 p-2 rounded-md group cursor-pointer shadow-lg m-auto' : ''}`}
                                        onClick={() => { menuActive(2); prSubmenu() }}>
                                        <MdAssessment className={`right-0 text-2xl text-gray-600 group-hover:text-white ${prActive && prActiveSubMenu ? 'text-white' : 'text-grey-primary'}`} />
                                        <h3 className={`text-base text-grey-primary group-hover:text-white font-semibold ${prActive && prActiveSubMenu ? 'text-white font-semibold' : 'text-grey-primary'}`}>
                                            <span className="pl-4">PR</span>
                                        </h3>
                                        <MdChevronRight
                                            className={`ml-auto font-extrabold text-2xl text-grey-primary group-hover:text-white ${prActiveSubMenu
                                                ? 'transform rotate-90 transition-transform duration-200 delay-100'
                                                : 'text-gray-900 transform rotate-0 transition-transform duration-200 delay-100'
                                                } ${prActive ? 'text-white' : 'text-grey-primary'}`} />

                                    </div>

                                    {/* Conditionally render the submenu with the transition effect */}

                                    <Transition
                                        show={prActiveSubMenu}
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    >
                                        <Disclosure.Panel>
                                            <ul id="pr-submenu">
                                                <li className="flex mb-2 justify-start items-center gap-2 pl-10 hover:bg-slate-500 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto duration-300 hover:translate-x-3">
                                                    <MdLandscape className=" text-grey-primary group-hover:text-white font-semibold" />
                                                    <h5 className="text-sm text-grey-primary group-hover:text-white font-semibold">Field Validation</h5>
                                                </li>
                                                <li className="flex mb-2 justify-start items-center gap-2 pl-10 hover:bg-slate-500  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto duration-300 hover:translate-x-3">
                                                    <MdDraw className=" text-grey-primary group-hover:text-white font-semibold" />
                                                    <h5 className="text-sm text-grey-primary group-hover:text-white font-semibold ">Survey</h5>
                                                </li>
                                                <li className="flex mb-2 justify-start items-center gap-2 pl-10 hover:bg-slate-500  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto duration-300 hover:translate-x-3">
                                                    <MdAppRegistration className=" text-grey-primary group-hover:text-white font-semibold" />
                                                    <h5 className="text-sm text-grey-primary group-hover:text-white font-semibold ">Registration</h5>
                                                </li>
                                                <li className="flex mb-2 justify-start items-center gap-2 pl-10 hover:bg-slate-500  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto duration-300 hover:translate-x-3">
                                                    <MdExplicit className=" text-grey-primary group-hover:text-white font-semibold" />
                                                    <h5 className="text-sm text-grey-primary group-hover:text-white font-semibold ">E-Title</h5>
                                                </li>
                                            </ul>
                                        </Disclosure.Panel>
                                    </Transition>

                                    {/**CCIS */}

                                    <div className={`flex justify-between mb-2 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto duration-200 ${ccisActive && ccisActiveSubMenu ? 'bg-gray-900 p-2 rounded-md group cursor-pointer shadow-lg m-auto' : ''}`}
                                        onClick={() => { menuActive(3); ccisSubmenu() }}>
                                        <MdAssessment className={`right-0 text-2xl text-gray-600 group-hover:text-white ${ccisActive && ccisActiveSubMenu ? 'text-white' : 'text-grey-primary'}`} />
                                        <h3 className={`text-base text-grey-primary group-hover:text-white font-semibold ${ccisActive && ccisActiveSubMenu ? 'text-white font-semibold' : 'text-grey-primary'}`}>
                                            <span className="pl-4">CCIS</span>
                                        </h3>
                                        <MdChevronRight
                                            className={`ml-auto font-extrabold text-2xl text-grey-primary group-hover:text-white ${ccisActiveSubMenu
                                                ? 'transform rotate-90 transition-transform duration-200 delay-100'
                                                : 'text-gray-900 transform rotate-0 transition-transform duration-200 delay-100'
                                                } ${ccisActive ? 'text-white' : 'text-grey-primary'}`} />


                                    </div>

                                    {/* Conditionally render the submenu with the transition effect */}



                                    <Transition
                                        show={ccisActiveSubMenu}
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    >
                                        <Disclosure.Panel>
                                            <ul id="ccis-submenu">
                                                <li className="flex mb-2 justify-start items-center gap-2 pl-10 hover:bg-slate-500 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto duration-300 hover:translate-x-3">
                                                    <MdLandscape className=" text-grey-primary group-hover:text-white font-semibold" />
                                                    <h5 className="text-sm text-grey-primary group-hover:text-white font-semibold">Field Validation</h5>
                                                </li>
                                                <li className="flex mb-2 justify-start items-center gap-2 pl-10 hover:bg-slate-500  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto duration-300 hover:translate-x-3">
                                                    <MdDraw className=" text-grey-primary group-hover:text-white font-semibold" />
                                                    <h5 className="text-sm text-grey-primary group-hover:text-white font-semibold ">Survey</h5>
                                                </li>
                                                <li className="flex mb-2 justify-start items-center gap-2 pl-10 hover:bg-slate-500  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto duration-300 hover:translate-x-3">
                                                    <MdAppRegistration className=" text-grey-primary group-hover:text-white font-semibold" />
                                                    <h5 className="text-sm text-grey-primary group-hover:text-white font-semibold ">Registration</h5>
                                                </li>
                                                <li className="flex mb-2 justify-start items-center gap-2 pl-10 hover:bg-slate-500  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto duration-300 hover:translate-x-3">
                                                    <MdExplicit className=" text-grey-primary group-hover:text-white font-semibold" />
                                                    <h5 className="text-sm text-grey-primary group-hover:text-white font-semibold ">E-Title</h5>
                                                </li>
                                                <li className="flex mb-2 justify-start items-center gap-2 pl-10 hover:bg-slate-500  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto duration-300 hover:translate-x-3">
                                                    <MdFileCopy className=" text-grey-primary group-hover:text-white font-semibold" />
                                                    <h5 className="text-sm text-grey-primary group-hover:text-white font-semibold ">CTCT</h5>
                                                </li>
                                                <li className="flex mb-2 justify-start items-center gap-2 pl-10 hover:bg-slate-500  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto duration-300 hover:translate-x-3">
                                                    <MdPeopleAlt className=" text-grey-primary group-hover:text-white font-semibold" />
                                                    <h5 className="text-sm text-grey-primary group-hover:text-white font-semibold ">Annotated ARB's</h5>
                                                </li>
                                            </ul>
                                        </Disclosure.Panel>
                                    </Transition>







                                    {/**ESS */}
                                    <div className={`flex justify-between mb-2 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto duration-200 ${essisActive && essisActiveSubMenu ? 'bg-gray-900 p-2 rounded-md group cursor-pointer shadow-lg m-auto' : ''}`}
                                        onClick={() => { menuActive(4); essisSubmenu() }}>
                                        <MdAssessment className={`right-0 text-2xl text-gray-600 group-hover:text-white ${essisActive && essisActiveSubMenu ? 'text-white' : 'text-grey-primary'}`} />
                                        <h3 className={`text-base text-grey-primary group-hover:text-white font-semibold ${essisActive && essisActiveSubMenu ? 'text-white font-semibold' : 'text-grey-primary'}`}>
                                            <span className="pl-4">ESS</span>
                                        </h3>
                                        <MdChevronRight
                                            className={`ml-auto font-extrabold text-2xl text-grey-primary group-hover:text-white ${essisActiveSubMenu
                                                ? 'transform rotate-90 transition-transform duration-200 delay-100'
                                                : 'text-gray-900 transform rotate-0 transition-transform duration-200 delay-100'
                                                } ${essisActive ? 'text-white' : 'text-grey-primary'}`} />


                                    </div>
                                    <Transition
                                        show={essisActiveSubMenu}
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    >
                                        <Disclosure.Panel>
                                            <ul id="ccis-submenu">
                                                <li className="flex mb-2 justify-start items-center gap-2 pl-10 hover:bg-slate-500 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto duration-300 hover:translate-x-3">
                                                    <MdUploadFile className=" text-grey-primary group-hover:text-white font-semibold" />
                                                    <h5 className="text-sm text-grey-primary group-hover:text-white font-semibold">3A</h5>
                                                </li>
                                                <li className="flex mb-2 justify-start items-center gap-2 pl-10 hover:bg-slate-500  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto duration-300 hover:translate-x-3">
                                                    <MdUploadFile className=" text-grey-primary group-hover:text-white font-semibold" />
                                                    <h5 className="text-sm text-grey-primary group-hover:text-white font-semibold ">3B</h5>
                                                </li>
                                            </ul>

                                        </Disclosure.Panel>
                                    </Transition>

                                </div>
                                {/* setting  */}
                                <div className=" my-4 border-b border-gray-100 pb-4">
                                    <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                        <MdOutlineSettings className="text-2xl text-grey-primary group-hover:text-white " />
                                        <h3 className="text-base text-grey-primary group-hover:text-white font-semibold ">
                                            Settings
                                        </h3>
                                    </div>
                                    <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                                        onClick={() => setHelpIsOpen(true)}>
                                        <MdHelp className="text-2xl text-grey-primary group-hover:text-white " />
                                        <h3 className="text-base text-grey-primary group-hover:text-white font-semibold ">
                                            Help
                                        </h3>
                                    </div>
                                </div>
                                {/* logout */}
                                <div className=" my-4">
                                    <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                        <MdOutlineLogout className="text-2xl text-grey-primary group-hover:text-white " />
                                        <h3 className="text-base text-grey-primary group-hover:text-white font-semibold ">
                                            Logout
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Disclosure>
                <main className="flex-1">{children}</main>
                <HelpModal isOpen={helpIsOpen} closeHelp={() => setHelpIsOpen(!helpIsOpen)} />
                <Suis isOpen={suisIsOpen} closeHelp={() => setSuisIsOpen(!suisIsOpen)}/>
            </div>
        </div>
    );
}