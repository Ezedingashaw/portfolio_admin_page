import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css';

const Profile = () => {
    return ( 
        <section className="Profile">
            <h2>Hello, Ezedin you can manage your personal info.</h2>
            <div className="info">
                <ul>
                    <li><Link to="/profile/profilePicture">Profile image</Link></li>
                    <li><Link to="">Emial </Link></li>
                    <li><Link to="/profile/changePassword">Password</Link></li>
                </ul>
            </div>
        </section>
     );
}
 
export default Profile;