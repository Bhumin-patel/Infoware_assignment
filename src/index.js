const express = require('express');
const connection = require('./db/mysql');
require('./db/mysql')

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, ()=>{
    console.log(`Server is up on post ${port}`)
})