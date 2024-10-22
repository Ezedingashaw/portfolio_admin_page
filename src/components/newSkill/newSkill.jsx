import React, { Component } from 'react';
import Joi from 'joi';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './newSkill.css';
import Loading from '../loading/loading';

class NewSkill extends Component {
    state = {
        data: {
            name: '',
            image: '',
            stack: ''
        },
        errors: {},
        clicked: null
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        console.log("data",this.state.data);

        if (!errors) {
            this.setState({ clicked: 1})
            const formData = new FormData();

            Object.keys(this.state.data).forEach(key => {
                formData.append(key, this.state.data[key]);
            });

            try {
                const response = await axios.post(`${process.env.REACT_APP_API}/api/uploadNewSkill`, formData);
                toast.success("Skill created successfully");
            } catch (err) {
                if (err.response && err.response.status === 500) {
                    toast.error("Error creating skill");
                }
            } finally {
                this.setState({ clicked: null });
            }
        }
    };

    validate = () => {
        const schema = Joi.object({
            name: Joi.string().required().label('Name'),
            image: Joi.object().required().label('Image'),
            stack: Joi.string().required().label('Stack')
        });
        const result = schema.validate(this.state.data, { abortEarly: false });
        
        if (!result.error) return null;

        const errors = {};

        for (let i of result.error.details) {
            errors[i.path[0]] = i.message;
        };

        return errors;
    };

    
    validateOnChange = (name, value, files) => { 
        let obj;
        const schemas = {
            name: Joi.string().required().label('Name'),
            image: Joi.object().required().label('Image'),
            stack: Joi.string().required().label('Stack')
        };

        const schema = Joi.object({
            [name]: schemas[name]
        });

        if (name === 'image') {
            obj = {
                [name]: files[0]
            }
        } else {
            obj = {
                [name]: value
            }
        }

        const result = schema.validate(obj);

        return result.error ? result.error.details[0].message : null;
    };


    handleOnChange = (event) => {
        const { name, value, files } = event.target;
        const data = { ...this.state.data };
        const errors = { ...this.state.errors };
        if (name === "image")
            data[name] = files[0];
        else
            data[name] = value;

        const errorMessage = this.validateOnChange(name, value, files);
        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];
        
        this.setState({ data, errors})
    };

    render() { 
        const { name, stack } = this.state.data;
        const { errors,clicked } = this.state;
        return (
            <section className="newSkill">
                <ToastContainer />
                <form onSubmit={this.handleSubmit}>
                    <h2>Add new skill</h2>
                    <div className="nameCont">
                        <label htmlFor="">Technology name</label>
                        <input onChange={this.handleOnChange} type="text" name="name" value={name} id="" className={ errors.name ? "errorHappen" : ""} />
                    </div>
                    <div className="stack">
                        <label htmlFor="">Technology stack</label>
                        <select onChange={this.handleOnChange} value={stack} name="stack" id="" className={ errors.stack ? "errorHappen" : ""}>
                            <option value="">Select stack</option>
                            <option value="Front">Front-end</option>
                            <option value="Back">Back-end</option>
                        </select>
                    </div>
                    <div className="imagecont">
                        <label htmlFor="">Technology image</label>
                        <input onChange={this.handleOnChange} type="file" name="image" id="" className={ errors.image ? "errorHappen" : ""} />
                    </div>
                    <button type="submit" className={clicked ? "disabled" : ""}>ADD</button>
                </form>
                {clicked ? <Loading /> :null}
            </section>
        );
    }
}
 
export default NewSkill;