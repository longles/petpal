import React from 'react';
import '../../styles/signup.scoped.css'
import '../../styles/user.scoped.css'
function SignUp() {

    const onSignup = (data) => {

    }

    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <main>
                    <div className="card text-center">
                        <div className="mb-3" id="alertContainer"></div>
                        <h3>Sign Up</h3>
                        <p className="top-text">
                        Registering a pet shelter? Click <a href="signup-shelter.html" className="text-link">HERE</a>.
                        </p>
                        <form>
                            <div className="row">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="First name" required />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Last name" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Enter Email Address" required />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Enter Password" required />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Confirm Password" required />
                            </div>
                            <input type="submit" value="Sign Up" className="btn btn-dark submit-btn" />
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