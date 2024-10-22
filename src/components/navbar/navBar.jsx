import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

const NavBar = () => {
    
    const [isClicked, setIsClicked] = useState(false);
    
    const toggleNavbar = () => {
        setIsClicked(!isClicked);
    };

    return ( 
        <nav  className={ isClicked ? "navBar show" : "navBar"}>
            <div onClick={toggleNavbar} className="iconCont">
            <i className="fa-solid fa-bars-staggered"></i>
            </div>
            <ul>
                <li><i className="fa-solid fa-house-chimney"></i> <Link to="">Dashboard</Link></li>
                <li>
                <i className="fa-solid fa-laptop-code"></i><Link to="/skills">Skills</Link>
                </li>
                <li>
                <i className="fa-solid fa-camera"></i><Link to="">Vlog</Link>
                </li>
                <li>
                <i className="fa-solid fa-diagram-project"></i><Link to="/projects">Projects</Link>
                </li>
                <li>
                <i className="fa-solid fa-user"></i><Link to="profile">Profile</Link>
                </li>
            </ul>
        </nav>
     );
}

export default NavBar;