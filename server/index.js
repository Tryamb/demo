const express = require('express');
const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const UserModel = require('./models/DataModel'); // Import your Mongoose model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_database_uri' with your actual MongoDB URI)

mongoose.connect('mongodb+srv://rexsparsh:sparsh@data.k2qwayp.mongodb.net/?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
console.log('Connected Successfully')

// Routes
app.get('/',(req,res)=>{
    res.send("hello world");
    console.log("hello world");

})


app.post('/api/login', async (req, res) => {
   try{
      const {email,password}=req.body
      if(email && password){
          const user=await UserModel.findOne({email:email})
          if(user!=null){
               const isMatch= await bcrypt.compare(password,user.password)
               if(user.email===email && isMatch){
                  //Generate JWT Token
                  const token= jwt.sign({userID:user._id}, process.env.JWT_SECRET_KEY,{expiresIn:'3d'})
                  res.send({"status":"success","message":"Login Successful","token":token})
               }else{
                  res.send({"status":"failed","message":"Email or password is not valid"})
               }
          }else{
              res.send({"status":"failed","message":"You are not a registered user"})
          }
      }else{
          res.send({"status":"failed","message":"All fields are required"})
      }
  }catch(error){
      res.send({"status":"failed","message":`Unable to login with error ${error}`})
  }
 });

// Start the server
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
