import React, { Component } from 'react';
import Joi from 'joi';
import { toast, ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './profile.css';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../loading/loading';

class Password extends Component {
    state = {
        data: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        email: '',
        errors: {},
        clicked: null
    };

    componentDidMount() {
        const decode = jwtDecode(sessionStorage.getItem('token'));
        console.log("Decode", decode);
        const email = decode.email;
        
        this.setState({ email });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const errors = this.validate();
        console.log(errors);
        this.setState({ errors: errors || {} });

        if (!errors) {
            this.setState({ clicked: 1})
            const data = {
                email: this.state.email,
                newPassword: this.state.data.newPassword,
                oldPassword: this.state.data.oldPassword
            };

            try {
                const response = await axios.put(`${process.env.REACT_APP_API}/changePassword`, data);
                toast.success("Password changed successfully");
            } catch (err) {
                toast.error("Change password failed");
            } finally {
                this.setState({ clicked: null });
            }
        };
    }

        handleOnChange = (event) => {
            const { name, value } = event.target;
            const data = { ...this.state.data };
            const errors = { ...this.state.errors };
            data[name] = value;
            const errorMessage = this.validateOnChange(name, value);
            if (errorMessage) errors[name] = errorMessage;
            else delete errors[name];

            this.setState({ data, errors });
        };

        validate = () => {
            const schema = Joi.object({
                oldPassword: Joi.string().min(8).max(20).required().label('Old password'),
                newPassword: Joi.string().min(8).max(20).required().label('New password'),
                confirmPassword: Joi.string().custom((value, helper) => {
                    if (value !== this.state.data.newPassword) return helper.message("Password not match")
                
                    return value;
                }).required().label("Confirm password")
            });

            const result = schema.validate(this.state.data, { abortEarly: false });

            if (!result.error) return null;

            const errors = {};

            for (let i of result.error.details) {
                errors[i.path[0]] = i.message;
            }

            return errors;
        };

        validateOnChange = (name, value) => {
            const schemas = {
                oldPassword: Joi.string().min(8).max(20).required().label('Old password'),
                newPassword: Joi.string().min(8).max(20).required().label('New password'),
                confirmPassword: Joi.string().custom((value, helper) => {
                    if (value !== this.state.data.newPassword) return helper.message("Password not match")
                
                    return value;
                }).required().label("Confirm password")
            };

            const schema = Joi.object({
                [name]: schemas[name]
            });

            const obj = {
                [name]: value
            };

            const result = schema.validate(obj);

            return result.error ? result.error.details[0].message : null;
        };

        render() {
            const { oldPassword, newPassword, confirmPassword } = this.state.data;
            const { errors, clicked } = this.state;
            return (
                <section className="passwordChange">
                    <ToastContainer />
                    <form onSubmit={this.handleSubmit}>
                        <h2>Change password</h2>
                        <div className="oldPassword">
                            <label htmlFor="">Old password</label>
                            <input type="password" name="oldPassword" onChange={this.handleOnChange} value={oldPassword} id="" className={errors.oldPassword ? "errorHappened" : ""} />
                        </div>
                        <div className="newPassword">
                            <label htmlFor="">New password</label>
                            <input type="password" name="newPassword" onChange={this.handleOnChange} value={newPassword} id="" className={errors.newPassword ? "errorHappened" : ""} />
                        </div>
                        <div className="confirmPassword">
                            <label htmlFor="">Confirm password</label>
                            <input type="password" name="confirmPassword" onChange={this.handleOnChange} value={confirmPassword} id="" className={errors.confirmPassword ? "errorHappened" : ""} />
                        </div>
                        <button type="submit" className={clicked ? "disabled" : ""}>Save</button>
                    </form>
                    {clicked ? <Loading /> : null}
                </section>
            );
        }
    }
 
export default Password;