import React, { useEffect, useState } from 'react';
import './adminBar.css';
import adminImage from './photo_2024-09-04_15-39-22.jpg';
import { jwtDecode } from 'jwt-decode';

const AdminBar = () => {

    const [user, setUser] = useState({});

    useEffect(() => {
        const user = jwtDecode(sessionStorage.getItem('token'));
        if(!user) setUser({});
        setUser(user);
    },[])
    return ( 
        <nav className="adminBar">
            <ul>
                <li><span>Admin</span></li>
                <li><img src={adminImage} alt="" /></li>
            </ul>
        </nav>
     );
}
 
export default AdminBar;
