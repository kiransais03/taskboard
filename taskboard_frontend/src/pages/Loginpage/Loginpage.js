import React, { useEffect } from "react";
import "./loginpage-styles.css"
import Loginform from "../../components/Signup-Login Form/Loginform";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const Loginpage =()=>{

    let navigate=useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem("token"))
        {
            toast.info("Already Logged In,first logout to use another account")
            navigate('/taskboard');
        }
    },[])

    return(<> 
        <div className="input-wrapper-form">
            <h1>Login</h1>
            <Loginform/>
            <p className="login-page-redirect" onClick={()=>{navigate("/signup")}}>Doesn't have an Account?Click here to <span>Signup.</span></p>
        </div>
        </>
    )
}

export default Loginpage;