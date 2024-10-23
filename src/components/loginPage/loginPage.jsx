import React, { Component } from 'react';
import Joi from 'joi';
import axios from 'axios';
import './loginPage.css';
import Loading from '../loading/loading';

class LoginPage extends Component {
    state = {
        data: {
            userName: '',
            password: ''
        },
        isLoading: false,
        errors: {}
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const errors = this.validate();
        
        this.setState({ errors: errors || {} });

        if (!errors) {
            this.setState({ isLoading: true });
            const formData = new FormData();
            Object.keys(this.state.data).forEach(key => {
                formData.append(key, this.state.data[key]);
            });

            try {
                const response = await axios.post(`${process.env.REACT_APP_API}/login`, formData);
                const token = response.headers['x-reg-token']
                sessionStorage.setItem('token', token);
                window.location = '/';
            } catch (err) {
                console.log(err);
            } finally {
                this.setState({ isLoading: false });
            }
        }
    };

    validate = () => {
        const schema = Joi.object({
            userName: Joi.string().email({ tlds: false }).required().label('UserName'),
            password: Joi.string().min(8).max(20).required().label('Password')
        });

        const result = schema.validate(this.state.data, { abortEarly: false });
        
        if (!result.error) return null;

        const errors = {};

        for (let i of result.error.details) {
            errors[i.path[0]] = i.message;
        };

        return errors;
    };

    validateOnChange = (name, value) => {
        const schemas = {
            userName: Joi.string().email({ tlds: false }).required().label('UserName'),
            password: Joi.string().min(8).max(20).required().label('Password')
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

    handleChange = (event) => {
        const { name, value } = event.target;
        const data = { ...this.state.data };
        const errors = { ...this.state.errors };
        data[name] = value;
        const errorMessage = this.validateOnChange(name, value);
        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];

        this.setState({data, errors});
    };

    render() {
        const { userName, password } = this.state.data;
        const { errors, isLoading } = this.state;
        return ( 
            <section className="loginPage">
                <form onSubmit={this.handleSubmit}>
                    <h2>Login </h2>
                    <div className={errors.userName ? "errorHappens userName" : "userName"}>
                        <input onChange={this.handleChange} type="text" name="userName" value={userName} id="" placeholder="Username" /><i className="fa-solid fa-user"></i>
                    </div>
                    <div className={errors.password ? "errorHappens password" : "password"} >
                        <input onChange={this.handleChange} type="password" name="password" value={password} id="" placeholder="Password" /><i className="fa-solid fa-lock"></i>
                    </div>
                    <div className="forgot">
                        <a href="">Forgot password?</a>
                    </div>
                    <button type="submit">Login</button>
                    {isLoading ? (<Loading />) : null}
                </form>
            </section>
         );
    }
}
 
export default LoginPage;