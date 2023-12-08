import React, {useState} from 'react';
import {useForm} from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import '../../styles/signup.scoped.css'
import '../../styles/user.scoped.css'
import {authAPIService} from "../../services/authAPIService.js";
import {useNavigate} from 'react-router-dom';

const signUpSeekerSchema = yup
    .object({
        name: yup.string().required("Your name is required"),
        username: yup.string().required("Username is required"),
        email: yup.string().required("Email is required"),
        password1: yup.string().required("Password is required"),
        password2: yup.string().required("Need to confirm your password")
    })
    .required()

function SignUpSeeker() {
    const signUpAPI = authAPIService();
    let navigate = useNavigate();
    const [validationError, setValidationError] = useState("")

    const onSignUpSeeker = (event) => {
        console.log(event);
        const userObject = {
            type: "petseeker",
            user: {
                name: event.name,
                bio: ""
            }
        }
        signUpAPI.register(event.email, event.username, event.password, userObject).then(res => {
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
    } = useForm({resolver: yupResolver(signUpSeekerSchema)});

    return (
        <div>
            <div className="mb-3" id="alertContainer">
                {/*{validationError !== "" && <div className="error-notif">{validationError}</div>}*/}
                {errors.name && <div className="error-notif">{errors.name.message}</div>}
                {errors.email && <div className="error-notif">{errors.email.message}</div>}
                {errors.username && <div className="error-notif">{errors.username.message}</div>}
                {errors.password1 && <div className="error-notif">{errors.password1.message}</div>}
                {errors.password2 && <div className="error-notif">{errors.password2.message}</div>}
            </div>
            <form onSubmit={handleSubmit(onSignUpSeeker)}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter Your Real Name"
                           name="name" {...register('name')} required/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter Username"
                           name="username" {...register('username')} required/>
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
                    Have an account with us? <a href="login/" className="text-link">Login now!</a>
                </p>
            </form>
        </div>
        // <div>
        //     <div className="container d-flex justify-content-center align-items-center min-vh-100">
        //         <main>
        //             <div className="card text-center">
        //
        //                 <h3>Sign Up</h3>
        //                 <p className="top-text">
        //                     Registering a pet shelter? Click <a href="signup-shelter.html"
        //                                                         className="text-link">HERE</a>.
        //                 </p>
        //                 <div className="mb-3" id="alertContainer">
        //                     {validationError !== "" && <div className="error-notif">{validationError}</div>}
        //                     {errors.name && <div className="error-notif">{errors.name.message}</div>}
        //                     {errors.email && <div className="error-notif">{errors.email.message}</div>}
        //                     {errors.username && <div className="error-notif">{errors.username.message}</div>}
        //                     {errors.password1 && <div className="error-notif">{errors.password1.message}</div>}
        //                     {errors.password2 && <div className="error-notif">{errors.password2.message}</div>}
        //                 </div>
        //                 <form>
        //                     <div className="form-group">
        //                         <input type="text" className="form-control" placeholder="Enter Your Real Name"
        //                                name="name" required/>
        //                     </div>
        //                     <div className="form-group">
        //                         <input type="text" className="form-control" placeholder="Enter Username"
        //                                name="username" required/>
        //                     </div>
        //                     <div className="form-group">
        //                         <input type="email" className="form-control" placeholder="Enter Email Address"
        //                                name="email" required/>
        //                     </div>
        //                     <div className="form-group">
        //                         <input type="password" className="form-control" placeholder="Enter Password"
        //                                name="password1" required/>
        //                     </div>
        //                     <div className="form-group">
        //                         <input type="password" className="form-control" placeholder="Confirm Password"
        //                                name="password2" required/>
        //                     </div>
        //                     <input type="submit" value="Sign Up" className="btn btn-dark submit-btn"/>
        //                     <p>
        //                         Have an account with us? <a href="login/" className="text-link">Login now!</a>
        //                     </p>
        //                 </form>
        //             </div>
        //         </main>
        //     </div>
        // </div>
    );
}

export default SignUpSeeker;