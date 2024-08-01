import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPopup = ({ setShowLogin }) => {
    const { url, token, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = {
            name: name,
            email: email,
            password: password
        };
        let newUrl = 'https://backendfarmerconnect.onrender.com/';
        if (currState === 'Login') {
            newUrl += "login";
        } else {
            newUrl += "register";
        }
        try {
            const response = await axios.post(newUrl, form);
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                setToken(response.data.token);
                setShowLogin(false);
                setTimeout(()=>{
                    toast.success(response.data.message);
                    navigate('/');  
                    console.log(response);
                }, 3000);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className='login-popup'>
            <ToastContainer />
            <form className='login-popup-container' onSubmit={handleLogin}>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className='login-popup-inputs'>
                    {currState === "Login" ? null : <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Your name' required />}
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} name='email' placeholder='Your email' required />
                    <input type='password' value={password} name='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className='login-popup-condition'>
                    <input type='checkbox' required />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {currState === 'Login'
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    );
}

export default LoginPopup;
