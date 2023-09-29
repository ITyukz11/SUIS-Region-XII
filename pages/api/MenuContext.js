// MenuContext.js
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

const MenuContext = createContext();

export function MenuProvider({ children }) {
    //MainMenus
    const [dashboardActive, setDashboardActive] = useState(false);
    const [prActive, setPrActive] = useState(false);
    const [ccisActive, setCcisActive] = useState(false);
    const [essisActive, setEssisactive] = useState(false);

    //SubMenus
    const [prActiveSubMenu, setPrActiveSubMenu] = useState(false);
    const [ccisActiveSubMenu, setCcisActiveSubMenu] = useState(false);
    const [essisActiveSubMenu, setEssisActiveSubMenu] = useState(false);

    //SubMenus Active
    const [essThreeA, setEssThreeA] = useState(false);
    const [essThreeB, setEssThreeB] = useState(false);

    //Track the state of the Disclosure
    const [disclosureOpen, setDisclosureOpen] = useState(false);

    

    const router = useRouter(); // Access the router object

    // Use useEffect to update menuActive state when the route changes
    useEffect(() => {
        const pathname = router.pathname;
        switch (pathname) {
            case "/dashboard":
                setDashboardActive(true);
                setPrActive(false);
                setCcisActive(false);
                console.log("pathname: ",pathname)

                break;
            case "/provincial-report":
                setDashboardActive(false);
                setPrActive(true);
                setCcisActive(false);
                console.log("pathname: ",pathname)

                break;
            case "/ccis":
                setCcisActive(true);
                setDashboardActive(false);
                setPrActive(false);
                console.log("pathname: ",pathname)
                break;
            default:
                break;
        }
    }, [router.pathname]);

    const menuActive = (menu) => {
        switch (menu) {
            case 1:
                setDashboardActive(true);
                setPrActive(false);
                setCcisActive(false);
                setEssisactive(false);

                //SubMenu Actives
                setEssThreeA(false);
                setEssThreeB(false);
                console.log(menu)
                break;
            case 2:
                setDashboardActive(false);
                setPrActive(true);
                setCcisActive(false);
                setEssisactive(false);

                //SubMenu Actives
                setEssThreeA(false);
                setEssThreeB(false);
                console.log(menu)
                break;
            case 3:
                setDashboardActive(false);
                setPrActive(false);
                setCcisActive(true);
                setEssisactive(false);

                //SubMenu Actives
                setEssThreeA(false);
                setEssThreeB(false);
                console.log(menu)
                break;
            case 4:
                setDashboardActive(false);
                setPrActive(false);
                setCcisActive(false);
                setEssisactive(true);
                console.log(menu)
                break;    
            default:
                break;
        }
    };
    const subMenuActive =(submenu) => {
        switch (submenu) {
            case 11:
                setEssThreeA(true);
                setEssThreeB(false);
                console.log(submenu)
                break;
            case 12:
                setEssThreeA(false);
                setEssThreeB(true);
                console.log(submenu)
                break;
            default:
                break;
        }
    }
    const prSubmenu = () =>{
        setPrActiveSubMenu(!prActiveSubMenu);
    }
    const ccisSubmenu = () =>{
        setCcisActiveSubMenu(!ccisActiveSubMenu);
        console.log(ccisActiveSubMenu)
    }
    const essisSubmenu = () =>{
        setEssisActiveSubMenu(!essisActiveSubMenu);
        console.log(essisActiveSubMenu)
    }
    const toggleDisclosure = () => {
        setDisclosureOpen(!disclosureOpen);
        console.log(disclosureOpen)
    };

    return (
        <MenuContext.Provider
            value={{
                dashboardActive,
                prActive,
                ccisActive,
                essisActive,

                prActiveSubMenu,
                ccisActiveSubMenu,
                essisActiveSubMenu,

                essThreeA,
                essThreeB,

                disclosureOpen,
                prSubmenu,
                ccisSubmenu,
                essisSubmenu,
                menuActive,
                toggleDisclosure,
                subMenuActive,

            }}
        >
            {children}
        </MenuContext.Provider>
    );
}

export function useMenu() {
    return useContext(MenuContext);
}
