const express = require('express')
const connection = require('../db/mysql')
const router = new express.Router()

// middleware for form url encoded
const middle = express.urlencoded({extended: true})

// Create
router.post('/employee', middle , async (req,res)=>{
    
    try{
        let employeeQuery = 'insert into employee values (?,?,?,?,?,?,?,?);'
        let contactOneQuery = 'insert into contacts values (?,?,?,?,?,?);'
        let contactTwoQuery = 'insert into contacts values (?,?,?,?,?,?);'

        let array = Object.values(req.body)

        connection.query(employeeQuery + contactOneQuery + contactTwoQuery,
                        [
                        ...array.slice(0,8),
                        'Primary',...array.slice(8,12),array[4],
                        'Secondary',...array.slice(12),array[4]
                        ], 
                        (err,results,fields)=>{ 
            
            if(err){
                console.log(err)
                return
            }           
        })

        res.status(200).send('Submitted Successfully!')
    
    } catch(e){
       res.status(400).send(e) 
    }
})

//List
//  /employee/list?page=1&limit=5
router.get('/employee/list', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Current page number
        const limit = parseInt(req.query.limit) || 10; // Number of records per page

        // Calculate the offset for querying the database based on the page and limit values
        const offset = (page - 1) * limit;

        const [rows] = await connection.query('SELECT * FROM employee LIMIT ?, ?;', [offset, limit]);

        res.status(200).send(rows);
    } catch (e) {
        res.status(400).send(e);
    }
});

//Update for employee
router.patch('/employee/update/:email', async (req,res)=>{
    
    try{  
        let updates = Object.entries(req.body)
        const isValidOperation = updates.every((update) => update[0] !== 'email')

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        let str = ''
        updates.forEach( (row)=>{
            str = str +`${row[0]}='${row[1]}',`;
        } )

        newstr = str.replace(/.$/,'');

        console.log(`update employee set ${newstr} where email='${req.params.email}';`)

        await connection.query(`update employee set ${newstr} where email='${req.params.email}';`)
        res.status(200).send('Updated Successfully!');

    } catch(e) {
        res.status(400).send(e);
    }
})

//Delete
router.delete('/employee/delete/:email',async (req,res)=>{    
    
    try{
        const [rows] = await connection.query(`delete from employee where email = '${req.params.email}'`)
        res.status(200).send('Submitted Successfully!')
    } catch(e) {
        res.status(400).send(e)
    }
})

//Get
router.get('/employee/get/:email',async (req,res)=>{
    
    try{
        const [rows] = await connection.query(`select * from employee where email = '${req.params.email}'`)
        res.status(200).send(rows)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router