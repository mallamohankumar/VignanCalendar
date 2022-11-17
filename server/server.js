const express= require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const jwt = require('jsonwebtoken');
const Note = require("./models/nodemodel");
const Student = require("./models/student");
const Staff = require("./models/teacher");

dotenv.config();

const port = 3001;

const host = '0.0.0.0';


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECT).then(() => {
    console.log("Connection succesfull")
})

// app.use("/",require("./routes/nodeRoute"));

app.listen(process.env.PORT || 5000,host,function(){
    console.log("express server is running on port",port);
})


app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.post('/login', async(req,res) => {
    try{
        const name = req.body.lreg;
        const user = await Student.findOne({Reg : name});
        // console.log(name,req.body.lpassword);
        if(!user)
        {
            res.json({status : "err",message : "Wrong id !",token : false})
        }
        else if(user.Password == req.body.lpassword)
        {
            return res.json({status:'ok',message : "Successful !"});
        }
        else
        {
            res.json({status : "err",message : "Wrong Password !",token : false})
        }
    }
    catch(err){
        res.json({status : "err",message : "Wrong credentials !",token : false})
    }
});

app.post('/change', async(req,res) => {
    try{
        const filter = { Reg: req.body.reg , Password : req.body.pass};
        const update = { Password: req.body.password };
        let x = await Student.findOneAndUpdate(filter, update);
        if(!x)
        {
            res.json({status : "err",message : "Wrong credentials !",token : false});   
        }
        return res.json({status:'ok',message : "Successful !"});
    }
    catch(err){
        res.json({status : "err",message : "Wrong credentials !",token : false})
    }
});


app.post('/stafflogin', async(req,res) => {
    try{
        const name = req.body.lreg;
        const user = await Staff.findOne({Tid : name});
        if(!user)
        {
            res.json({status : "err",message : "Wrong id !",token : false})
        }
        else if(user.Password == req.body.lpassword)
        {
            return res.json({status:'ok',message : "Successful !"});
        }
        else
        {
            res.json({status : "err",message : "Wrong Password !",token : false})
        }
    }
    catch(err){
        res.json({status : "err",message : "Wrong credentials !",token : false})
    }
});

app.post('/passchange', async(req,res) => {
    try{
        const filter = { Tid: req.body.reg , Password : req.body.pass};
        const update = { Password: req.body.password };
        let x = await Staff.findOneAndUpdate(filter, update);
        if(!x)
        {
            res.json({status : "err",message : "Wrong credentials !",token : false});   
        }
        return res.json({status:'ok',message : "Successful !"});
    }
    catch(err){
        res.json({status : "err",message : "Wrong credentials !",token : false})
    }
});


app.post('/event',async(req,res) => {
        try{
            const date = req.body.StartTime;
            const title = req.body.Subject;
            var notes = new Note({ date : date , title : title});
            notes.save(function (err, book) {
            if (err) return console.error(err);
                    console.log("successful");
            });
        return res.json({status:'ok'});
        }
        catch(err){
             return res.json({status:'error' , error:'invalid token'})
        }
})

app.post('/excel',async(req,res) => {
    try{
    const data = req.body.files;
    const columnsArray = Object.keys(data[0]);
    data.map(async(d) => {
        var student = new Student({Reg: d.Reg , Name : d.Name , Password : d.Phn , Dept: d.Dept});
        student.save(function (err, book) {
        if (err) return console.error(err);
                console.log("successful");
        });
    })
    return res.json({status:'ok'});
    }
    catch(err){
         return res.json({status:'error' , error:'invalid token'})
    }
})

app.post('/staff',async(req,res) => {
    try{
    const data = req.body.files;
    const columnsArray = Object.keys(data[0]);
    data.map(async(d) => {
        var staff = new Staff({Tid: d.Tid , Name : d.Name , Password : d.Phn , Dept: d.Dept});
        staff.save(function (err, book) {
        if (err) return console.error(err);
                console.log("successful");
        });
    })
    return res.json({status:'ok'});
    }
    catch(err){
         return res.json({status:'error' , error:'invalid token'})
    }
})


app.get("/cal",async(req,res)=>{
    const data = await Note.find();
    res.json(data);
})

