const express = require('express');
const router = express.Router();
const User = require('../models/User');
const{body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')

const JWT_SECRET ='IshaqIsADeveloper';

// 1st route: create a new user

router.post('/createUser',[
  body('name','Enter a Valid Name').isLength({min:3}),
  body('email','Enter a Valid email').isEmail(),
  body('password','Password must be of 5 characters').isLength({min:5}),
],
async(req,res)=>{
  let success = false;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  try{
    const {name,email,password}= req.body;
// check wether the user is already present;
    let user = await User.findOne({email});
    if(user){
      return res.status(400).json({success, error:'Sorry user is already exists'});
    }

    // hashing the password

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(password,salt)
    // create new user
    user = await User.create(
      {
        name,
        email,
        password:secPassword}
    );
    const data ={
      user:{
        id:user.id
      }
    }

    const authToken = jwt.sign(data,JWT_SECRET);
    success = true;
    res.json({success,authToken})


  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error")

  }
})
// 2st route: Login user user

// router.post('/loginUser',[
//   body('email','Enter a Valid email').isEmail(),
//   body('password','Password cannot be blank ').exists()
// ],
// async(req,res)=>{
//   let success = false;

//   const errors = validationResult(req);
//   if(!errors.isEmpty()){
//     return res.status(400).json({errors:errors.array()});
//   }

//   try{
//     const {email,password}= req.body;
// // check wether the email matches 
//     let user = await User.findOne({email});
//     if(!user){
//       success= false;
//       return res.status(400).json({error:'Please try to login using correct credentials'});
//     }

//     const passwordCompare = await bcrypt.compare(password,user.password);
//     if(!passwordCompare){
//       success= false;
//       return res.status(400).json({error:'Please try to login using correct credentials'});
//     }

//     const data ={
//       user:{
//         id:user.id
//       }
//     }

//     const authToken = jwt.sign(data,JWT_SECRET);
//     success = true;
//     res.json({success,authToken})

//   }catch(error){
//     console.error(error.message);
//     res.status(500).send("Internal Server Error")

//   }
// });
// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/loginUser', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});



// get logged in user data
router.post('/getUser',fetchUser, async(req,res)=>{
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error")

  }
})




module.exports = router;