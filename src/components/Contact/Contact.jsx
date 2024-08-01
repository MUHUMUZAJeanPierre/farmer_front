import {useState} from 'react';
import './Contact.css';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState('');
    const handleContact = async(event)=>{
        event.preventDefault();
        await axios({
            method:"POST",
            url:"https://backendfarmerconnect.onrender.com/createContact",
            data:{
                name:name,
                email:email,
                message:message
            }
        }).then((response)=>{
            console.log(response.data);
            setTimeout(()=>{
                toast.success(response.data.message)
            }, 3000)
        }).catch((error)=>{
            console.log(error.message);
            toast.error("message not send")
        })
    }
    return (
        <div className="contact-container" id='contact'>
        <ToastContainer />
            <div className="contact-form">
                <h2>Contact Us</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name" placeholder="Enter your name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" placeholder="Enter your email address" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea value={message} onChange={(e)=>setMessage(e.target.value)} id="message" placeholder="Your message here..."></textarea>
                    </div>
                    <button onClick={handleContact} type="submit" className="submit-button">Submit</button>
                </form>
                <p className="contact-info">
                    For any question contact our 24/7 call center: <span className="contact-number">+250 783 028 109</span>
                </p>
            </div>
        </div>
    );
}

export default Contact;
