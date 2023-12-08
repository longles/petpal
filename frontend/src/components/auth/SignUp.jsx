import React, {useState} from 'react'
import SignUpSeeker from "./SignUpSeeker.jsx";
import SignUpShelter from "./SignUpShelter.jsx";
import '../../styles/signup.scoped.css'
import '../../styles/user.scoped.css'

function SignUp() {
    const [isSeeker, setIsSeeker] = useState(true);

    const toggleForm = () => {
        setIsSeeker(!isSeeker);
    };

    const topTextSeeker = (
        <p className="top-text">
            Registering a pet shelter? Click <button className="text-link" onClick={toggleForm}>HERE</button>.
        </p>
    );

    const topTextShelter = (
        <p className="top-text">
            Looking to adopt a cute pet? Register <button className="text-link" onClick={toggleForm}>HERE</button>.
        </p>
    )

    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <main>
                    <div className="card text-center">
                        <h3>Sign Up</h3>
                        {isSeeker ? topTextSeeker : topTextShelter}
                        {isSeeker ? <SignUpSeeker/> : <SignUpShelter/>}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default SignUp;