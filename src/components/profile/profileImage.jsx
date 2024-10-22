import React, { Component } from 'react';
import { jwtDecode } from 'jwt-decode';
import Joi from 'joi';
import { toast, ToastContainer } from 'react-toastify';
import './profile.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from '../loading/loading';

class ProfileImage extends Component {
    state = {
        data: {
            image: '',
            email: ''
        },
        errors: {},
        clicked: null
    };

    componentDidMount() { 
        const decode = jwtDecode(sessionStorage.getItem('token'));
        const data = { ...this.state.data };
        data.email = decode.email;

        this.setState({ data }, () => {
            console.log(this.state.data);
        });
    };

    handleOnChange = (event) => {
        const { name, value, files } = event.target;
        const data = { ...this.state.data };

        data[name] = files[0];
        this.setState({ data }, () => {
            console.log(this.state.data);
        });
    };

    validate = () => {
        const schema = Joi.object({
            image: Joi.object().required().label('Image'),
            email: Joi.string().email({ tlds: false }).required().label('Email'),
        });

        const result = schema.validate(this.state.data, { abortEarly: false });

        if (!result.error) return null;
        
        const errors = {};

        for (let i of result.error.details) {
            errors[i.path[0]] = i.message;
        }

        return errors;
    }
    handleSubmit = async (event) => {
        event.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });

        if (!errors) {
            this.setState({ clicked: 1 });
            const formData = new FormData();
            Object.keys(this.state.data).forEach(key => {
                formData.append(key, this.state.data[key]);
            });
            try {
                const response = await axios.put(`${process.env.REACT_APP_API}/changeProfilePicture`, formData); 
                const token = response.headers['x-reg-token'];
                sessionStorage.setItem('token', token);
                toast.success("Profile picture updated successfully");
                setTimeout(() => {
                    window.location = '/profile/profilePicture';
                }, 5000);
            } catch (err) {
                if (err.response && err.response.status === 500) {
                    toast.error("Update profile picture failed");
                }
            } finally {
                this.setState({ clicked: null });
            }
           }
    };
    
    render() { 
        const { errors, clicked } = this.state;
        return (
            <section className="profileImage">
                <ToastContainer />
                <form onSubmit={this.handleSubmit}>
                <h2>Change profile picture</h2>
                <div className="imageCont">
                    <label htmlFor="">Picture</label>
                    <input onChange={this.handleOnChange} type="file" name="image" id="" className={errors.image ? "errorHappened" : ""} />
                </div>
                    <button type="submit" className={clicked ? "disabled" : ""}>Change</button>
                    {clicked ? <Loading /> : null}
            </form>
        </section>
        );
    }
}
 
export default ProfileImage;