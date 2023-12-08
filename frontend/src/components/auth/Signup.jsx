import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import '../../styles/signup.scoped.css'
import '../../styles/user.scoped.css'

function SignUp() {
    const [regData, setRegData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password1: "",
        password2: ""
    });

    function handleChange(event) {
        setRegData(prevState => ({
                    ...prevState,
                    [event.target.name]: event.target.value
                }
            )
        )
    }

    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <main>
                    <div className="card text-center">
                        <div className="mb-3" id="alertContainer"></div>
                        <h3>Sign Up</h3>
                        <p className="top-text">
                            Registering a pet shelter? Click <a href="signup-shelter.html"
                                                                className="text-link">HERE</a>.
                        </p>
                        <form>
                            <div className="row">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="First name"
                                           name="firstName" value={regData.firstName} onChange={handleChange} required/>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Last name"
                                           name="lastName" value={regData.lastName} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="username" className="form-control" placeholder="Enter Username"
                                       name="username" value={regData.username} onChange={handleChange} required/>
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Enter Email Address"
                                       name="email" value={regData.email} onChange={handleChange} required/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Enter Password"
                                       name="password1" value={regData.password1} onChange={handleChange} required/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Confirm Password"
                                       name="password2" value={regData.password2} onChange={handleChange} required/>
                            </div>
                            <input type="submit" value="Sign Up" className="btn btn-dark submit-btn"/>
                            <p>
                                Have an account with us? <a href="/login" className="text-link">Login now!</a>
                            </p>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default SignUp;