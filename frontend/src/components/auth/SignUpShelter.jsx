import React, {useState} from 'react';
import {useForm} from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import '../../styles/signup.scoped.css'
import '../../styles/user.scoped.css'
import {authAPIService} from "../../services/authAPIService.js";
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

const signUpShelterSchema = yup.object({
    name: yup.string().required("Shelter name is required"),
    username: yup.string().required("Username is required"),
    location: yup.string().required("Location is required"),
    email: yup.string().required("Email is required"),
    password1: yup.string().required("Password is required"),
    password2: yup.string().required("Need to confirm your password")
})

function SignUpShelter() {
    const signUpAPI = authAPIService();
    let navigate = useNavigate();
    const [validationError, setValidationError] = useState("")

    const onSignUpShelter = (event) => {
        console.log(event);
        const userObject = {
            type: "petshelter",
            user: {
                name: event.name,
                mission: "Your mission statement goes here",
                about_us: "Your organization background goes here",
                location: event.location
            }
        }
        signUpAPI.register(event.email, event.password1, event.username, userObject).then(res => {
            console.log(res)
            if (res.success) {
                navigate("login/")
            } else {
                setValidationError(res.message)
            }
        }).catch(e => {
            console.error(e)
        })
    };

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver: yupResolver(signUpShelterSchema)});

    return (
        <div>
            <div className="mb-3" id="alertContainer">
                {validationError !== "" && <div className="error-notif">{validationError}</div>}
                {errors.name && <div className="error-notif">{errors.name.message}</div>}
                {errors.email && <div className="error-notif">{errors.email.message}</div>}
                {errors.username && <div className="error-notif">{errors.username.message}</div>}
                {errors.location && <div className="error-notif">{errors.location.message}</div>}
                {errors.password1 && <div className="error-notif">{errors.password1.message}</div>}
                {errors.password2 && <div className="error-notif">{errors.password2.message}</div>}
            </div>
            <form onSubmit={handleSubmit(onSignUpShelter)}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter name of your organization"
                           name="name" {...register('name')} required/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter Username"
                           name="username" {...register('username')} required/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter Location"
                           name="location" {...register('location')} required/>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Enter Email Address"
                           name="email" {...register('email')} required/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Enter Password"
                           name="password1" {...register('password1')} required/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Confirm Password"
                           name="password2" {...register('password2')} required/>
                </div>
                <input type="submit" value="Sign Up" className="btn btn-dark submit-btn"/>
                <p>
                    Have an account with us? <Link to="/accounts/login/" className="text-link">Login now!</Link>
                </p>
            </form>
        </div>
    );
}

export default SignUpShelter;