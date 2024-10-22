import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import './skill.css';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../loading/loading';

const Skills = () => {

    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        
        const fetch = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API}/skills`);
                setSkills(data);
            }catch (err) {
                console.log(err);
            }finally{
                setLoading(false);
            }
        };

        fetch()
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API}/deleteSkill/${id}`);
            toast.success("Deleted successfully");
        } catch (err) {
            if (err.response && err.response.status === 500) {
                toast.error("Skill deletion failed");
            }
        }
    };

    return ( 
        <section className="skills">
            <ToastContainer />
            <Link to="/skills/newSkill" className="new">New</Link>
            { loading ? (<Loading />) : (<div className="container">
                <p>ID</p>
                <p>Image</p>
                <p>Name</p>
                <p>Technology stack</p>
                <p>Update</p>
                <p>Delete</p>
                {skills.map(skill => {
                    return (
                        <Fragment key={skill.id}>
                            <div>{skill.id}</div>
                            <div><img src={skill.image} alt="" /></div>
                            <div>{skill.name}</div>
                            <div>{ skill.stack }</div>
                            <div><Link to={`/skills/updateSkill/${skill._id}`}><i className="fa-solid fa-pen pen"></i></Link></div>
                            <div><Link to="" onClick={() => handleDelete(skill._id)}><i className="fa-solid fa-trash trash"></i></Link></div>
                        </Fragment>
                    )
                })}
            </div>)}
        </section>
     );
}
 
export default Skills;