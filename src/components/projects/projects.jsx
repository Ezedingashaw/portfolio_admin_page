import React, {Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './projects.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from '../loading/loading';

const Projects = () => {

    const [projects, setProjects] = useState([]);
    const [loading, setloading ] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setloading(true);
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API}/projects`);
                setProjects(data);
            } catch (err) {
                console.log(err);
            } finally {
                setloading(false);
            }
        };

        fetch();
    }, []);

    const deleteProject = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API}/deleteProject/${id}`);
            toast.success("Project deleted successfully");
        } catch (err) {
            if (err.response && err.response.status === 500) {
                toast.error("Deleting failed");
           }
        }
    };
    return ( 
        <section className="projects">
            <ToastContainer />
            <Link to="/projects/addProject" className="new">New</Link>
            { loading ? (<Loading />) : (<div className="container">
                <p>ID</p>
                <p>Title</p>
                <p>View</p>
                <p>Update</p>
                <p>Delete</p>
                {projects.map(project => {
                    return (
                        <Fragment key={project._id}><div>{project.id}</div>
                        <div>{project.project_title}</div>
                        <div><Link to={`/projects/viewProject/${project._id}`}><i className="fa-solid fa-eye eye"></i></Link></div>
                        <div><Link to={`/projects/updateProject/${project._id}`}><i className="fa-solid fa-pen pen"></i></Link></div>
                        <div><Link onClick={() => deleteProject(project._id)} to=""><i className="fa-solid fa-trash trash"></i></Link></div></Fragment>
                    )
                })}
            </div>)}
        </section>
     );
}
 
export default Projects;