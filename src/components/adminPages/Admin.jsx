import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './Admin.css';
import NavBar from '../navbar/navBar';
import Dashboard from '../dashboard/dashboard';
import Projects from '../projects/projects';
import NewProject from '../newProject/newProject';
import Profile from '../profile/profile';
import ProfileImage from '../profile/profileImage';
import UpdateWrapper from '../common/wrapper/updateWrapper';
import ViewProject from '../viewProject/viewProject';
import Skills from '../skill/skill';
import NewSkill from '../newSkill/newSkill';
import UpdateSkillWrapper from '../common/wrapper/updateSkillWrapper';
import Password from '../profile/password';

const Admin = () => {
    return ( 
        <section className="admin">
            <NavBar />
            <div className="routesContainer">
                <Routes>
                    <Route path="https://myportfolioadminpage.onrender.com/" element={<Dashboard /> } />
                    <Route path="/projects" element={<Projects /> } />
                    <Route path="/projects/addProject" element={<NewProject /> } />
                    <Route path="/profile" element={<Profile /> } />
                    <Route path="/profile/profilePicture" element={<ProfileImage /> } />
                    <Route path="/profile/changePassword" element={<Password /> } />
                    <Route path="/projects/updateProject/:id" element={<UpdateWrapper /> } />
                    <Route path="/projects/viewProject/:id" element={<ViewProject /> } />
                    <Route path="/skills" element={<Skills /> } />
                    <Route path="/skills/newSkill" element={<NewSkill /> } />
                    <Route path="/skills/updateSkill/:id" element={<UpdateSkillWrapper /> } />
                </Routes>
            </div>
        </section>
     );
}
 
export default Admin;