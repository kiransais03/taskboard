const express = require('express');
const app = express();
const cors = require('cors');
const {querying} = require('./elephantsql')
const useractions = require('./routes/useractions');
const tablequeryactions = require('./routes/tablequeryactions');
require('dotenv').config();


app.use(cors({origin:'*'}));
app.use(express.json()); 
 

app.use('/user',useractions);

app.use('/table',tablequeryactions);

app.get('/',(req,res)=>{
    try{
     res.status(200).send({
        status : 200,
        message : "This is the backend server of Taskboard App."
     })
    }
    catch(error) {
        res.status(400).send({
            status : 400,
            message : "Some error occurred",
        })
    }
})

app.get('/ok',async (req,res)=>{

    try{
        const result = await querying('SELECT * FROM users');
        if(!result)
        {
            throw new Error("Client is closed.Try again.");
        }
        res.status(200).send({
            status:200,
            data : result,
        })
    }
    catch(error) {
        res.status(400).send({
            status : 400,
            message : "Some error has been occurred.Client not queryable.Try again",
            errorObj : error,
        })
    } 
})


app.listen(8080,()=>{
    console.log("Server is running on PORT 8080");
})


