import React,{useEffect,useState} from "react";
import "./signuppage-styles.css";
import Signupform from "../../components/Signup-Login Form/Signupform";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signuppage () {

    let navigate=useNavigate();

    console.log(localStorage.getItem('token'))


    useEffect(()=>{
        if(localStorage.getItem("token"))
        {
            toast.info("Already Logged In,first logout to use another account")
            navigate('/taskboard');
        }
    },[])

    return(<>
        <div className="input-wrapper-form">
            <h1>Signup</h1>
            <Signupform/>
            <p className="signup-page-redirect" onClick={()=>{navigate("/login")}}>Already have an Account?Click here to <span>LogIn.</span></p>
        </div>
        </>
    )
}

export default Signuppage;