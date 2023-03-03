const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET= 'SECRETKEY';
var fetchuser = require('../middleware/fetchuser');

//ROUTE 1: For creating a user
router.post('/createuser', [
    body('fname').isLength({ min: 4 }),
    body('lname').isLength({ min: 4 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res)=>{
  let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
      }
      try {
      let user = await User.findOne({email: req.body.email});
      if(user){
        return res.status(400).json({error: "Sorry a user with this email already exists"})
      }
      const salt = await bcrypt.genSaltSync(10);
      const secPass =  await bcrypt.hashSync(req.body.password, salt);

      user = await User.create({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: secPass,
      })
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success,authtoken})


    } catch (error){
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
      
})
  //ROUTE 2: For login a user
router.post('/login', [
  body('email').isEmail(),
  body('password', 'Does not blank').exists(),
], async (req, res)=>{
  let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      success = false;
      return res.status(400).json({error: "Please try to login with correct credential"})
    }
  const passwordcompare = await bcrypt.compare(password, user.password);
  if(!passwordcompare){
    success = false;
    return res.status(400).json({success,error: "Please try to login with correct credential"})
  }
  
  const data = {
    user:{
      id: user.id
    }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);
  success = true;
  res.json({success, authtoken})


} catch (error){
  console.error(error.message);
  res.status(500).send("Some Error occured");
}
  });

//ROUTE : Reset Password using PUT
router.put('/resetpassword',(req,res)=>{
  User.find({email:req.body.email})
  .exec()
  .then(result=>{
   if(result.length<1){
    return res.status(401).json({
      message:"Invalid cridential"
    })
    }
    if(result.length>0){
      if(result[0].fname===req.body.fname && result[0].lname===req.body.lname){
        bcrypt.hash(req.body.password,10,(err,hash)=>{
          if(err){
            return res.status(401).json({
              message:"please enter strong password",
            })
          }else{
            User.findByIdAndUpdate(result[0]._id,{password:hash},(err,docs)=>{
              if(err){
                console.log("updation failed");
              }
              if(!err){
                console.log("updation success");
              }
            })
            res.status(200).json({
              message:"password update success"
            })
          }
        })
      }else{
       return res.status(401).json({
          message:"invalid cridantial"
        })
      }
    }
   }
  )
  .catch(err=>{
   res.status(401).json({
    message:"server problem"
   })
  })
})

module.exports = router;


