import React, { Component } from 'react';
import Joi from 'joi';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import './updateProject.css';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../loading/loading';

class UpdateProject extends Component {
    state = {
        data:{},
        id: '',
        errors: {},
        clicked: null
    };

    async componentDidMount() { 
        const { id } = this.props.params;
        console.log(id);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/projectById/${id}`);
            console.log(data);
            const dataToBeUpdated = { ...data };
            // dataToBeUpdated.title = data._id;
            // dataToBeUpdated.discription = data[0].discription;
            // dataToBeUpdated.githubLink = data[0].githubLink;
            // dataToBeUpdated.demoLink = data[0].demoLink;

            console.log("DataTobeUpdated", dataToBeUpdated);
            this.setState({ data: dataToBeUpdated, id: data.id }, () => {
                console.log("state",this.state.data);
            });
        } catch (err) {
            console.log(err);
        }
     }

    handleSubmit = async (event) => {
        event.preventDefault();

        const errors = this.validate();
        
        this.setState({ errors : errors || {} });
        console.log(errors);

        if (!errors) {
            this.setState({ clicked: 1})
            const formData = new FormData();
            
            Object.keys(this.state.data).forEach(key => {
                formData.append(key, this.state.data[key]);
            });
            try {
                const response = await axios.put(`${process.env.REACT_APP_API}/updateProject/${this.state.data._id}`, formData);
                toast.success("Updated successfully");
            } catch (err) {
                if(err.response && err.response.status === 500) {
                    toast.error("Update failed");
                }
            } finally {
                this.setState({ clicked: null });
            }
        }
    }
    
    handleChange = (event) => {
        const { value, name, files } = event.target;
        const data = { ...this.state.data }
        const errors = { ...this.state.errors };
        console.log(name)
        if (name === 'image_one' || name === 'image_two' || name === 'image_three' || name === 'image_four') {
            console.log(name)
            data[name] = files[0];
        }
        else
            data[name] = value;

        const errorMessage = this.validateOnChange(name, value, files)
        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];

        this.setState({ data, errors });

    };

    validate = () => {
        const schema = Joi.object({
            project_title: Joi.string().required().label('Title'),
            github_link: Joi.string().required().label('Github link'),
            demo_link: Joi.string().required().label('Demo link'),
            image_one: Joi.object().required().label('Image one'),
            image_two: Joi.object().required().label('Image Two'),
            image_three: Joi.object().required().label('Image Three'),
            image_four: Joi.object().required().label('Image Four'),
            discription: Joi.string().required().label('Discription'),
            _id: Joi.string(),
            __v: Joi.any()
        })

        const result = schema.validate(this.state.data, { abortEarly: false });

        if (!result.error) return null;

        const errors = {};

        for (let i of result.error.details) {
            errors[i.path[0]] = i.message;
        }

        return errors;
    };

    validateOnChange = (name, value, files) => {
        let obj;
        const schemas = {
            project_title: Joi.string().required().label('Title'),
            github_link: Joi.string().required().label('Github link'),
            demo_link: Joi.string().required().label('Demo link'),
            image_one: Joi.object().required().label('Image one'),
            image_two: Joi.object().required().label('Image Two'),
            image_three: Joi.object().required().label('Image Three'),
            image_four: Joi.object().required().label('Image Four'),
            discription: Joi.string().required().label('Discription'),
            _id: Joi.string(),
            __v: Joi.any()
        }

        const schema = Joi.object({
            [name]: schemas[name]
        });
        
        if (name === 'image_one' || name === 'image_two' || name === 'image_three' || name === 'image_four') {
             obj = {
                [name]: files[0]
            };
        }else 
        { obj = {
            [name]: value
        };
        }
        
        const result = schema.validate(obj);

        return result.error ? result.error.details[0].message : null;
    }

    render() { 
         console.log(`${process.env.REACT_APP_API}/api/upload`)
        const { project_title, github_link, demo_link, discription } = this.state.data;
        const { errors,clicked } = this.state;
        return (
            <section className="newProject">
                <ToastContainer />
                <form onSubmit={this.handleSubmit}>
                    <h2>Update project</h2>
                    <div className="title">
                        <label htmlFor="">Title</label>
                        <input className={errors.project_title ? "errorHappen" : ""} onChange={this.handleChange} type="text" name="project_title" value={project_title || ''} id="" />
                    </div>
                    <div className="githubDemoLinkCont">
                        <div className="githubLink">
                            <label htmlFor="">Github link</label>
                            <input className={errors.github_link ? "errorHappen" : ""} onChange={this.handleChange} type="text" name="github_link" value={github_link || ''} id="" />
                        </div>
                        <div className="demoLink">
                            <label htmlFor="">Demo link</label>
                            <input className={errors.demo_link ? "errorHappen" : ""} onChange={this.handleChange} type="text" name="demo_link" value={demo_link || ''} id="" />
                        </div>
                    </div>
                    <div className="imageOnetwoCont">
                        <div className="imageOne">
                            <label htmlFor="">Image one(main)</label>
                            <input className={errors.image_one ? "errorHappen" : ""} onChange={this.handleChange} type="file" name="image_one" id="" />
                        </div>
                        <div className="imageTwo">
                            <label htmlFor="">Image two</label>
                            <input className={errors.image_two ? "errorHappen" : ""} onChange={this.handleChange} type="file" name="image_two" id="" />
                        </div>
                    </div>
                    <div className="imageThreeFourCont">
                        <div className="imageThree">
                            <label htmlFor="">Image three</label>
                            <input className={errors.image_three ? "errorHappen" : ""} onChange={this.handleChange} type="file" name="image_three" id="" />
                        </div>
                        <div className="imageFour">
                            <label htmlFor="">Image four</label>
                            <input className={errors.image_four ? "errorHappen" : ""} onChange={this.handleChange} type="file" name="image_four" id="" />
                        </div>
                    </div>
                    <div className="discription">
                        <label htmlFor="">Discription</label>
                        <textarea className={errors.discription ? "errorHappen" : ""} onChange={this.handleChange} name="discription" value={discription || ''} id=""></textarea>
                    </div>
                    <button type="submit" className={clicked ? "disable" : ""}>Add</button>
                </form>
                {clicked ? <Loading /> :null}
            </section>
        );
    }
}
 
export default UpdateProject;