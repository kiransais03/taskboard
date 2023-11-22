import React, { useState, useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import update from "immutability-helper";
import Dragdropitem from "../components/Dragdrop Item/Dragdropitem";
import Dragdropcolumn from "../components/Dragdrop Column/Dragdropcolumn";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Taskboard = () => {
  const [tasks, setTasks] = useState([]);

  const [boardnos,setBoardnos] = useState([]);

  let navigate = useNavigate();

  //For getting the task list data from backend
  const handlegetTasklist =async ()=>{
    try {
     let result = await axios.get(`${process.env.REACT_APP_URL}/table/gettasklist`,{headers:{"token-taskboard":`Bearer ${localStorage.getItem('token')}`}});
     let taskList =  result.data.taskarr;
     setTasks([...taskList]);
    }
    catch(error) {
      console.log("Error",error);
      toast.error("Error:",error);
    }
  }

//To initialize and get task list data as soon as the page is rendered
  useEffect(()=>{
    if(!localStorage.getItem('token'))
    {
      toast.info("Please login to go to taskboard")
       navigate('/login')
    }
    else {
    handlegetTasklist();
    handlegetListnos();
    }
  },[])


  //For updating the task list in backend whenenver any operation is done across the boards
  const handleupdateTasklist = async (updatedTasklistarr)=>{
    try {
    let result = await axios.post(`${process.env.REACT_APP_URL}/table/updatetasklist`,{"taskarr":updatedTasklistarr},{headers:{"token-taskboard":`Bearer ${localStorage.getItem('token')}`}});
    console.log("tasklist updated successfully")
  }
    catch(error) {
      console.log("Error",error);
      toast.error("Error:",error)
    }
  }


  //To get the list of bordnos as soon as the page is rendered
 const handlegetListnos = async ()=>{
  try {
    let result = await axios.get(`${process.env.REACT_APP_URL}/table/getlistnos`,{headers:{"token-taskboard":`Bearer ${localStorage.getItem('token')}`}});
    let listnosobjarr =  result.data.listnosobj;
    let boardnosArr = listnosobjarr.map((elemObj,index)=>{
       return elemObj.nos;
    })
     setBoardnos([...boardnosArr]);
  }
    catch(error) {
      console.log("Error",error);
      toast.error("Error:",error)
    }
 }


 //To update the boardlistnos in backend whenever we delete any board
 const handleupdateListnos = async (updatedListnosarr)=>{
  try {
    let newboardnosArrobj = updatedListnosarr.map((elem,index)=>{
      return {"nos":elem};
    })
  let result = await axios.post(`${process.env.REACT_APP_URL}/table/updatelistnos`,{"listobjarr":newboardnosArrobj},{headers:{"token-taskboard":`Bearer ${localStorage.getItem('token')}`}});
  console.log("listnosboard updated successfully")
}
  catch(error) {
    console.log("Error",error);
    toast.error("Error:",error)
  }
}
  
//To update the state when we drag and draop a card.
  const changeTaskboardno = useCallback(
    (id, boardno) => {
      let task = tasks.find(task => task.id === id);
      const taskIndex = tasks.indexOf(task);
      task = { ...task, boardno };
      let newTasks = update(tasks, {
        [taskIndex]: { $set: task }
      });
      setTasks(newTasks);
      handleupdateTasklist(newTasks);
    },[tasks])


    //To add and update when an card is added to any board by clicking on Add item
    const handleAdditem = (num)=>{
      let textEntered = prompt("Enter text");
      if(textEntered) {
      setTasks((prevState)=>
      {
        return [...prevState,{id: tasks.length+1, text: textEntered, boardno: num}]
      });
      handleupdateTasklist([...tasks,{id: tasks.length+1, text: textEntered, boardno: num}])
    }
    }

    //To update whenever an card item is clicked on Check box and to delete it from the list as it completed
    const handleItemchecked = (item)=>{
      let modifiedList = tasks.filter((obj)=>{return obj.id!==item.id});
      console.log(tasks)
      setTasks([...modifiedList])
      handleupdateTasklist([...modifiedList])
    }

//Updating the boardnos list wheneer a new board list is added
    const handleCreatelist = ()=>{
      let newListnum = boardnos.length+1;
      boardnos.push(""+newListnum)
      setBoardnos([...boardnos])
      console.log("clicked",boardnos)
      handleupdateListnos([...boardnos])
    }

    //To update the board list whenever a board is deleted 
    const handleDeletelist = ()=>{
      boardnos.pop();
      setBoardnos([...boardnos]);
      handleupdateListnos([...boardnos]);
    }
    
    return (
    <main>
      <header> Welcome User</header>
      <DndProvider backend={HTML5Backend}>
          <h4 style={{textAlign:"center"}}>Task Board</h4>
        <section style={{display: "flex",columnGap:"20px",margin: "0 auto",width: "90vw",height:"75vh",overflowX:"scroll",border:"2px solid black",padding:"1rem",backgroundColor:"lightgrey"}}>
          {boardnos.map((num,ind) => (
            <Dragdropcolumn
              key={num}
              boardno={num}
              changeTaskboardno={changeTaskboardno}
            >
              <div style={{minWidth: 200,width: "1rem",margin: "0 auto",paddingBottom:"4rem",border:"1px solid black",backgroundColor:"whitesmoke"}}>
                <div style={{textAlign: "center",padding:"5",fontSize: "1.2rem",backgroundColor:"lightgrey"}}>List {num}{boardnos.length===ind+1 && <span style={{cursor:"pointer"}} onClick={()=>{handleDeletelist()}}> 🗑️</span>}</div>
                <div>
                  {tasks
                    .filter(item => item.boardno === num)
                    .map(item => (
                      <Dragdropitem key={item.id} id={item.id}>
                        <div style={{padding: 10,margin:"10px 0",fontSize: "0.9rem",cursor: "pointer",backgroundColor: "white"}}>
                          <input type="checkbox" onChange={(e)=>{handleItemchecked(item)}}/> {item.text}</div>
                      </Dragdropitem>
                    ))}
                    <div onClick={()=>{handleAdditem(num)}} style={{padding: 10,marginTop:"3rem",textAlign:"center",fontSize: "0.9rem",cursor: "pointer",backgroundColor: "whitesmoke"}}>
                    +Click To Add Item
                    </div>
                </div>
              </div>
            </Dragdropcolumn>
          ))}
          <div style={{minWidth: 200,width: "1rem",margin: "0 auto",height:"fit-content",border:"1px solid black",backgroundColor:"whitesmoke"}}>
                <div style={{textAlign: "center",padding:"5",fontSize: "1.2rem",backgroundColor:"lightgrey"}}>Create New List</div>
                <h2 style={{textAlign:"center",margin:"1rem",cursor:"pointer"}} onClick={handleCreatelist}>➕</h2>
         </div>
        </section>
      </DndProvider>
    </main>
  );
};


export default Taskboard;