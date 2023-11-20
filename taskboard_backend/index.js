const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({origin:'*'}));
app.use(express.json());

app.get('/ok',(req,res)=>{
    res.status(200).send({
        status:200,
        message : "This is the test API which is for checking."
    })
})


app.listen(8080,()=>{
    console.log("Server is running on PORT 8080");
})


