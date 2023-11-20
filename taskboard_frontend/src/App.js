import './App.css';
import React from "react";
import {Routes,Route} from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Homepage from './pages/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Loginpage from "./pages/Loginpage/Loginpage";
import Signuppage from "./pages/Singuppage/Signuppage";
import Taskboardpage from './pages/Taskboardpage/Taskboardpage';


function App() {
  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/home' element={<Homepage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/signup' element={<Signuppage/>}/>
        <Route path='/taskboard' element={<Taskboardpage/>}/>
      </Routes>
    </div>
  );
}

export default App;
