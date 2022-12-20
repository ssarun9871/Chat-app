const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const login = require('./routes/login');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(login);

app.use((req,res,next)=>{
    res.status(404).send('<h1>page not found</h1>');    
})

const server = http.createServer(app);

app.listen(2000);