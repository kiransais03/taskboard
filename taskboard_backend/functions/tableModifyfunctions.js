const express = require('express');
const app = express();
const {TRUE,FALSE,ERROR,NOT_EXIST} = require('../constants');
const {updateTasksarrinDB,getTasksarrfromDB,getListnosfromDB,updateListnosinDB} = require('./tableDbfunctions');
const {querying} = require('../elephantsql');

//Getting task list
const gettasklist = async (req,res)=>{
    try {
     const tasklistarr =await getTasksarrfromDB();

     if(tasklistarr===ERROR)
     {
      console.log(tasklistarr.error);
        throw new Error('Some error occured');
     }
     res.status(200).send({
        status : 200,
        message : "Task array retrieval successfull",
        taskarr : tasklistarr,
     })
   }
    catch(error) {
        res.status(400).send({
            status:400,
            message : "Some error occurred during retrival of takslist.Try again",
            errorObj : error,
        })
     }
    
}


//Update tasklist
const updatetasklist = async (req,res)=>{
    let taskarr = req.body.taskarr ;

    let delquerycmd = 'DELETE FROM tasks;'
    let delresult =await querying(delquerycmd,[]);

    for(let i=0;i<taskarr.length;i++)
    {
      let result = await updateTasksarrinDB(taskarr[i].id,taskarr[i].text,taskarr[i].boardno);
      if(result[1]===ERROR)
      {
        res.status(400).send({
            status : 400,
            message : "Error occurred during tasklist update.Pls try again",
            errorObj : result[0]
        })
        return ;
      }
     }

     res.status(200).send({
        status : 200,
        message : "Successfully updated tasklist"
     })

    return ;
}


//Getting listnos
const getlistnos = async (req,res)=>{
  try {
   const listnosObjarr =await getListnosfromDB();

   if(listnosObjarr===ERROR)
   {
    console.log(listnosObjarr.error);
      throw new Error('Some error occured');
   }
   res.status(200).send({
      status : 200,
      message : "Task array retrieval successfull",
      listnosobj : listnosObjarr,
   })
 }
  catch(error) {
      res.status(400).send({
          status:400,
          message : "Some error occurred during retrival of takslist.Try again",
          errorObj : error,
      })
   }
  
}


//Update listnos
const updatelistnos = async (req,res)=>{
  let listobjarr = req.body.listobjarr ;

  let delquerycmd = 'DELETE FROM listnos;'
  let delresult =await querying(delquerycmd,[]);

  for(let i=0;i<listobjarr.length;i++)
  {
    let result = await updateListnosinDB(listobjarr[i].nos);
    if(result[1]===ERROR)
    {
      res.status(400).send({
          status : 400,
          message : "Error occurred during listnos update.Pls try again",
          errorObj : result[0]
      })
      return ;
    }
   }

   res.status(200).send({
      status : 200,
      message : "Successfully updated listnos"
   })

  return ;
}

module.exports={gettasklist,updatetasklist,getlistnos,updatelistnos}