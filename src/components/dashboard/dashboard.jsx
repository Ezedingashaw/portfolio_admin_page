import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {

    const [projects, setProjects] = useState(null);
    const [skills, setSkills] = useState(null);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/getProjectscount`);
            console.log(data);
            const count = parseInt(data);
            setProjects(count)
            try {
                const decode = jwtDecode(sessionStorage.getItem('token'));
                setUser(decode)
            }catch(err){}
        };

        const fetchTwo = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API}/getSkillscount`);
                const count = parseInt(data);
                setSkills(count)
            } catch (err) {
                console.log(err);
            }
        };

        fetch();
        fetchTwo();
    },[]);

    return ( 
        <section className="dashboard">
            <div className="welcomeSection">
                <h2>Welcome back, Ezedin Gashaw</h2>
                <img src={user.profile} alt="" />
            </div>
            <div className="links">
                <div className="projects">
                    <h3>Projects</h3>
                    <span>{projects || 0}</span>
                    <Link to="/projects">Manage projects</Link>
                </div>
                <div className="skills">
                    <h3>Skills</h3>
                    <span>{skills || 0}</span>
                    <Link to="/skills">Manage skills</Link>
                </div>
                <div className="vlogs">
                    <h3>Vlogs</h3>
                    <span>{skills || 0}</span>
                    <Link to="/skills">Manage skills</Link>
                </div>
            </div>
        </section>
     );
}
 
export default Dashboard;