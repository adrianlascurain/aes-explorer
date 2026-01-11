import type { NavBarItem } from '../types/NavBarItem';
import './NavBar.css';
import burguerMenuIcon from '../assets/menu-burguer.svg';
import closeIcon from '../assets/close.svg';
import { useState } from 'react';

function NavBar({items} : {items: NavBarItem[]}){
     
    const [toggleMenu, setToggleMenu] = useState<boolean>(false);

    const handleClickOnBurguerMenu = () => {
        setToggleMenu(!toggleMenu)
        console.log(toggleMenu);
        
    };

    return (
        <nav className="navigation-bar">
            <ul className={toggleMenu? "mobile-items-list" : "desktop-items-list"}>
                {
                    items.map((item,index) => {
                        return(
                            <li key={`${item}-${index}`}>
                                <a href={item.link}>{item.label}</a>
                            </li>
                        )
                    })
                }
            </ul>
            <figure className="nav-logo-figure" onClick={handleClickOnBurguerMenu}>
                <img src={toggleMenu? closeIcon : burguerMenuIcon} alt="" />
            </figure>
        </nav>
    )
}

export default NavBar;