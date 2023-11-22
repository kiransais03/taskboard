const express = require('express');
const app = express();
const {gettasklist,updatetasklist,getlistnos,updatelistnos} = require('../functions/tableModifyfunctions');
const {isAuth} = require('../middlewares/isAuthmiddleware');

app.get('/gettasklist',isAuth,gettasklist);

app.post('/updatetasklist',isAuth,updatetasklist);

app.get('/getlistnos',isAuth,getlistnos);

app.post('/updatelistnos',isAuth,updatelistnos);


module.exports = app;