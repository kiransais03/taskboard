const {TRUE,FALSE,ERROR,NOT_EXIST} = require('../constants');
const {querying} = require('../elephantsql');


//Get tasksarray from DB
const getTasksarrfromDB =async ()=>{
    try {
    let querycmd = 'SELECT * FROM tasks'
    console.log('hhehehe')
    let result =await querying(querycmd,[]);
    return result;
 }
    catch(error) {
         console.log(error)
        return ERROR;
    }
}


//Update tasksarr in Db
const updateTasksarrinDB = async (id,text,boardno)=>{
    try{
       let querycmd = 'INSERT INTO tasks values($1,$2,$3)';
       let result =await querying(querycmd,[id,text,boardno]);
       return TRUE;
    }
    catch(error) {
        return [error,ERROR];
    }
}

//Get listnos form DB
const getListnosfromDB =async ()=>{
    try {
    let querycmd = 'SELECT * FROM listnos'
    let result =await querying(querycmd,[]);
    return result;
 }
    catch(error) {
         console.log(error)
        return ERROR;
    }
}


//Update listnos in Db
const updateListnosinDB = async (num)=>{
    try{
        console.log(num,"nummm");
       let querycmd = 'INSERT INTO listnos (nos) VALUES ($1)'
       let result =await querying(querycmd,[num]);
       return TRUE;
    }
    catch(error) {
        return [error,ERROR];
    }
}

module.exports = {getTasksarrfromDB,updateTasksarrinDB,getListnosfromDB,updateListnosinDB}