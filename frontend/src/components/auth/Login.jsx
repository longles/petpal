import React from 'react';
import {useForm} from 'react-hook-form'
import '../../styles/login.scoped.css'
import '../../styles/user.scoped.css'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { authAPIService } from "../../services/authAPIService.js"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ErrorMessage } from "@hookform/error-message"

const loginSchema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required()

function Login() {
    const loginAPI = authAPIService();
    let navigate = useNavigate(); 
    const [validationError, setValidationError] = useState("")
    const onLogin = (data) => {
        // Create an alert div and append it to the alertContainer
        console.log(data)
        loginAPI.login(data.username, data.password).then(res => {
            console.log(res)
            if (res.success) {
              navigate("/")
            } else {
              setValidationError(res.message)
            }
        
        }).catch(e => {console.error(e)})
    };

  const {register, handleSubmit, formState: {errors} } = useForm({resolver: yupResolver(loginSchema)});

  return (
    <div>
      {/* <a href="index.html">
        <button className="btn btn-dark home-btn">Home</button>
      </a> */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <main>
          <div className="card text-center">
            <div className="mb-3" id="alertContainer">
              {validationError !== "" && <div className="error-notif">{validationError}</div>}
              {errors.username && <div className="error-notif">{errors.username.message}</div>}
              {errors.password && <div className="error-notif">{errors.password.message}</div>}
            </div> 
            <h3>Login</h3>
            <form onSubmit={handleSubmit(onLogin)}>
              <div className="form-group">
                <p className="form-label">Enter Username</p>
                <input className="form-control" placeholder="" {...register('username')} />
              </div>
              <div className="form-group">
                <p className="form-label">Enter Password</p>
                <input type="password" className="form-control" placeholder="" {...register('password')} />
              </div>
              <input type="submit" className="btn btn-dark submit-btn" value="Login"/>
              <p>
                Not a member? <a href="/accounts" className="text-link">Register now!</a>
              </p>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Login;