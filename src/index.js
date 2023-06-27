const express = require('express');
const connection = require('./db/mysql');
require('./db/mysql')
const employeeRouter = require('./routers/employee')

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(employeeRouter)

app.listen(port, ()=>{
    console.log(`Server is up on post ${port}`)
})