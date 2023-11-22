import React, { useState, useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import update from "immutability-helper";
import Dragdropitem from "../components/Dragdrop Item/Dragdropitem";
import Dragdropcolumn from "../components/Dragdrop Column/Dragdropcolumn";
import axios from "axios";

const tasksList = [
  { id: 1, text: "First Task", boardno: "1" },
  { id: 2, text: "Second Task", boardno: "1" },
  { id: 3, text: "Third Task", boardno: "1" },
  { id: 4, text: "Fourth Task", boardno: "2" },
  { id: 5, text: "Fifth Task", boardno: "2" },
  { id: 6, text: "Sixth Task", boardno: "3" },
  { id: 7, text: "Seventh Task", boardno: "3" },
  { id: 8, text: "Eighth Task", boardno: "3" },
  { id: 9, text: "Ninth Task", boardno: "3" },
  { id: 10, text: "Tenth Task", boardno: "3" }
];

const listnos = ["1", "2", "3"];

const Taskboard = () => {
  const [tasks, setTasks] = useState(tasksList);

  useEffect(async ()=>{
    let response = await axios.get('');
    setTasks(response.data)
  },[])

  const [boardnos,setBoardnos] = useState(listnos);
  
  const changeTaskboardno = useCallback(
    (id, boardno) => {
      let task = tasks.find(task => task.id === id);
      const taskIndex = tasks.indexOf(task);
      task = { ...task, boardno };
      let newTasks = update(tasks, {
        [taskIndex]: { $set: task }
      });
      setTasks(newTasks);
    },[tasks])

    const handleAdditem = (num)=>{
      let textEntered = prompt("Enter text");
      if(textEntered) {
      setTasks((prevState)=>
      {
        return [...prevState,{id: tasks.length+1, text: textEntered, boardno: num}]
      });
    }
    }


    const handleItemchecked = (item)=>{
      let modifiedList = tasks.filter((obj)=>{return obj.id!==item.id});
      console.log(tasks)
      setTasks([...modifiedList])
    }


    const handleCreatelist = ()=>{
      let newListnum = boardnos.length+1;
      boardnos.push(""+newListnum)
      setBoardnos([...boardnos])
      console.log("clicked",boardnos)
    }

    const handleDeletelist = ()=>{
      boardnos.pop();
      setBoardnos([...boardnos]);
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