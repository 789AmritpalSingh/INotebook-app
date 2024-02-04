// auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Amritisagoodb$oy'

// ROUTE 1: Create a user using POST: "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be at least 5 characters long').isLength({min: 5})
], async (req, res) => {
  let success = false // we are setting success = false, means token might not have been matched with correct token or you can say token not sent yet
  try {
    // if there are errors, return bad request and the errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){ // means if there are validation errors
        return res.status(400).json({success,errors: errors.array()})
    }

    // check whether user with this email exists already
    let user = await User.findOne({email: req.body.email})
    if(user){ // if user  exists then giving error message with the 400 error
      return res.status(400).json({success,error: "Sorry a user with this email exists already "})
    }

    const salt = await bcrypt.genSalt(10) // generating salt of 10 characters
    const securePassword = await bcrypt.hash(req.body.password,salt) // converting plain text to hash and adding salt to it which is of 10 characters

    // Create a new user
    user = await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
    })

    const data = { // generating a unique user id 
      user:{
        id: user.id // generating a id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET)

    //res.json(user) // displaying user details in response 
    success = true
    res.json({success,authtoken}) // displaying authentication token back in response when sending credentials
    
  } catch (error) { // throwing error message if something bad occured 
    console.error(error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// ROUTE 2: Autheticate a user using POST "/api/auth/login".

router.post('/login',[ // endpoint will be /api/auth/login. this time
  body('email','Enter a valid email').isEmail(),// checks if email is valid
  body('password','Password cannot be blank').exists(), /// checks if password is not empty
], async(req,res)=>{
  let success = false;

  // If there are errors, return bad request and the errors
  const errors = validationResult(req) // checking authentication errors
  if(!errors.isEmpty()){
    return res.status(400).json({success,errors: errors.array()})
  }

  const {email,password} = req.body // sending email and password in the request
  try{
    let user = await User.findOne({email})
    if(!user){ // if name of the user doesn't matches
      
      return res.status(400).json({success,error: "Please try to login with correct credentials"})
    }
    const passwordCompare = await bcrypt.compare(password, user.password) // comparing password sent in the request with user password stored in the database
    if(!passwordCompare){ // if password doesn't match
      success = false
      return res.status(400).json({success,error:"Please try to login with correct credentials"})
    }

    const data =  {
      user: {
        id: user.id
      }
    }

    const authtoken = jwt.sign(data,JWT_SECRET) // The purpose of creating and signing the JWT here is to generate a token that can be sent back to the client (typically as part of the response body) after successful user registration or login.
    success = true
    res.json({success,authtoken}) // auth token will be returned if credentials matches

  }catch(error){
    console.log(error.message)
    res.status(500).send("Internal Server error")
  }
})

//ROUTE 3 : Get logged in user details using POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser,async(req,res)=>{
  try {
    userId = req.user.id // here req is the request, user is the object and id is stored in the object user
    const user = await User.findById(userId).select("-password") // select("-password") is used when querying the database to exclude the password field
    // from the user object returned in the response. This is done for security reasons and to prevent the hashed password from being sent back to the client.
    res.send(user) // displaying user details in response

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;
