import React from 'react'
import {useNavigate} from "react-router-dom";
import "./homepage-styles.css";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

function Homepage() {

    let navigate = useNavigate();

  return (
    <div className='landingmain d-flex justify-content-around flex-wrap align-items-center'>
       
       <div className='d-flex flex-column row-gap-5'>
        <div className='d-flex flex-column row-gap-3'>
          <div className='d-flex justify-content-center'>
            <AssignmentTurnedInIcon/>
            </div>
          
          <h1 className='headingtext' style={{textAlign:"center"}}>"Task Board: Where Ideas Meet Action."</h1>
          <h3 style={{textAlign:"center"}}>Bridge the gap between inspiration and execution.<br/> With our task board, ideas seamlessly transition into action,<br/> bringing your visions to life.</h3>
      </div>
       <div className='d-flex flex-column row-gap-3'>
            <button type="button" onClick={()=>{navigate('/login')}} className="btn btn-primary">Login</button> <br/>
            <button type="button" onClick={()=>{navigate('/signup')}} className="btn btn-warning">Signup</button>
      </div>
      </div>
    </div>
  )
}

export default Homepage
