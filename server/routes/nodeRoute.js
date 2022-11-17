const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const Note = require("../models/nodemodel");
const Student = require("../models/student");
const Staff = require("../models/teacher");

// dotenv.config();

// router.route('/register', async (req,res)=>{
//     try{
//         const hashedPassword = await bcrypt.hash(req.body.password,10)
//         const newUser = {
//             username : req.body.username,
//             email : req.body.email,
//             password : hashedPassword
//         }
//         await User.create(newUser)
//         res.json({status : 'ok'})
//     }
//     catch(err){
//         res.json({status : err})
//     }
// })

router.post('/login', async(req,res) => {
    try{
        // console.log(req);
        // const user = await User.findOne({email : req.body.email})
        // const isValidPassword = await bcrypt.compare(req.body.password,user.password)
        // if(isValidPassword){
        //     const token = jwt.sign({
        //         name : user.name,
        //         email : user.email
        //     },process.env.payloadString)
        //     res.json({status : "ok",message : "Login succesfull !",token : token})
        // }
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

router.post('/change', async(req,res) => {
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


router.post('/stafflogin', async(req,res) => {
    try{
        // console.log(req);
        // const user = await User.findOne({email : req.body.email})
        // const isValidPassword = await bcrypt.compare(req.body.password,user.password)
        // if(isValidPassword){
        //     const token = jwt.sign({
        //         name : user.name,
        //         email : user.email
        //     },process.env.payloadString)
        //     res.json({status : "ok",message : "Login succesfull !",token : token})
        // }
        const name = req.body.lreg;
        const user = await Staff.findOne({Tid : name});
        // console.log(user);
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

router.post('/passchange', async(req,res) => {
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

// router.route("/event").post((req,res)=>{
//     const Id = req.body.Id;
//     const StartTime = req.body.StartTime;
//     const EndTime = req.body.EndTime;
//     const Subject = req.body.Subject;
//     const newNote = new Note({
//         Id,
//         Subject,
//         StartTime,
//         EndTime,
//     });

//     newNote.save();
// });

router.post('/event',async(req,res) => {
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

router.post('/excel',async(req,res) => {
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

router.post('/staff',async(req,res) => {
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


// router.post('/cal',async(req,res) => {
//     const data = await Note.find();
//     console.log(data);
//     res.json({data:data});
// });

// router.route("/calendar").get(async(req,res)=>{
//     const data = await Note.find();
//     console.log(data);
//     res.json(data);
// })

router.route("/cal").get(async(req,res)=>{
    const data = await Note.find();
    // console.log(data);
    res.json(data);
    // Note.find()
    //     .then(found=>res.json(found))
})

module.exports = router;